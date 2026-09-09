package com.electronicsource.ai

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Base64
import java.security.MessageDigest
import java.security.SecureRandom
import java.util.UUID

object GitHubAuth {

    private const val CLIENT_ID = "Iv23lizNG9U5bvtbYeRr"
    private const val CALLBACK_URI =
        "https://electronic-source.github.io/Ai/oauth/callback"

    private const val PREFS = "github_auth"
    private const val ACCESS_TOKEN = "access_token"
    private const val STATE = "oauth_state"
    private const val CODE_VERIFIER = "code_verifier"

    fun hasToken(context: Context): Boolean {
        return getToken(context) != null
    }

    fun getToken(context: Context): String? {
        return context
            .getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(ACCESS_TOKEN, null)
    }

    fun startLogin(context: Context) {
        val state = UUID.randomUUID().toString()
        val codeVerifier = generateCodeVerifier()
        val codeChallenge = generateCodeChallenge(codeVerifier)

        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .putString(STATE, state)
            .putString(CODE_VERIFIER, codeVerifier)
            .apply()

        val uri = Uri.parse("https://github.com/login/oauth/authorize")
            .buildUpon()
            .appendQueryParameter("client_id", CLIENT_ID)
            .appendQueryParameter("redirect_uri", CALLBACK_URI)
            .appendQueryParameter("state", state)
            .appendQueryParameter("code_challenge", codeChallenge)
            .appendQueryParameter("code_challenge_method", "S256")
            .appendQueryParameter("prompt", "select_account")
            .build()

        val intent = Intent(Intent.ACTION_VIEW, uri)
        context.startActivity(intent)
    }

    fun handleCallback(
        context: Context,
        uri: Uri,
        onSuccess: () -> Unit = {},
        onError: (String) -> Unit = {}
    ) {
        val error = uri.getQueryParameter("error")

        if (error != null) {
            val description =
                uri.getQueryParameter("error_description")
                    ?: error

            onError(description)
            return
        }

        val code = uri.getQueryParameter("code")

        if (code.isNullOrBlank()) {
            onError("GitHub authorization code دریافت نشد.")
            return
        }

        val returnedState = uri.getQueryParameter("state")

        val preferences =
            context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

        val savedState = preferences.getString(STATE, null)
        val codeVerifier = preferences.getString(CODE_VERIFIER, null)

        if (savedState == null || returnedState != savedState) {
            onError("OAuth state معتبر نیست.")
            clearTemporaryAuthData(context)
            return
        }

        if (codeVerifier.isNullOrBlank()) {
            onError("PKCE code verifier پیدا نشد.")
            clearTemporaryAuthData(context)
            return
        }

        exchangeCodeForToken(
            context = context,
            code = code,
            codeVerifier = codeVerifier,
            onSuccess = {
                clearTemporaryAuthData(context)
                onSuccess()
            },
            onError = {
                clearTemporaryAuthData(context)
                onError(it)
            }
        )
    }

    private fun exchangeCodeForToken(
        context: Context,
        code: String,
        codeVerifier: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        Thread {
            try {
                val url =
                    java.net.URL(
                        "https://github.com/login/oauth/access_token"
                    )

                val connection =
                    url.openConnection() as java.net.HttpURLConnection

                connection.requestMethod = "POST"
                connection.doOutput = true
                connection.setRequestProperty(
                    "Accept",
                    "application/json"
                )
                connection.setRequestProperty(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                )

                val body = buildString {
                    append("client_id=")
                    append(java.net.URLEncoder.encode(CLIENT_ID, "UTF-8"))

                    append("&client_secret=")
                    append(
                        java.net.URLEncoder.encode(
                            BuildConfig.GITHUB_CLIENT_SECRET,
                            "UTF-8"
                        )
                    )

                    append("&code=")
                    append(
                        java.net.URLEncoder.encode(
                            code,
                            "UTF-8"
                        )
                    )

                    append("&redirect_uri=")
                    append(
                        java.net.URLEncoder.encode(
                            CALLBACK_URI,
                            "UTF-8"
                        )
                    )

                    append("&code_verifier=")
                    append(
                        java.net.URLEncoder.encode(
                            codeVerifier,
                            "UTF-8"
                        )
                    )
                }

                connection.outputStream.use { output ->
                    output.write(body.toByteArray())
                }

                val responseCode = connection.responseCode

                val stream =
                    if (responseCode in 200..299) {
                        connection.inputStream
                    } else {
                        connection.errorStream
                    }

                val response =
                    stream?.bufferedReader()?.use {
                        it.readText()
                    } ?: ""

                if (responseCode !in 200..299) {
                    throw Exception(
                        "GitHub OAuth failed: HTTP $responseCode"
                    )
                }

                val token =
                    extractJsonString(
                        response,
                        "access_token"
                    )

                if (token.isNullOrBlank()) {
                    val error =
                        extractJsonString(
                            response,
                            "error_description"
                        )
                            ?: extractJsonString(
                                response,
                                "error"
                            )
                            ?: "GitHub access token دریافت نشد."

                    throw Exception(error)
                }

                context.getSharedPreferences(
                    PREFS,
                    Context.MODE_PRIVATE
                )
                    .edit()
                    .putString(ACCESS_TOKEN, token)
                    .apply()

                connection.disconnect()

                android.os.Handler(
                    android.os.Looper.getMainLooper()
                ).post {
                    onSuccess()
                }

            } catch (e: Exception) {

                android.os.Handler(
                    android.os.Looper.getMainLooper()
                ).post {
                    onError(
                        e.message
                            ?: "خطا در اتصال به GitHub"
                    )
                }
            }
        }.start()
    }

    fun logout(context: Context) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .remove(ACCESS_TOKEN)
            .remove(STATE)
            .remove(CODE_VERIFIER)
            .apply()
    }

    private fun clearTemporaryAuthData(context: Context) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .remove(STATE)
            .remove(CODE_VERIFIER)
            .apply()
    }

    private fun generateCodeVerifier(): String {
        val random = ByteArray(32)

        SecureRandom().nextBytes(random)

        return Base64.encodeToString(
            random,
            Base64.URL_SAFE or
                Base64.NO_WRAP or
                Base64.NO_PADDING
        )
    }

    private fun generateCodeChallenge(
        verifier: String
    ): String {
        val digest =
            MessageDigest.getInstance("SHA-256")
                .digest(verifier.toByteArray())

        return Base64.encodeToString(
            digest,
            Base64.URL_SAFE or
                Base64.NO_WRAP or
                Base64.NO_PADDING
        )
    }

    private fun extractJsonString(
        json: String,
        key: String
    ): String? {
        val pattern =
            Regex(
                "\"${Regex.escape(key)}\"\\s*:\\s*\"([^\"]*)\""
            )

        return pattern
            .find(json)
            ?.groupValues
            ?.getOrNull(1)
    }
}
