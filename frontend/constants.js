
export const SERVICES = [
  { id: 'telegram', name: 'Telegram', domain: 'telegram.org', price: 0.15 },
  { id: 'whatsapp', name: 'WhatsApp', domain: 'whatsapp.com', price: 0.12 },
  { id: 'google', name: 'Google', domain: 'google.com', price: 0.14 },
  { id: 'discord', name: 'Discord', domain: 'discord.com', price: 0.10 },
  { id: 'instagram', name: 'Instagram', domain: 'instagram.com', price: 0.11 },
  { id: 'facebook', name: 'Facebook', domain: 'facebook.com', price: 0.11 },
  { id: 'twitter', name: 'Twitter / X', domain: 'twitter.com', price: 0.09 },
  { id: 'openai', name: 'OpenAI / ChatGPT', domain: 'openai.com', price: 0.20 }
];

export const COUNTRIES = [
  { code: 'any', name: 'Any Country', flag: '🌍', available: '50,000+' },
  { code: 'us', name: 'United States', flag: '🇺🇸', available: '3,486', dial: '+1' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', available: '2,914', dial: '+44' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦', available: '3,456', dial: '+1' },
  { code: 'de', name: 'Germany', flag: '🇩🇪', available: '2,108', dial: '+49' },
  { code: 'fr', name: 'France', flag: '🇫🇷', available: '1,902', dial: '+33' },
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬', available: '842', dial: '+234' },
  { code: 'in', name: 'India', flag: '🇮🇳', available: '4,501', dial: '+91' },
];

export const FLOW_STEPS = [
  { step: '01', icon: 'UserPlus', title: 'Register', description: 'Create an account and sign in to your dashboard.' },
  { step: '02', icon: 'Wallet', title: 'Add Funds', description: 'Deposit crypto to your unique wallet address.' },
  { step: '03', icon: 'Smartphone', title: 'Select Service', description: 'Choose from 1,000+ available online services.' },
  { step: '04', icon: 'Key', title: 'Receive OTP', description: 'Get your activation code instantly on your screen.' }
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individual users and occasional verifications.',
    features: ['Pay-per-use', '170+ Countries', 'Standard Response', 'Basic Support'],
    isPopular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/mo credit',
    description: 'Ideal for power users who need priority numbers and speed.',
    features: ['10% Bonus Credit', 'Priority Numbers', 'Instant Response', '24/7 Priority Support', 'API Access'],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Bulk solutions for large scale automation and businesses.',
    features: ['Tiered Volume Discounts', 'Dedicated Nodes', 'SLA Guarantee', 'Dedicated Manager', 'Custom API Flow'],
    isPopular: false
  }
];
