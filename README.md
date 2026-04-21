# Record Manager Statistics

Frontend statistics dashboard for the [Record Manager](https://github.com/kbss-cvut/record-manager-ui) ecosystem.
Visualizes usage trends sourced from a semantic web backend.

**Related repositories**
- [record-manager-statistics-server](https://github.com/ulcheyev/record-manager-statistics-server) — Spring Boot backend, SPARQL queries against GraphDB
- [record-manager-ui](https://github.com/kbss-cvut/record-manager-ui) — main Record Manager frontend

## [![Vercel Deploy](https://deploy-badge.vercel.app/vercel/record-manager-statistics?name=vercel+demo)](https://record-manager-statistics.vercel.app)
![Build (main)](https://github.com/ulcheyev/record-manager-statistics/actions/workflows/build-and-push.yml/badge.svg?branch=main)

---

## Table of contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [App modes](#app-modes)
- [Development](#development)
- [Docker](#docker)

---

## Overview

`record-manager-statistics` is a standalone React + TypeScript application served under the `/statistics` path of the Record Manager nginx gateway. It integrates with the existing Keycloak authentication realm and reads data from the statistics REST API, which itself queries a GraphDB triple store.

---

## Requirements

| Tool | Version |
|------|---------|
| Node.js | 20+ |
| npm | 10+ |
| Docker | 24+ (for containerized deployment) |

---

## Getting started

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/statistics`.

---

## Configuration

Configuration is delivered at three levels, evaluated in priority order:

| Priority | Source | Used in |
|----------|--------|---------|
| 1 (highest) | `window.__ENV__` injected by nginx | Production |
| 2 | `RM_STATISTICS_*` env vars (`.env.local`) | Local dev |
| 3 | Hardcoded fallbacks in `runtime.ts` | Fallback |


---

## App modes

### `prod`
Connects to the live statistics server. Requires a valid access token. All API requests are authenticated.

### `demo`
Runs entirely with mock data — no backend or auth required. Useful for local development, UI work, and presentations.

```
RM_STATISTICS_APP_MODE=demo
```
---


## Development

```bash
npm run dev          # Start dev server
npm run build        # Type-check + production build
npm run lint         # ESLint
```

### Git hooks

Husky runs lint-staged (with prettier) on every commit — staged `.ts`/`.tsx` files are automatically formatted and linted before the commit is accepted. Unfixable lint errors block the commit.

Hooks are set up automatically on `npm install` via the `prepare` script.

---

## Docker
Build and run the container locally:

```bash
docker build -t record-manager-statistics .
docker run -p 8080:80 record-manager-statistics
```

