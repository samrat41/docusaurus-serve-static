#!/usr/bin/env node

const { Command } = require('commander');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const program = new Command();

program
  .name('docusaurus-serve-static')
  .description('Serve a Docusaurus production build with proper baseUrl support')
  .option('-d, --dir <folder>', 'Build folder to serve', 'dist')
  .option('-p, --port <number>', 'Port to run the server on', '3000')
  .option('-b, --baseUrl <url>', 'Base URL to serve under', '/')
  .parse(process.argv);

const options = program.opts();

const BUILD_DIR = path.resolve(process.cwd(), options.dir);
const PORT = parseInt(options.port, 10);

let baseUrl = options.baseUrl || '/';
if (!baseUrl.startsWith('/')) baseUrl = '/' + baseUrl;
if (!baseUrl.endsWith('/')) baseUrl += '/';

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`❌ Build directory does not exist: ${BUILD_DIR}`);
  process.exit(1);
}

const app = express();

// Serve static assets under baseUrl
app.use(baseUrl, express.static(BUILD_DIR));

// Redirect all unmatched routes under baseUrl to index.html
app.get(`${baseUrl}*`, (req, res) => {
  const indexPath = path.join(BUILD_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(PORT, () => {
  const fullUrl = `http://localhost:${PORT}${baseUrl}`;
  console.log(`✅ Serving '${BUILD_DIR}'`);
  console.log(`🌐 URL: ${fullUrl}`);
  exec(`open-cli "${fullUrl}"`);
});
