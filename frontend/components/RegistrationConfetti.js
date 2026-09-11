import { useEffect, useState } from 'react';

const COLORS = ['#7c3aed', '#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#38bdf8'];
const PIECES = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  delay: (index % 9) * 0.035,
  duration: 1.4 + (index % 7) * 0.12,
  color: COLORS[index % COLORS.length],
  rotation: (index * 67) % 360,
}));

export function celebrateRegistration() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('ringslot:registration-confetti'));
}

export default function RegistrationConfetti() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    const celebrate = () => {
      clearTimeout(timer);
      setVisible(true);
      timer = setTimeout(() => setVisible(false), 2400);
    };
    window.addEventListener('ringslot:registration-confetti', celebrate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('ringslot:registration-confetti', celebrate);
    };
  }, []);

  if (!visible) return null;
  return (
    <div className="registration-confetti" aria-hidden="true">
      {PIECES.map((piece) => (
        <span key={piece.id} style={{
          left: `${piece.left}%`,
          background: piece.color,
          animationDelay: `${piece.delay}s`,
          animationDuration: `${piece.duration}s`,
          transform: `rotate(${piece.rotation}deg)`,
        }} />
      ))}
    </div>
  );
}
