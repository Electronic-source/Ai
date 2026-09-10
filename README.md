# Ai v0.3.1

Android native Kotlin/Jetpack Compose scaffold for the Ai app.

## Current capabilities

- AI Chat UI scaffold
- AI Coder UI scaffold
- File creation/export
- ZIP creation/export
- GitHub App OAuth
- OAuth state validation
- PKCE authorization-code flow
- Android deep-link callback
- GitHub Pages callback bridge

## Build structure

The Android module is under `app/`.

## GitHub Actions build

The workflow is `.github/workflows/build-apk.yml`.

Before running it, create a repository Actions secret named:

`AI_GITHUB_CLIENT_SECRET`

The workflow creates `local.properties` only on the runner, builds `app-debug.apk`, and uploads it as the `Ai-debug-apk` artifact.

## Local build

Copy `local.properties.example` to `local.properties` and set:

`GITHUB_CLIENT_SECRET=...`

Never commit `local.properties`.

## Security note

An Android APK is a public client. A client secret embedded in an APK cannot be treated as confidential. PKCE and state validation are enabled, but production-grade protection should move the code-to-token exchange to a backend.

## Next milestones

1. Verify OAuth end-to-end.
2. Add GitHub API client.
3. Add repository browser.
4. Add file read/write, branches, commits and PRs.
5. Add local GGUF/llama.cpp engine.
6. Add agent tool-calling and approval workflow.
