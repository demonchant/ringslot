import { SERVICES, COUNTRIES, BASE_URL } from '../utils/seoData';

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', "'":'&apos;', '"':'&quot;' })[c]);
}

export async function getServerSideProps({ res }) {
  const publicPages = [
    '/', '/about', '/virtual-phone-number', '/pricing', '/services', '/countries', '/api-docs',
    '/faq', '/knowledge-base', '/contact', '/support', '/security',
    '/terms', '/privacy', '/acceptable-use', '/refund-policy',
  ];
  const urls = [
    ...publicPages,
    ...SERVICES.map(service => `/service/${service.slug}`),
    ...COUNTRIES.map(country => `/country/${country.slug}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `  <url><loc>${escapeXml(`${BASE_URL}${path}`)}</loc></url>`).join('\n')}
</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() { return null; }
