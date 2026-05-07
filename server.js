const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, 'public');
const festivalsDir = path.join(publicDir, 'festivals');

app.get('/festivals', (_req, res) => {
  res.sendFile(path.join(publicDir, 'festivals.html'));
});

app.use(express.static(publicDir, { redirect: false }));

app.get('/festivals/:slug', (req, res, next) => {
  const slug = req.params.slug.replace(/[^a-z0-9-]/gi, '');
  if (!slug) return next();
  const file = path.join(festivalsDir, `${slug}.html`);
  fs.access(file, fs.constants.R_OK, (err) => {
    if (err) return next();
    res.sendFile(file);
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`BakeHouse menu running on port ${port}`);
});
