import LegalPage from '../components/LegalPage';

export default function RefundPolicyPage() {
  return <LegalPage title="Refund Policy" path="/refund-policy" description="When RingSlot orders are automatically refunded and when wallet deposits are final.">
    <h2>Activation orders</h2>
    <p>If an eligible one-time activation does not receive an SMS before the 10-minute activation window ends, the order is marked expired and its purchase price is automatically returned to your RingSlot wallet. You may also request cancellation while an order is still waiting; once an SMS is received or the provider no longer permits cancellation, it is not refundable.</p>
    <h2>Incorrect or rejected numbers</h2>
    <p>Contact support promptly with the order ID if a number is invalid or cannot receive the selected service’s message. We will review provider records. A third-party platform choosing not to accept a valid number does not automatically qualify for a refund.</p>
    <h2>Wallet deposits</h2>
    <p>Cryptocurrency transfers are generally irreversible. Confirm the network, asset, address, and amount before sending. RingSlot wallet balances are service credits and are not ordinarily withdrawable or redeemable for cash. Duplicate or demonstrably incorrect credits may be corrected.</p>
    <h2>Abuse and charge disputes</h2>
    <p>Orders or accounts connected to prohibited activity are not eligible for discretionary refunds. This does not limit any non-waivable consumer rights that apply to you.</p>
    <h2>Help</h2>
    <p>Open an authenticated support ticket or email <a href="mailto:support@ringslot.shop">support@ringslot.shop</a>. Include the order or payment reference, but never send your password, private keys, or OTP.</p>
  </LegalPage>;
}
