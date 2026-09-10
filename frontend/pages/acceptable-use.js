import LegalPage from '../components/LegalPage';

export default function AcceptableUsePage() {
  return <LegalPage title="Acceptable Use Policy" path="/acceptable-use" description="Rules for safe, lawful, and responsible use of RingSlot services and API.">
    <p>RingSlot supports legitimate privacy, QA testing, customer-support, and authorized business workflows. You must have the right to perform every action you take through the service.</p>
    <h2>Prohibited activity</h2>
    <ul><li>Fraud, phishing, identity theft, impersonation, or unauthorized account access.</li><li>Creating deceptive or coordinated inauthentic accounts, bypassing bans, or evading platform safety and verification rules.</li><li>Spam, bulk unsolicited messaging, harassment, threats, exploitation, or illegal content.</li><li>Financial crime, sanctions evasion, money laundering, or purchases involving stolen funds.</li><li>Reselling access without written permission, probing infrastructure, disrupting providers, or exceeding API limits.</li><li>Using numbers where prohibited by law or by the applicable third-party platform’s terms.</li></ul>
    <h2>Enforcement</h2>
    <p>We may investigate signals of abuse, limit orders, preserve relevant records, suspend accounts, block network access, and cooperate with providers or lawful authorities. Enforcement may occur without advance notice when necessary to prevent harm.</p>
    <h2>Report abuse</h2>
    <p>Send suspected abuse, including relevant order identifiers and timestamps, to <a href="mailto:support@ringslot.shop">support@ringslot.shop</a>. Do not include passwords or OTP codes.</p>
  </LegalPage>;
}
