# Local Setup and VS Code Workflow

This guide covers how to stand up the FastAPI backend and React frontend locally, including a one-shot setup script and the provided VS Code launch configurations.

## Prerequisites
- Python 3.11+
- Node.js 18+ and npm (for the React frontend)
- OpenSSL (typically preinstalled) for HTTPS support if you later add certificates

## Environment variables
- `GOOGLE_CLIENT_ID` — required for Google sign-in validation. You can set it in a shell session or in a `backend/.env` file (loaded automatically via `python-dotenv`).

Example `backend/.env`:
```
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

## Quick bootstrap (scripted)
From the repo root, run:
```
./scripts/setup_local.sh
```
The script will:
1. Create/refresh a Python virtual environment at `.venv` and install `backend/requirements.txt`.
2. Install frontend dependencies if `frontend/package.json` exists.
3. Remind you how to start the backend (`uvicorn`) and frontend (`npm run dev`).

## Manual setup
### Backend
1. Create and activate a virtual environment:
   ```
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```
   pip install -r backend/requirements.txt
   ```
3. (Optional) Set environment variables, e.g.:
   ```
   export GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
   ```
4. Start the API server from the repo root:
   ```
   uvicorn app.main:app --app-dir backend --reload
   ```
   The API listens on http://localhost:8000.

### Frontend
1. Install dependencies (from the repo root):
   ```
   npm install --prefix frontend
   ```
2. Run the dev server:
   ```
   npm run --prefix frontend dev
   ```
   The frontend defaults to http://localhost:5173 and is already allowed by CORS in the backend.

### Running tests
Backend tests use the SQLite in-memory database configured in the test fixtures.
```
python -m pytest backend/tests
```

## VS Code integration
- The workspace already includes `.vscode/launch.json` equivalents in `launch.json` at the repo root.
- Use the **Run All (Backend + Frontend)** compound configuration to start both servers together inside VS Code. It will run `uvicorn app.main:app --reload` in `backend/` and `npm run dev` in `frontend/`.
- Ensure your terminal session or `.env` file supplies `GOOGLE_CLIENT_ID` before launching the backend target.
