const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const artifactDir = "C:\\Users\\prasa\\.gemini\\antigravity\\brain\\9097965a-dcf8-4af7-8ed5-edda161a1ec2";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const targets = [
  { url: "http://localhost:3000/posh/options", name: "phase7-posh-options.png", width: 1280, height: 900 },
  { url: "http://localhost:3000/posh/options", name: "phase7-posh-options-mobile.png", width: 375, height: 812 },
  { url: "http://localhost:3000/posh/witness/token-demo-99", name: "phase7-posh-witness.png", width: 1280, height: 900 },
  { url: "http://localhost:3000/offline.html", name: "pwa-offline-fallback.png", width: 500, height: 700 }
];

async function warmup(url) {
  return new Promise((resolve) => {
    http.get(url, () => setTimeout(resolve, 1500)).on("error", resolve);
  });
}

async function run() {
  for (const t of targets) {
    await warmup(t.url);
    const dest = path.join(artifactDir, t.name);
    const cmd = `"${chromePath}" --headless=new --disable-gpu --screenshot="${dest}" --window-size=${t.width},${t.height} --virtual-time-budget=4000 ${t.url}`;
    try {
      execSync(cmd, { stdio: "ignore" });
      console.log(`[OK] Captured and saved ${dest}`);
    } catch (err) {
      console.error(`[ERR] Failed ${t.url}: ${err.message}`);
    }
  }
}

run();
