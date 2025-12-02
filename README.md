# bake-house

Single-page BakeHouse menu that can be deployed directly to Railway. The Node server serves a static HTML file from `/public`, so Railway can autodetect it as a Node app and expose it on the assigned port.

## Run locally

```bash
npm install
npm start
```

Then visit `http://localhost:3000` to view the menu. See [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md) for the legacy FastAPI/React stack if you want to extend this further.
