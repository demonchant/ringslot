import LegalPage from '../components/LegalPage';

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy" description="How RingSlot collects, uses, shares, secures, and retains personal information.">
    <p className="legal-note">This policy covers the RingSlot website, account dashboard, API, support, and transaction records.</p>
    <h2>Information we collect</h2>
    <ul><li>Account data such as email address, password hash, role, and API key.</li><li>Security data such as IP address, browser/device information, login timestamps, and trusted-device records.</li><li>Order and payment data such as service, country, number, status, wallet entries, crypto payment reference, and transaction metadata.</li><li>Messages you submit through support or contact forms.</li><li>Operational logs needed to secure, diagnose, and improve the service.</li></ul>
    <h2>How we use information</h2>
    <p>We use it to create and secure accounts, provide numbers and messages, process wallet credits, prevent fraud and abuse, answer support requests, maintain availability, comply with law, and understand service performance.</p>
    <h2>Sharing and processors</h2>
    <p>We share only what is needed with infrastructure, database, email, SMS-number, monitoring, and payment providers. Blockchain transfers are publicly visible by design. We may also disclose information when legally required or needed to protect users and the service. We do not sell personal information.</p>
    <h2>Storage and retention</h2>
    <p>We retain information only as long as reasonably necessary for service delivery, security, dispute resolution, fraud prevention, accounting, and legal obligations. Retention periods vary by record type. OTP content should be treated as sensitive and is accessible only through the authenticated account and operational systems.</p>
    <h2>Your choices</h2>
    <p>You may request access, correction, or deletion of eligible personal information by emailing support. Some records may be retained where law, security, fraud prevention, or financial reconciliation requires it. You can revoke trusted devices and regenerate your API key from your account.</p>
    <h2>Cookies and local storage</h2>
    <p>RingSlot uses browser storage needed to keep you signed in and remember essential session information. If optional analytics or advertising technologies are introduced, we will update this policy and provide consent controls where required.</p>
    <h2>Security and international processing</h2>
    <p>We use access controls, encrypted transport, password hashing, rate limits, and monitoring. No online system is completely secure. Our providers may process information in other countries with different data-protection rules.</p>
    <h2>Contact</h2>
    <p>For privacy questions or requests, email <a href="mailto:support@ringslot.shop">support@ringslot.shop</a>.</p>
  </LegalPage>;
}
