async function test() {
  const res = await fetch("http://localhost:3000");
  const html = await res.text();
  console.log("HTML length:", html.length);
  const regex = /class="([^"]*fixed[^"]*)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    console.log("Fixed element class:", match[1]);
  }
}
test();

