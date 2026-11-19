import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function main() {
  const tmpUserData = path.join(process.cwd(), ".chrome-tmp");
  if (!fs.existsSync(tmpUserData)) fs.mkdirSync(tmpUserData, { recursive: true });

  const chrome = spawn(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    [
      "--headless=new",
      "--remote-debugging-port=9333",
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
      const res = await fetch("http://127.0.0.1:9333/json/version");
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

  const listRes = await fetch("http://127.0.0.1:9333/json/list");
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
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((r) => setTimeout(r, 2500));

  const getMetrics = async (label) => {
    const data = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const h = document.querySelector('header');
          const t = document.querySelector('div[aria-label="Chambers Scrolled Header Ribbon"]');
          const m = document.querySelector('div[aria-label="Services Mega Menu"]');
          const hRect = h ? h.getBoundingClientRect() : null;
          const tRect = t ? t.getBoundingClientRect() : null;
          const mRect = m ? m.getBoundingClientRect() : null;
          return JSON.stringify({
            label: "${label}",
            header: hRect ? { top: hRect.top, bottom: hRect.bottom, height: hRect.height } : null,
            ticker: tRect ? { top: tRect.top, bottom: tRect.bottom, height: tRect.height } : null,
            megamenu: mRect ? { top: mRect.top, bottom: mRect.bottom, height: mRect.height } : null,
            gap: (hRect && mRect) ? (mRect.top - hRect.bottom) : null
          });
        })()
      `,
      returnByValue: true
    });
    const val = data.result?.result?.value;
    return val ? JSON.parse(val) : data;
  };

  const takeScreenshot = async (filename) => {
    const res = await send("Page.captureScreenshot", { format: "png" });
    if (res.result?.data) {
      fs.writeFileSync(filename, Buffer.from(res.result.data, "base64"));
      console.log(`Saved screenshot: ${filename}`);
    }
  };

  // State 1: scrollY = 0, click Services
  await send("Runtime.evaluate", {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Services'));
      if (btn) btn.click();
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const m1 = await getMetrics("scrollY = 0");
  console.log("State 1 (scrollY = 0, opened):", JSON.stringify(m1, null, 2));
  await takeScreenshot("C:\\Users\\prasa\\.gemini\\antigravity\\brain\\9097965a-dcf8-4af7-8ed5-edda161a1ec2\\mega-menu-gap-state1.png");

  // State 2: scrollY = 100, click Services
  await send("Runtime.evaluate", {
    expression: `
      window.scrollTo(0, 100);
      window.dispatchEvent(new Event('scroll'));
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  await send("Runtime.evaluate", {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Services'));
      if (btn) btn.click();
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const m2 = await getMetrics("scrollY = 100");
  console.log("State 2 (scrollY = 100, opened):", JSON.stringify(m2, null, 2));
  await takeScreenshot("C:\\Users\\prasa\\.gemini\\antigravity\\brain\\9097965a-dcf8-4af7-8ed5-edda161a1ec2\\mega-menu-gap-state2.png");

  // State 3: /about page (unscrolled, light header), click Services
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise((r) => setTimeout(r, 2000));
  await send("Runtime.evaluate", {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Services'));
      if (btn) btn.click();
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const m3 = await getMetrics("About Page unscrolled");
  console.log("State 3 (/about unscrolled, opened):", JSON.stringify(m3, null, 2));
  await takeScreenshot("C:\\Users\\prasa\\.gemini\\antigravity\\brain\\9097965a-dcf8-4af7-8ed5-edda161a1ec2\\mega-menu-gap-about.png");

  ws.close();
  chrome.kill();
}

main().catch(console.error);
