const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// prefer 'dist' but fall back to 'build'
const candidateDirs = ['dist', 'build'];
const outDir = candidateDirs.find(d => fs.existsSync(path.join(__dirname, d)));

if (!outDir) {
  console.error('No production build found. Run "npm run build" first. Expected "dist/" or "build/".');
  process.exit(1);
}

const distDir = path.join(__dirname, outDir);
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error(`Missing index.html in ${outDir}. Did the build succeed?`);
  process.exit(1);
}

app.use(express.static(distDir));

// serve index.html for all client-side routes (use middleware fallback to avoid path-to-regexp issues)
app.use((req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server listening http://localhost:${PORT} (serving ./${outDir})`);
});