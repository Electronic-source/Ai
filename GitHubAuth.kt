package com.electronicsource.ai

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Base64
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder
import java.security.MessageDigest
import java.security.SecureRandom

object GitHubAuth {
    const val clientId = "Iv23lizNG9U5bvtbYeRr"
    const val callbackUri = "https://electronic-source.github.io/Ai/oauth/callback"
    private const val appCallbackUri = "gitmate://oauth/callback"
    private const val prefsName = "github_auth"
    private const val stateKey = "state"
    private const val verifierKey = "verifier"
    private const val tokenKey = "access_token"

    fun start(context: Context) {
        val verifier = randomUrlSafe(32)
        val state = randomUrlSafe(32)
        val challenge = base64UrlSha256(verifier)

        context.getSharedPreferences(prefsName, Context.MODE_PRIVATE)
            .edit()
            .putString(stateKey, state)
            .putString(verifierKey, verifier)
            .apply()

        val uri = Uri.parse("https://github.com/login/oauth/authorize").buildUpon()
            .appendQueryParameter("client_id", clientId)
            .appendQueryParameter("redirect_uri", callbackUri)
            .appendQueryParameter("state", state)
            .appendQueryParameter("code_challenge", challenge)
            .appendQueryParameter("code_challenge_method", "S256")
            .appendQueryParameter("allow_signup", "false")
            .build()

        context.startActivity(Intent(Intent.ACTION_VIEW, uri))
    }

    fun handleIntent(context: Context, intent: Intent, onResult: (Result) -> Unit) {
        val data = intent.data ?: return
        if (data.scheme != "gitmate" || data.host != "oauth") return
        if (data.path != "/callback") return

        val error = data.getQueryParameter("error")
        if (!error.isNullOrBlank()) {
            onResult(Result.Error("GitHub OAuth error: $error"))
            return
        }

        val code = data.getQueryParameter("code")
        val returnedState = data.getQueryParameter("state")
        val prefs = context.getSharedPreferences(prefsName, Context.MODE_PRIVATE)
        val expectedState = prefs.getString(stateKey, null)
        val verifier = prefs.getString(verifierKey, null)

        if (code.isNullOrBlank() || returnedState.isNullOrBlank() || expectedState == null || verifier == null) {
            onResult(Result.Error("اطلاعات OAuth ناقص است."))
            return
        }
        if (returnedState != expectedState) {
            onResult(Result.Error("OAuth state نامعتبر است."))
            return
        }

        Thread {
            try {
                val secret = BuildConfig.GITHUB_CLIENT_SECRET
                if (secret.isBlank()) {
                    onResult(Result.Error("GitHub Client Secret در BuildConfig تنظیم نشده است."))
                    return@Thread
                }

                val body = listOf(
                    "client_id" to clientId,
                    "client_secret" to secret,
                    "code" to code,
                    "redirect_uri" to callbackUri,
                    "code_verifier" to verifier
                ).joinToString("&") { (k, v) ->
                    "${URLEncoder.encode(k, "UTF-8")}=${URLEncoder.encode(v, "UTF-8")}"
                }

                val connection = (URL("https://github.com/login/oauth/access_token").openConnection() as HttpURLConnection).apply {
                    requestMethod = "POST"
                    doOutput = true
                    setRequestProperty("Accept", "application/json")
                    setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                    connectTimeout = 15000
                    readTimeout = 15000
                }
                connection.outputStream.use { it.write(body.toByteArray(Charsets.UTF_8)) }
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                val token = Regex("\\\"access_token\\\"\\s*:\\s*\\\"([^\\\"]+)\\\"").find(response)?.groupValues?.get(1)
                if (token.isNullOrBlank()) {
                    onResult(Result.Error("GitHub توکن صادر نکرد. پاسخ: $response"))
                    return@Thread
                }

                prefs.edit()
                    .remove(stateKey)
                    .remove(verifierKey)
                    .putString(tokenKey, token)
                    .apply()

                onResult(Result.Success)
            } catch (t: Throwable) {
                onResult(Result.Error(t.message ?: "خطای ناشناخته در OAuth"))
            }
        }
    }

    fun hasToken(context: Context): Boolean = context.getSharedPreferences(prefsName, Context.MODE_PRIVATE).getString(tokenKey, null) != null

    fun clear(context: Context) {
        context.getSharedPreferences(prefsName, Context.MODE_PRIVATE).edit().clear().apply()
    }

    private fun randomUrlSafe(bytes: Int): String {
        val data = ByteArray(bytes)
        SecureRandom().nextBytes(data)
        return Base64.encodeToString(data, Base64.URL_SAFE or Base64.NO_WRAP or Base64.NO_PADDING)
    }

    private fun base64UrlSha256(value: String): String {
        val digest = MessageDigest.getInstance("SHA-256").digest(value.toByteArray(Charsets.US_ASCII))
        return Base64.encodeToString(digest, Base64.URL_SAFE or Base64.NO_WRAP or Base64.NO_PADDING)
    }

    sealed interface Result {
        data object Success : Result
        data class Error(val message: String) : Result
    }
}
