import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const origin = process.env.VERIFY_ORIGIN || "http://localhost:3000";
for (let attempt = 0; attempt < 30; attempt++) {
  try { if ((await fetch(origin)).ok) break; } catch { /* Server may still be starting. */ }
  if (attempt === 29) throw new Error("Production server did not become ready");
  await new Promise(resolve => setTimeout(resolve, 1000));
}
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.includes("https://sanidhyavats.me/projects/harvest"));
assert.ok(urls.includes("https://sanidhyavats.me/projects/oasis"));
for (const url of urls) {
  const response = await fetch(`${origin}${new URL(url).pathname}`);
  assert.equal(response.status, 200, url);
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `Canonical missing: ${url}`);
  assert.equal(new URL(canonical).href, new URL(url).href, `Incorrect canonical: ${url}`);
  assert.ok(html.includes('property="og:image"'), `Social image missing: ${url}`);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
}
const download = await fetch(`${origin}/resume/download`);
assert.equal(download.status, 200);
assert.equal(download.headers.get("content-type"), "application/pdf");
assert.match(download.headers.get("content-disposition"), /^attachment;/);
assert.deepEqual(Buffer.from(await download.arrayBuffer()), await readFile(new URL("../public/resume/Sanidhya_Vats_Resume-AIML.pdf", import.meta.url)));
assert.equal((await fetch(`${origin}/missing-page`)).status, 404);
assert.equal((await fetch(`${origin}/projects/missing-project`)).status, 404);
const robots = await (await fetch(`${origin}/robots.txt`)).text();
assert.ok(robots.includes("Sitemap: https://sanidhyavats.me/sitemap.xml"));
const social = await fetch(`${origin}/opengraph-image`);
assert.equal(social.status, 200);
assert.equal(social.headers.get("content-type"), "image/png");
for (const body of [{}, { name: "Test", email: "invalid", message: "Test", rating: 5 }, { name: "Test", email: "test@example.com", message: "Test", rating: 9 }, { name: 42, email: "test@example.com", message: "Test", rating: 5 }]) {
  assert.equal((await fetch(`${origin}/api/feedback`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })).status, 400);
}
assert.equal((await fetch(`${origin}/api/feedback`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://unrelated.example" }, body: "{}" })).status, 403);
assert.equal((await fetch(`${origin}/api/feedback`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "x".repeat(9000) })).status, 413);
console.log(`Verified ${urls.length} pages, metadata, sitemap, robots, PDF integrity, social image, 404s, and feedback validation.`);
