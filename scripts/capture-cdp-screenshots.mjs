import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const artifactDir = "C:\\Users\\prasa\\.gemini\\antigravity\\brain\\9097965a-dcf8-4af7-8ed5-edda161a1ec2";

async function main() {
  const tmpUserData = path.join(process.cwd(), ".chrome-tmp-shots");
  if (!fs.existsSync(tmpUserData)) fs.mkdirSync(tmpUserData, { recursive: true });

  const chrome = spawn(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    [
      "--headless=new",
      "--remote-debugging-port=9444",
      `--user-data-dir=${tmpUserData}`,
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,900"
    ],
    { stdio: "ignore" }
  );

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch("http://127.0.0.1:9444/json/version");
      const data = await res.json();
      if (data.webSocketDebuggerUrl) {
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch {}
  }

  if (!wsUrl) {
    console.error("Failed to connect to headless Chrome CDP");
    chrome.kill();
    return;
  }

  const listRes = await fetch("http://127.0.0.1:9444/json/list");
  const targets = await listRes.json();
  const target = targets.find((t) => t.type === "page");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  await new Promise((r) => (ws.onopen = r));
  await send("Page.enable");
  await send("DOM.enable");
  await send("CSS.enable");

  const shots = [
    {
      url: "http://localhost:3000/posh/options",
      file: "posh-options-directory.png",
      width: 1440,
      height: 900,
      mobile: false,
    },
    {
      url: "http://localhost:3000/posh/options",
      file: "posh-options-mobile.png",
      width: 375,
      height: 812,
      mobile: true,
    },
    {
      url: "http://localhost:3000/posh/witness/token-demo-99",
      file: "posh-witness-portal.png",
      width: 1440,
      height: 900,
      mobile: false,
    },
  ];

  for (const s of shots) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: s.width,
      height: s.height,
      deviceScaleFactor: s.mobile ? 2 : 1,
      mobile: s.mobile,
    });

    await send("Page.navigate", { url: s.url });
    await new Promise((r) => setTimeout(r, 3000));

    const shotRes = await send("Page.captureScreenshot", { format: "png" });
    if (shotRes.result?.data) {
      const dest = path.join(artifactDir, s.file);
      fs.writeFileSync(dest, Buffer.from(shotRes.result.data, "base64"));
      console.log(`[SAVED] ${dest}`);
    }
  }

  ws.close();
  chrome.kill();
  console.log("CDP Screenshot Capture complete.");
}

main().catch(console.error);
