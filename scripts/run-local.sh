#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if command -v node >/dev/null 2>&1; then
  PORTFOLIO_NODE=$(command -v node)
else
  PORTFOLIO_NODE="/Users/Melody/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
fi
if [ ! -x "$PORTFOLIO_NODE" ]; then
  echo 'Install Node.js 20.9+ and install dependencies with npm install.' >&2
  exit 1
fi
export PATH="$(dirname "$PORTFOLIO_NODE"):$PATH"
case "${1:-dev}" in
  dev) exec "$PORTFOLIO_NODE" node_modules/next/dist/bin/next dev --hostname 127.0.0.1 ;;
  start) exec "$PORTFOLIO_NODE" node_modules/next/dist/bin/next start --hostname 127.0.0.1 ;;
  build) exec "$PORTFOLIO_NODE" node_modules/next/dist/bin/next build ;;
  lint) exec "$PORTFOLIO_NODE" node_modules/eslint/bin/eslint.js . ;;
  typecheck) exec "$PORTFOLIO_NODE" node_modules/typescript/bin/tsc --noEmit ;;
  *) echo 'Usage: ./scripts/run-local.sh [dev|start|build|lint|typecheck]' >&2; exit 1 ;;
esac
