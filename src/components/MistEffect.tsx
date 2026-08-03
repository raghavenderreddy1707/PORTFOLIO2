/* Atmospheric mist overlay — subtle drifting gradient blobs layered over the dark background */
export default function MistEffect() {
  return (
    <>
      <style>{`
        @keyframes mistDrift1 {
          0%   { transform: translate(0px,   0px)   scale(1);    opacity: 0.055; }
          33%  { transform: translate(60px, -30px)  scale(1.08); opacity: 0.08;  }
          66%  { transform: translate(-30px, 40px)  scale(0.95); opacity: 0.04;  }
          100% { transform: translate(0px,   0px)   scale(1);    opacity: 0.055; }
        }
        @keyframes mistDrift2 {
          0%   { transform: translate(0px,   0px)   scale(1);    opacity: 0.04;  }
          40%  { transform: translate(-70px, 50px)  scale(1.1);  opacity: 0.07;  }
          70%  { transform: translate(40px, -20px)  scale(0.92); opacity: 0.03;  }
          100% { transform: translate(0px,   0px)   scale(1);    opacity: 0.04;  }
        }
        @keyframes mistDrift3 {
          0%   { transform: translate(0px,  0px)    scale(1);    opacity: 0.06;  }
          50%  { transform: translate(50px, 60px)   scale(1.06); opacity: 0.09;  }
          100% { transform: translate(0px,  0px)    scale(1);    opacity: 0.06;  }
        }
        @keyframes mistDrift4 {
          0%   { transform: translate(0px, 0px)     scale(1);    opacity: 0.035; }
          45%  { transform: translate(-40px,-50px)  scale(1.12); opacity: 0.06;  }
          100% { transform: translate(0px, 0px)     scale(1);    opacity: 0.035; }
        }
        @keyframes mistDrift5 {
          0%   { transform: translate(0px, 0px)     scale(1);    opacity: 0.05;  }
          60%  { transform: translate(30px, -70px)  scale(0.9);  opacity: 0.02;  }
          100% { transform: translate(0px, 0px)     scale(1);    opacity: 0.05;  }
        }
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        {/* Layer 1 — warm amber bloom, bottom-left */}
        <div style={{
          position: 'absolute',
          left: '-10%', bottom: '-5%',
          width: '70vw', height: '60vh',
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.18) 0%, rgba(249,115,22,0.06) 45%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'mistDrift1 55s ease-in-out infinite',
        }} />

        {/* Layer 2 — deep orange haze, top-right */}
        <div style={{
          position: 'absolute',
          right: '-15%', top: '-10%',
          width: '65vw', height: '65vh',
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.14) 0%, rgba(234,88,12,0.05) 50%, transparent 72%)',
          filter: 'blur(80px)',
          animation: 'mistDrift2 70s ease-in-out infinite',
        }} />

        {/* Layer 3 — cool smoke center-top */}
        <div style={{
          position: 'absolute',
          left: '25%', top: '-15%',
          width: '55vw', height: '50vh',
          background: 'radial-gradient(ellipse at center, rgba(148,163,184,0.07) 0%, rgba(100,116,139,0.02) 55%, transparent 75%)',
          filter: 'blur(70px)',
          animation: 'mistDrift3 80s ease-in-out infinite',
        }} />

        {/* Layer 4 — golden mist, mid-right */}
        <div style={{
          position: 'absolute',
          right: '5%', top: '30%',
          width: '45vw', height: '55vh',
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.1) 0%, transparent 65%)',
          filter: 'blur(90px)',
          animation: 'mistDrift4 65s ease-in-out infinite 10s',
        }} />

        {/* Layer 5 — faint smoke, bottom-right */}
        <div style={{
          position: 'absolute',
          right: '-5%', bottom: '10%',
          width: '40vw', height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(120,53,15,0.12) 0%, transparent 65%)',
          filter: 'blur(75px)',
          animation: 'mistDrift5 90s ease-in-out infinite 5s',
        }} />

        {/* Layer 6 — wide low-opacity sweep across center */}
        <div style={{
          position: 'absolute',
          left: '10%', top: '40%',
          width: '80vw', height: '30vh',
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'mistDrift1 100s ease-in-out infinite 15s',
        }} />
      </div>
    </>
  );
}
