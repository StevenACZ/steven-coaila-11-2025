import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
const html = readFileSync('dist/index.html', 'utf8')
assert.match(html, /<html lang="es">/)
assert.match(html, /rel="canonical" href="https:\/\/talana\.stevenacz\.com\/"/)
assert.match(html, /name="description"/)
assert.match(html, /<noscript[\s>]/)
assert(!html.includes('fonts.googleapis.com'))
assert.match(
  readFileSync('dist/robots.txt', 'utf8'),
  /Sitemap: https:\/\/talana\.stevenacz\.com\/sitemap.xml/,
)
const sitemap = readFileSync('dist/sitemap.xml', 'utf8')
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 1)
assert(!sitemap.includes('/team'))
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
assert.equal(graph['@type'], 'WebApplication')
const image = readFileSync('dist/og-image-20260905.png')
assert.equal(image.readUInt32BE(16), 1200)
assert.equal(image.readUInt32BE(20), 630)
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) {
  const bytes = readFileSync('dist' + match[1])
  if (match[1].endsWith('.js'))
    assert(gzipSync(bytes).length < 160000, 'Entry script exceeds 160 KB gzip')
}
console.log('Metadata, sitemap, social image and entry budget verified.')
