import LegalPage from '../components/LegalPage';

export default function TermsPage() {
  return <LegalPage title="Terms of Service" path="/terms" description="The terms governing lawful use of RingSlot virtual number and SMS verification services.">
    <p className="legal-note">By creating an account or using RingSlot, you agree to these terms and our Acceptable Use, Privacy, and Refund policies.</p>
    <h2>1. The service</h2>
    <p>RingSlot provides temporary virtual numbers that may receive SMS messages for legitimate verification, software testing, privacy, and business workflows. Availability, delivery time, carrier routing, and acceptance by third-party platforms can change and are not guaranteed.</p>
    <h2>2. Eligibility and accounts</h2>
    <p>You must be at least 18, legally able to enter a contract, and permitted to use the service where you live. Provide accurate account information, protect your password and API key, and notify us promptly of unauthorized access. You are responsible for activity under your account.</p>
    <h2>3. Lawful use</h2>
    <p>You may use RingSlot only for lawful purposes and in line with the rules of any third-party service you contact. Fraud, impersonation, spam, harassment, sanctions evasion, unauthorized account access, automated abuse, and attempts to defeat another platform’s safety controls are prohibited. Our <a href="/acceptable-use">Acceptable Use Policy</a> forms part of these terms.</p>
    <h2>4. Payments and refunds</h2>
    <p>Prices are shown before purchase and wallet deposits are processed by third-party cryptocurrency providers. Network fees and exchange-rate differences may apply. Refund eligibility and wallet credits are described in our <a href="/refund-policy">Refund Policy</a>. Cryptocurrency transfers generally cannot be reversed.</p>
    <h2>5. Suspension and termination</h2>
    <p>We may restrict or close accounts reasonably believed to threaten users, providers, RingSlot, or third parties, or to violate these terms. We may preserve information when required for security, disputes, legal compliance, or abuse prevention.</p>
    <h2>6. Third-party services</h2>
    <p>RingSlot relies on carriers, number suppliers, payment processors, hosting providers, and the platforms sending messages. We do not control those services and are not affiliated with the brands listed in our service directory.</p>
    <h2>7. Disclaimers and liability</h2>
    <p>The service is provided on an “as available” basis. To the maximum extent permitted by law, RingSlot is not liable for indirect, incidental, special, or consequential loss, lost profits, third-party account decisions, or events outside our reasonable control. Nothing here excludes rights or liability that cannot legally be excluded.</p>
    <h2>8. Changes and contact</h2>
    <p>We may update these terms and will publish the new effective date here. Material changes apply prospectively. Questions can be sent to <a href="mailto:support@ringslot.shop">support@ringslot.shop</a>.</p>
  </LegalPage>;
}
