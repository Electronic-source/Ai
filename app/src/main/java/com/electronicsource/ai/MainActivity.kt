package com.electronicsource.ai

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {

    private var githubStatus by mutableStateOf("GitHub متصل نیست.")
    private var isConnected by mutableStateOf(false)

    // True while the authorization code is being exchanged for a token,
    // so onResume() doesn't overwrite the "connecting..." status.
    private var authInProgress = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        refreshGithubStatus()

        // The OAuth bridge page redirects to gitmate://oauth/callback.
        // If the app was not running, that deep-link launches a fresh
        // instance of this activity, so handle it here as well.
        handleGitHubDeepLink(intent)

        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize()
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Text(
                            text = "Ai",
                            style = MaterialTheme.typography.headlineLarge
                        )

                        Text(
                            text = "AI Chat • AI Coder • GitHub Agent",
                            modifier = Modifier.padding(top = 8.dp)
                        )

                        Text(
                            text = githubStatus,
                            modifier = Modifier.padding(top = 24.dp)
                        )

                        if (isConnected) {
                            OutlinedButton(
                                onClick = {
                                    GitHubAuth.logout(this@MainActivity)
                                    refreshGithubStatus()
                                    Toast.makeText(
                                        this@MainActivity,
                                        "اتصال GitHub قطع شد.",
                                        Toast.LENGTH_SHORT
                                    ).show()
                                },
                                modifier = Modifier.padding(top = 16.dp)
                            ) {
                                Text("قطع اتصال GitHub")
                            }
                        } else {
                            Button(
                                onClick = {
                                    githubStatus = "در حال بازکردن GitHub..."
                                    GitHubAuth.startLogin(this@MainActivity)
                                },
                                modifier = Modifier.padding(top = 16.dp)
                            ) {
                                Text("اتصال به GitHub")
                            }
                        }
                    }
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)

        // With launchMode="singleTask", the OAuth deep-link is delivered
        // to the existing activity instance through here.
        handleGitHubDeepLink(intent)
    }

    override fun onResume() {
        super.onResume()

        // Refresh the status when returning from the browser: if the user
        // cancelled on GitHub's side, reset the stale "opening..." message.
        // Skipped while a token exchange is in progress.
        refreshGithubStatus()
    }

    private fun refreshGithubStatus() {
        if (authInProgress) return

        isConnected = GitHubAuth.hasToken(this)
        githubStatus =
            if (isConnected) {
                "GitHub متصل است."
            } else {
                "GitHub متصل نیست."
            }
    }

    private fun handleGitHubDeepLink(intent: Intent?) {
        val uri = intent?.data ?: return

        // Only handle our own OAuth callback, ignore anything else.
        if (uri.scheme != "gitmate") return

        // Consume the intent so a screen rotation doesn't re-submit
        // the same (single-use) authorization code.
        intent.setData(null)
        setIntent(intent)

        authInProgress = true
        githubStatus = "در حال اتصال به GitHub..."

        GitHubAuth.handleCallback(
            context = this,
            uri = uri,
            onSuccess = {
                authInProgress = false
                refreshGithubStatus()
                Toast.makeText(
                    this,
                    "GitHub با موفقیت متصل شد.",
                    Toast.LENGTH_SHORT
                ).show()
            },
            onError = { message ->
                authInProgress = false
                refreshGithubStatus()
                Toast.makeText(this, message, Toast.LENGTH_LONG).show()
            }
        )
    }
}
