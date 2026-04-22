import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);

    function tick() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    const onEnter = () => { if (ringRef.current) ringRef.current.style.transform += ' scale(1.6)'; };
    const onLeave = () => {};
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed', top:0, left:0, zIndex:99999, width:8, height:8, borderRadius:'50%', background:'var(--primary-600,#9333ea)', pointerEvents:'none', mixBlendMode:'multiply', willChange:'transform' }} />
      <div ref={ringRef} style={{ position:'fixed', top:0, left:0, zIndex:99998, width:36, height:36, borderRadius:'50%', border:'1.5px solid var(--primary-400,#c084fc)', pointerEvents:'none', willChange:'transform', transition:'width 0.2s, height 0.2s' }} />
    </>
  );
}
