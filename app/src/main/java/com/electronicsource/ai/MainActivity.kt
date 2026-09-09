package com.electronicsource.ai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        githubStatus =
            if (GitHubAuth.hasToken(this)) {
                "GitHub متصل است."
            } else {
                "GitHub متصل نیست."
            }

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

                        Button(
                            onClick = {
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
