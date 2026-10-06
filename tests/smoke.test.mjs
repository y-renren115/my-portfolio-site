import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, before, test } from 'node:test';
import next from 'next';

const app = next({ dev: false, hostname: '127.0.0.1' });
let server;
let baseURL;

before(async () => {
  await app.prepare();
  server = createServer(app.getRequestHandler());
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  baseURL = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    server.closeAllConnections();
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
  await app.close();
});

const routes = [
  ['/', 'Welcome to My Portfolio Site!'],
  ['/about', 'Career Overview'],
  ['/works', 'フロントエンド開発'],
  ['/contact', 'お問い合わせはSNSからお願いいたします'],
];

for (const [route, content] of routes) {
  test(`${route} renders its content and shared navigation`, async () => {
    const response = await fetch(`${baseURL}${route}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(content));
    for (const href of ['/', '/about', '/works', '/contact']) {
      assert.ok(html.includes(`href="${href}"`));
    }
    assert.ok(html.includes('Ren Yoshizawa All rights reserved.'));
    assert.ok(html.includes(route === '/' ? 'bg-homepage-image' : 'bg-background-image'));

    const pageData = JSON.parse(html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s)[1]);
    assert.equal(pageData.page, route);
    assert.ok(pageData.buildId);
  });
}

test('About uses valid block markup and modern responsive image attributes', async () => {
  const html = await (await fetch(`${baseURL}/about`)).text();
  assert.doesNotMatch(html, /<p\b[^>]*>\s*<div/);
  assert.match(html, /sizes="400px"/);
  assert.match(html, /class="object-cover"/);
  assert.match(html, /alt="プロフィール画像"/);
  assert.doesNotMatch(html, /\s(?:layout|objectFit)="/);
});

test('production CSS, JavaScript, favicon, and local images are served', async () => {
  const html = await (await fetch(baseURL)).text();
  const assets = [...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+\.(?:js|css))"/g)]
    .map((match) => match[1]);
  assert.ok(assets.some((asset) => asset.endsWith('.css')));
  assert.ok(assets.some((asset) => asset.endsWith('.js')));
  for (const asset of new Set([...assets, '/favicon.ico', '/personalIcon.png', '/homepageImg.png', '/backgroundImage.png'])) {
    const response = await fetch(`${baseURL}${asset}`);
    assert.equal(response.status, 200, asset);
    assert.ok((await response.arrayBuffer()).byteLength > 0, asset);
  }
});

test('Next image optimization returns a supported image', async () => {
  const response = await fetch(`${baseURL}/_next/image?url=%2FpersonalIcon.png&w=640&q=75`, {
    headers: { accept: 'image/avif,image/webp,image/*,*/*;q=0.8' },
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^image\/(webp|png|jpeg)$/);
  assert.ok((await response.arrayBuffer()).byteLength > 0);
});

test('unknown pages return the expected 404', async () => {
  const response = await fetch(`${baseURL}/__upgrade_missing_page__`);
  assert.equal(response.status, 404);
  assert.match(await response.text(), /This page could not be found/);
});
