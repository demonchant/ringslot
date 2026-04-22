export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://ringslot.shop/</loc><priority>1.0</priority></url>
  <url><loc>https://ringslot.shop/pricing</loc><priority>0.8</priority></url>
  <url><loc>https://ringslot.shop/support</loc><priority>0.5</priority></url>
</urlset>`);
  res.end();
}
