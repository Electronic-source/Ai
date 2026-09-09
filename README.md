# AI App v0.3.0

Android native Kotlin/Jetpack Compose scaffold for an AI chat + coding + GitHub app.

## Added in v0.3.0

- GitHub App OAuth authorization flow
- Authorization Code + PKCE
- Random OAuth `state` verification
- Android deep-link callback: `gitmate://oauth/callback`
- Static GitHub Pages callback bridge at `/oauth/callback/`
- Secure-by-repository handling of the Client Secret through `local.properties` (the secret is not committed)
- Local persistence of the GitHub user access token for the app
- Connect / disconnect controls in the GitHub tab

## GitHub App configuration

- Client ID: configured in `GitHubAuth.kt`
- Callback URL: `https://electronic-source.github.io/Ai/oauth/callback`
- Request user authorization during installation: enabled
- Device Flow: disabled
- Wildcard callback matching: disabled

## Local setup

1. Copy `local.properties.example` to `local.properties`.
2. Put the GitHub App Client Secret into `GITHUB_CLIENT_SECRET`.
3. Do not commit `local.properties`.
4. In GitHub Pages, publish the repository root so `/oauth/callback/` is available.
5. Build and install the app.

> Important: Android is a public client, so a client secret embedded in an APK cannot be treated as confidential. PKCE is used to reduce authorization-code interception risk. For production-grade protection of a secret, move the code-to-token exchange to a backend you control.

## Planned next

- GitHub repository browser
- Read/edit/commit/branch/PR operations
- Agent tool calling for GitHub
- Local GGUF model engine via llama.cpp
- Full code editor and diff/approval workflow
- ZIP extraction and import
