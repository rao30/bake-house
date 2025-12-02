#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/4] Creating/updating Python virtual environment at .venv"
python3 -m venv .venv
source .venv/bin/activate

echo "[2/4] Installing backend dependencies"
pip install --upgrade pip >/dev/null
pip install -r backend/requirements.txt

echo "[3/4] Installing frontend dependencies (if package.json is present)"
if [ -f "frontend/package.json" ]; then
  npm install --prefix frontend
else
  echo " - Skipped: frontend/package.json not found"
fi

echo "[4/4] Done!"
echo "Backend: activate venv (source .venv/bin/activate) then run: uvicorn app.main:app --app-dir backend --reload"
echo "Frontend: npm run --prefix frontend dev"
