/**
 * generate-index.js
 * Run this script locally whenever you add/remove songs.
 * It scans your Songs/ folder and writes Songs/index.json automatically.
 *
 * Usage:
 *   node generate-index.js
 *
 * Requirements: Node.js (https://nodejs.org) — any version 14+
 */

const fs   = require("fs");
const path = require("path");

const SONGS_DIR  = path.join(__dirname, "Songs");
const OUTPUT     = path.join(SONGS_DIR, "index.json");
const AUDIO_EXTS = new Set([".mp3", ".ogg", ".wav", ".flac", ".m4a", ".aac"]);

if (!fs.existsSync(SONGS_DIR)) {
  console.error("❌  Songs/ folder not found. Make sure this script is in the same folder as your Songs/ directory.");
  process.exit(1);
}

const files = fs.readdirSync(SONGS_DIR).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return AUDIO_EXTS.has(ext);
});

if (files.length === 0) {
  console.warn("⚠️  No audio files found in Songs/. index.json will be empty.");
}

// Strip extension so the tool stores just the song name
const songNames = files.map(f => path.basename(f, path.extname(f)));

fs.writeFileSync(OUTPUT, JSON.stringify(songNames, null, 2), "utf8");

console.log(`✅  Written ${songNames.length} song(s) to Songs/index.json:`);
songNames.forEach(n => console.log(`   • ${n}`));
console.log("\nNow commit Songs/index.json to your repo and push to GitHub.");
