export function LogoIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="14" fill={color} fillOpacity="0.1" />
      <path 
        d="M24 12C26.3869 12 28.6761 12.9482 30.364 14.636C32.0518 16.3239 33 18.6131 33 21V27C33 29.3869 32.0518 31.6761 30.364 33.364C28.6761 35.0518 26.3869 36 24 36C21.6131 36 19.3239 35.0518 17.636 33.364C15.9482 31.6761 15 29.3869 15 27V21C15 18.6131 15.9482 16.3239 17.636 14.636C19.3239 12.9482 21.6131 12 24 12Z" 
        stroke={color} 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="24" cy="24" r="3.5" fill={color} />
      <path d="M15 24H18" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M30 24H33" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M24 15V18" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M24 30V33" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
