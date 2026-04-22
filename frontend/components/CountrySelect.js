// components/CountrySelect.js
// Full country list with area codes for countries that use them (US, CA, AU states etc.)

export const COUNTRIES = [
  { code:'any',  name:'Any Country (Cheapest)',    flag:'🌍', areaCodes: null },

  // ── North America ────────────────────────────────────────────
  { code:'us',   name:'United States',    flag:'🇺🇸', areaCodes:[
    { code:'us_ny',  label:'New York (+1 212/646/718/917/929)' },
    { code:'us_ca',  label:'California (+1 213/310/323/415/424/510/619/626/650/714/747/760/805/818/858/909/925/949)' },
    { code:'us_tx',  label:'Texas (+1 214/281/346/361/409/430/432/469/512/682/713/726/737/806/817/830/903/915/936/940/956/972/979)' },
    { code:'us_fl',  label:'Florida (+1 239/305/321/352/386/407/561/727/754/772/786/813/850/863/904/941/954)' },
    { code:'us_il',  label:'Illinois (+1 217/224/309/312/331/618/630/708/773/779/815/847/872)' },
    { code:'us_wa',  label:'Washington (+1 206/253/360/425/509/564)' },
    { code:'us_other', label:'Other US state' },
  ]},
  { code:'ca',   name:'Canada',           flag:'🇨🇦', areaCodes:[
    { code:'ca_on',  label:'Ontario (+1 416/437/519/548/613/647/705/807/905)' },
    { code:'ca_bc',  label:'British Columbia (+1 236/250/604/672/778)' },
    { code:'ca_qc',  label:'Quebec (+1 418/438/450/514/579/581/819/873)' },
    { code:'ca_ab',  label:'Alberta (+1 403/587/780/825)' },
    { code:'ca_other', label:'Other Canadian province' },
  ]},
  { code:'mx',   name:'Mexico',           flag:'🇲🇽', areaCodes:null },

  // ── UK & Europe ──────────────────────────────────────────────
  { code:'gb',   name:'United Kingdom',   flag:'🇬🇧', areaCodes:[
    { code:'gb_london',  label:'London (+44 20)' },
    { code:'gb_other',   label:'Other UK region' },
  ]},
  { code:'de',   name:'Germany',          flag:'🇩🇪', areaCodes:null },
  { code:'fr',   name:'France',           flag:'🇫🇷', areaCodes:null },
  { code:'it',   name:'Italy',            flag:'🇮🇹', areaCodes:null },
  { code:'es',   name:'Spain',            flag:'🇪🇸', areaCodes:null },
  { code:'nl',   name:'Netherlands',      flag:'🇳🇱', areaCodes:null },
  { code:'be',   name:'Belgium',          flag:'🇧🇪', areaCodes:null },
  { code:'se',   name:'Sweden',           flag:'🇸🇪', areaCodes:null },
  { code:'no',   name:'Norway',           flag:'🇳🇴', areaCodes:null },
  { code:'dk',   name:'Denmark',          flag:'🇩🇰', areaCodes:null },
  { code:'fi',   name:'Finland',          flag:'🇫🇮', areaCodes:null },
  { code:'pl',   name:'Poland',           flag:'🇵🇱', areaCodes:null },
  { code:'ua',   name:'Ukraine',          flag:'🇺🇦', areaCodes:null },
  { code:'ru',   name:'Russia',           flag:'🇷🇺', areaCodes:[
    { code:'ru_moscow', label:'Moscow (+7 495/499)' },
    { code:'ru_spb',    label:'Saint Petersburg (+7 812)' },
    { code:'ru_other',  label:'Other Russian city' },
  ]},
  { code:'ch',   name:'Switzerland',      flag:'🇨🇭', areaCodes:null },
  { code:'at',   name:'Austria',          flag:'🇦🇹', areaCodes:null },
  { code:'pt',   name:'Portugal',         flag:'🇵🇹', areaCodes:null },
  { code:'cz',   name:'Czech Republic',   flag:'🇨🇿', areaCodes:null },
  { code:'ro',   name:'Romania',          flag:'🇷🇴', areaCodes:null },
  { code:'hu',   name:'Hungary',          flag:'🇭🇺', areaCodes:null },
  { code:'gr',   name:'Greece',           flag:'🇬🇷', areaCodes:null },
  { code:'tr',   name:'Turkey',           flag:'🇹🇷', areaCodes:null },

  // ── Asia ─────────────────────────────────────────────────────
  { code:'in',   name:'India',            flag:'🇮🇳', areaCodes:[
    { code:'in_delhi',   label:'Delhi (+91 11)' },
    { code:'in_mumbai',  label:'Mumbai (+91 22)' },
    { code:'in_other',   label:'Other Indian city' },
  ]},
  { code:'cn',   name:'China',            flag:'🇨🇳', areaCodes:null },
  { code:'jp',   name:'Japan',            flag:'🇯🇵', areaCodes:[
    { code:'jp_tokyo',   label:'Tokyo (+81 3)' },
    { code:'jp_osaka',   label:'Osaka (+81 6)' },
    { code:'jp_other',   label:'Other Japanese city' },
  ]},
  { code:'kr',   name:'South Korea',      flag:'🇰🇷', areaCodes:[
    { code:'kr_seoul',   label:'Seoul (+82 2)' },
    { code:'kr_other',   label:'Other South Korean city' },
  ]},
  { code:'id',   name:'Indonesia',        flag:'🇮🇩', areaCodes:null },
  { code:'ph',   name:'Philippines',      flag:'🇵🇭', areaCodes:null },
  { code:'vn',   name:'Vietnam',          flag:'🇻🇳', areaCodes:null },
  { code:'th',   name:'Thailand',         flag:'🇹🇭', areaCodes:null },
  { code:'my',   name:'Malaysia',         flag:'🇲🇾', areaCodes:null },
  { code:'sg',   name:'Singapore',        flag:'🇸🇬', areaCodes:null },
  { code:'hk',   name:'Hong Kong',        flag:'🇭🇰', areaCodes:null },
  { code:'tw',   name:'Taiwan',           flag:'🇹🇼', areaCodes:null },
  { code:'bd',   name:'Bangladesh',       flag:'🇧🇩', areaCodes:null },
  { code:'pk',   name:'Pakistan',         flag:'🇵🇰', areaCodes:null },

  // ── Middle East ──────────────────────────────────────────────
  { code:'ae',   name:'UAE',              flag:'🇦🇪', areaCodes:null },
  { code:'sa',   name:'Saudi Arabia',     flag:'🇸🇦', areaCodes:null },
  { code:'il',   name:'Israel',           flag:'🇮🇱', areaCodes:null },
  { code:'eg',   name:'Egypt',            flag:'🇪🇬', areaCodes:null },

  // ── Africa ───────────────────────────────────────────────────
  { code:'ng',   name:'Nigeria',          flag:'🇳🇬', areaCodes:null },
  { code:'za',   name:'South Africa',     flag:'🇿🇦', areaCodes:null },
  { code:'ke',   name:'Kenya',            flag:'🇰🇪', areaCodes:null },
  { code:'gh',   name:'Ghana',            flag:'🇬🇭', areaCodes:null },
  { code:'et',   name:'Ethiopia',         flag:'🇪🇹', areaCodes:null },
  { code:'tz',   name:'Tanzania',         flag:'🇹🇿', areaCodes:null },
  { code:'ug',   name:'Uganda',           flag:'🇺🇬', areaCodes:null },
  { code:'ma',   name:'Morocco',          flag:'🇲🇦', areaCodes:null },
  { code:'dz',   name:'Algeria',          flag:'🇩🇿', areaCodes:null },
  { code:'tn',   name:'Tunisia',          flag:'🇹🇳', areaCodes:null },
  { code:'cm',   name:'Cameroon',         flag:'🇨🇲', areaCodes:null },
  { code:'ci',   name:'Ivory Coast',      flag:'🇨🇮', areaCodes:null },
  { code:'sn',   name:'Senegal',          flag:'🇸🇳', areaCodes:null },
  { code:'ao',   name:'Angola',           flag:'🇦🇴', areaCodes:null },

  // ── Latin America ────────────────────────────────────────────
  { code:'br',   name:'Brazil',           flag:'🇧🇷', areaCodes:[
    { code:'br_sao', label:'São Paulo (+55 11)' },
    { code:'br_rio', label:'Rio de Janeiro (+55 21)' },
    { code:'br_other', label:'Other Brazilian city' },
  ]},
  { code:'ar',   name:'Argentina',        flag:'🇦🇷', areaCodes:null },
  { code:'co',   name:'Colombia',         flag:'🇨🇴', areaCodes:null },
  { code:'cl',   name:'Chile',            flag:'🇨🇱', areaCodes:null },
  { code:'pe',   name:'Peru',             flag:'🇵🇪', areaCodes:null },
  { code:'ve',   name:'Venezuela',        flag:'🇻🇪', areaCodes:null },

  // ── Oceania ──────────────────────────────────────────────────
  { code:'au',   name:'Australia',        flag:'🇦🇺', areaCodes:[
    { code:'au_nsw', label:'NSW/Sydney (+61 2)' },
    { code:'au_vic', label:'VIC/Melbourne (+61 3)' },
    { code:'au_qld', label:'QLD/Brisbane (+61 7)' },
    { code:'au_wa',  label:'WA/Perth (+61 8)' },
    { code:'au_other', label:'Other Australian state' },
  ]},
  { code:'nz',   name:'New Zealand',      flag:'🇳🇿', areaCodes:null },
];

// Map area code → base country code for API calls
export function getBaseCountry(code) {
  if (!code || code === 'any') return 'any';
  // If it contains an underscore it's an area code variant — extract base country
  return code.includes('_') ? code.split('_')[0] : code;
}

export default COUNTRIES;
