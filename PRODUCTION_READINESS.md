# RingSlot production readiness

## What is implemented

- Next.js frontend with public marketing, service, country, FAQ, knowledge-base, contact, legal, security, and live-status pages.
- Registration, password login, password reset, new-device verification, dashboard, wallet deposits, one-time activation orders, OTP polling, cancellation, expiry refunds, order history, API keys, public contact submissions, and role-separated administration endpoints.
- A protected super-admin workspace keeps supplier identity, supplier cost, profit pricing, financial analytics, integration controls, staff roles, and withdrawals private from customers and ordinary administrators.
- Dynamic XML sitemap covering all public pages, service pages, and country pages; crawler rules; canonical metadata; structured data without unsupported ratings; and factual `llms.txt` references.
- Transactional purchase/refund paths, signed and matched payment callbacks, OTP retention cleanup, origin allowlisting, request limits, and patched dependencies.

## Required before accepting real users

1. Apply `schema.sql` to a new PostgreSQL database. For an existing database, apply `backend/migrations/001_contact_messages.sql` and verify all tables in `schema.sql` exist.
2. Set every production variable documented in `backend/.env.example`. Use strong, unique values. Never commit real secrets.
3. Fund and test each enabled SMS provider. Disable integrations without a valid key or compatible service/country mapping.
4. Configure NOWPayments production credentials and its IPN callback as `https://ringslot-backend.onrender.com/api/wallet/webhook`. Run a small real deposit and verify exactly one wallet credit.
5. Configure and verify the Resend sending domain for `noreply@ringslot.shop`; test welcome, device-verification, password-reset, and contact emails.
6. Point `ringslot.shop` and `www.ringslot.shop` to the frontend, set `NEXT_PUBLIC_API_URL`, and ensure `FRONTEND_URL` and `BACKEND_URL` match the final HTTPS origins.
7. Replace infrastructure names/regions in `backend/render.yaml` if the actual Render account differs, then deploy from the repository containing that blueprint.
8. Have qualified counsel adapt the Terms, Privacy, Acceptable Use, and Refund policies to the operator's legal entity, address, governing law, supported markets, and regulatory duties.
9. Set `SUPERADMIN_EMAIL` to the owner's registered email. At API boot, that existing account is promoted to the protected `superadmin` role. The owner can grant or remove ordinary admin access in the Owner Control Center; no public admin creation exists.
10. Run `npm.cmd test`, `npm.cmd run build`, and `npm.cmd run smoke:access` in the backend, plus `npm.cmd run build` in the frontend. Then test registration, first-login email, repeat login, reset password, deposit, purchase, received OTP, manual cancellation, automatic expiry refund, contact submission, support, and owner review.

## Search and AI discovery

- Submit `https://ringslot.shop/sitemap.xml` in Google Search Console and Bing Webmaster Tools after the final domain is live.
- Keep public claims synchronized with actual inventory and observed performance. Do not add fake reviews, uptime, delivery speed, affiliations, or structured-data ratings.
- Publish genuinely useful, original guides and changelogs only when the team can maintain them. Search engines and answer engines reward reliable information and independent citations; no technical file can guarantee recommendations.
- Earn relevant mentions through provider documentation, developer integrations, legitimate directories, customer case studies with permission, and useful open-source examples. Avoid bought links, doorway pages, review fabrication, and automated content spam.
- Monitor index coverage, branded/non-branded queries, Core Web Vitals, signup completion, deposit completion, activation success, refund rate, and support volume. Add privacy-compliant analytics only after choosing a provider and updating consent/privacy disclosures where required.

## Deferred product work

- Long-term rental UI and charging are disabled until a rental-capable provider, renewal lifecycle, multi-message storage, expiry handling, and refund rules are implemented and tested.
- Social login controls were removed because no OAuth backend exists.
- Customer-configurable outbound webhooks should not be advertised until the developer routes, database tables, delivery worker, signature verification documentation, retries, and dashboard controls are all mounted and tested.
- Consider moving browser authentication from local storage to secure, HttpOnly, SameSite cookies as a dedicated authentication migration.
