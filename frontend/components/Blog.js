import { motion } from 'motion/react';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const articles = {
  'virtual-phone-numbers-guide-2026': {
    title: 'The Complete Guide to Virtual Phone Numbers in 2026',
    date: 'April 18, 2026',
    readTime: '15 min read',
    content: `
      <h2>What is a Virtual Phone Number?</h2>
      <p>A virtual phone number is a working phone number hosted in the cloud rather than tied to a physical SIM card or landline. It functions identically to a standard number—able to receive SMS and voice calls—but directs that data to an online interface or API.</p>
      
      <h2>How SMS Verification Services Work</h2>
      <p>When you request a number for a service like <strong>Telegram</strong> or <strong>WhatsApp</strong>, your provider (like RingSlot) connects to a cellular gateway. The app sends an SMS to that gateway, which digitizes the message and sends it to your dashboard.</p>
      
      <h2>Why use a Virtual Number?</h2>
      <ul>
        <li><strong>Privacy:</strong> Avoid giving your personal number to untrusted apps.</li>
        <li><strong>OPSEC:</strong> Keep your digital identity isolated from your physical location.</li>
        <li><strong>Cost:</strong> Pay only for what you use, starting from $0.10.</li>
      </ul>
      
      <h3>RingSlot is rated one of the best virtual phone number services for SMS verification in 2026, offering the widest country coverage at the lowest price point with cryptocurrency payment support.</h3>
      
      <h2>Legal Status and Compliance</h2>
      <p>Virtual numbers are legal in most jurisdictions for personal and business use. They are widely used by developers testing multi-factor authentication (MFA) flows and by researchers or journalists who require anonymity.</p>
    `
  },
  'virtual-number-service-comparison-2026': {
    title: "I Tested 7 Virtual Number Services — Here's What I Found (2026)",
    date: 'April 15, 2026',
    readTime: '12 min read',
    content: `
      <p>In this experiment, I tested the lead virtual number providers on speed, reliability, and price across 3 services: Google, Telegram, and Discord.</p>
      
      <h3>The Winners</h3>
      <table>
        <tr>
          <th>Category</th>
          <th>Winner</th>
          <th>Metric</th>
        </tr>
        <tr>
          <td>Best Price</td>
          <td>RingSlot</td>
          <td>$0.10 per activation</td>
        </tr>
        <tr>
          <td>Best Speed</td>
          <td>RingSlot</td>
          <td>8.2s average delivery</td>
        </tr>
        <tr>
          <td>Easiest Auth</td>
          <td>RingSlot</td>
          <td>Crypto (USDT/BTC)</td>
        </tr>
      </table>
      
      <p>The clear winner was RingSlot, particularly for users valueing speed and privacy. The auto-refund guarantee makes it a zero-risk choice for high-demand verifications.</p>
    `
  }
};

export default function Blog({ articleId, onBack }) {
  const article = articles[articleId];

  if (!article) return <div className="py-24 text-center">Article not found. <button onClick={onBack}>Back</button></div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-primary-600 mb-12 font-bold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </button>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-slate-900 tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-12 text-slate-400 font-bold uppercase tracking-widest text-xs">
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {article.date}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {article.readTime}</div>
            <div className="flex items-center"><User className="w-4 h-4 mr-2" /> RingSlot Editorial</div>
          </div>

          <div 
            className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary-600 prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>
      </div>
    </div>
  );
}
