const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.FRONTEND_URL ||
  'https://vapeshopbandramumbai24.com'
).replace(/\/+$/, '');

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    const products = await Product.find(
      { isHidden: { $ne: true } },
      '_id updatedAt'
    ).lean();

    const staticPages = [
      { path: '/', changefreq: 'daily', priority: '1.0' },
      { path: '/store', changefreq: 'daily', priority: '0.9' },
      { path: '/about', changefreq: 'monthly', priority: '0.6' },
      { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    ];

    const now = new Date().toISOString();
    const entries = [];

    for (const page of staticPages) {
      entries.push(urlEntry(`${SITE_URL}${page.path}`, now, page.changefreq, page.priority));
    }

    for (const p of products) {
      const id = p._id instanceof mongoose.Types.ObjectId ? p._id.toString() : String(p._id);
      entries.push(urlEntry(`${SITE_URL}/product/${id}`, p.updatedAt || now, 'weekly', '0.8'));
    }

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...entries,
      '</urlset>',
    ].join('\n');

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(xml);
  } catch (err) {
    console.error('Sitemap error:', err.message);
    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
});

router.get('/robots.txt', (req, res) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /profile',
    'Disallow: /orders',
    'Disallow: /checkout',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(body);
});

module.exports = router;
