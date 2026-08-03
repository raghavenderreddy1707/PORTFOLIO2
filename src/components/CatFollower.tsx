import { useEffect, useRef, useState } from 'react';

type Corner = 'bl' | 'br';

/* A curious cat that peeks from the bottom corners of the screen,
   watching the visitor, then ducks back down. Hidden on touch devices. */
export default function CatFollower() {
  const [visible, setVisible]   = useState(false);
  const [corner, setCorner]     = useState<Corner>('br');
  const [blink, setBlink]       = useState(false);
  const [wiggle, setWiggle]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const scheduleNext = () => {
      const delay = 7000 + Math.random() * 9000;
      timerRef.current = setTimeout(peek, delay);
    };

    const peek = () => {
      setCorner(Math.random() > 0.5 ? 'br' : 'bl');
      setVisible(true);

      // Wiggle ears when first appearing
      setTimeout(() => setWiggle(true), 400);
      setTimeout(() => setWiggle(false), 1000);

      // Hide after staying visible for 3.5–4.5 s
      const stayMs = 3500 + Math.random() * 1000;
      timerRef.current = setTimeout(() => {
        setVisible(false);
        scheduleNext();
      }, stayMs);
    };

    // First peek after 4–6 s
    timerRef.current = setTimeout(peek, 4000 + Math.random() * 2000);
    return () => clearTimeout(timerRef.current);
  }, []);

  // Blink while visible
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 130);
    }, 2800);
    return () => clearInterval(id);
  }, [visible]);

  const isLeft = corner === 'bl';
  const eyeRy  = blink ? 1 : 5.5;

  const posStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    ...(isLeft ? { left: 32 } : { right: 32 }),
    zIndex: 9997,
    pointerEvents: 'none',
    transform: visible ? 'translateY(12px)' : 'translateY(calc(100% + 4px))',
    transition: visible
      ? 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)'
      : 'transform 0.45s cubic-bezier(0.55,0,1,0.45)',
  };

  return (
    <div style={posStyle} aria-hidden="true">
      <svg
        width="84"
        height="100"
        viewBox="0 0 84 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)',
          filter: 'drop-shadow(0 -6px 16px rgba(249,115,22,0.45))',
          display: 'block',
        }}
      >
        {/* ── Ears ── with optional wiggle */}
        <g style={{ transformOrigin: '18px 18px', animation: wiggle ? 'earWiggle 0.4s ease-in-out 2' : 'none' }}>
          <polygon points="16,26 6,4 30,12" fill="#f97316" />
          <polygon points="17,23 9,7 28,13" fill="#fbbf24" opacity="0.55" />
        </g>
        <g style={{ transformOrigin: '66px 18px', animation: wiggle ? 'earWiggle 0.4s ease-in-out 2 0.1s' : 'none' }}>
          <polygon points="68,26 78,4 54,12" fill="#f97316" />
          <polygon points="67,23 75,7 56,13" fill="#fbbf24" opacity="0.55" />
        </g>

        {/* ── Head ── */}
        <circle cx="42" cy="46" r="32" fill="#f97316" />

        {/* ── Eyes ── */}
        <ellipse cx="28" cy="43" rx="7.5" ry={eyeRy} fill="#1a0800" />
        <ellipse cx="56" cy="43" rx="7.5" ry={eyeRy} fill="#1a0800" />
        {!blink && (
          <>
            <circle cx="31" cy="40" r="2.5" fill="white" />
            <circle cx="59" cy="40" r="2.5" fill="white" />
            {/* Amber iris glint */}
            <circle cx="30" cy="44" r="1.5" fill="#fbbf24" opacity="0.5" />
            <circle cx="58" cy="44" r="1.5" fill="#fbbf24" opacity="0.5" />
          </>
        )}

        {/* ── Nose ── */}
        <polygon points="42,52 37,58 47,58" fill="#c2410c" />

        {/* ── Mouth ── */}
        <path d="M37 58 Q42 63 47 58" stroke="#c2410c" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* ── Whiskers ── */}
        <line x1="5"  y1="46" x2="30" y2="50" stroke="white" strokeWidth="1.3" opacity="0.65" />
        <line x1="5"  y1="53" x2="30" y2="53" stroke="white" strokeWidth="1.3" opacity="0.65" />
        <line x1="79" y1="46" x2="54" y2="50" stroke="white" strokeWidth="1.3" opacity="0.65" />
        <line x1="79" y1="53" x2="54" y2="53" stroke="white" strokeWidth="1.3" opacity="0.65" />

        {/* ── Paws gripping the ledge ── */}
        <ellipse cx="22" cy="75" rx="13" ry="9" fill="#ea580c" />
        <ellipse cx="62" cy="75" rx="13" ry="9" fill="#ea580c" />
        {/* Toe lines - left paw */}
        <line x1="16" y1="80" x2="16" y2="86" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="82" x2="22" y2="88" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="80" x2="28" y2="86" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
        {/* Toe lines - right paw */}
        <line x1="56" y1="80" x2="56" y2="86" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
        <line x1="62" y1="82" x2="62" y2="88" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="80" x2="68" y2="86" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />

        {/* ── Body (below the fold) ── */}
        <rect x="10" y="76" width="64" height="30" rx="14" fill="#f97316" />
        {/* Belly patch */}
        <ellipse cx="42" cy="90" rx="18" ry="11" fill="#fbbf24" opacity="0.38" />

        {/* ── Embedded keyframes ── */}
        <style>{`
          @keyframes earWiggle {
            0%   { transform: rotate(0deg); }
            30%  { transform: rotate(-12deg); }
            70%  { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
          }
        `}</style>
      </svg>
    </div>
  );
}
