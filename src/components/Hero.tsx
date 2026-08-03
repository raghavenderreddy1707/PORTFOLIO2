import { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const HeroScene = lazy(() => import('@/three/HeroScene'));

export default function Hero() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || window.matchMedia('(pointer: coarse)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    };
    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-[#0c0a09]"
    >
      {/* Three.js background */}
      <Suspense fallback={<div className="absolute inset-0 bg-[#0c0a09]" />}>
        <HeroScene />
      </Suspense>

      {/* ── PHOTO — fills full section height, anchored right ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.15 }}
        className="absolute inset-y-0 pointer-events-none select-none"
        style={{ left: '40%', right: 0 }}
      >
        {/* Thin left blend so photo merges with text area */}
        <div
          className="absolute inset-y-0 left-0 z-10"
          style={{
            width: '18%',
            background: 'linear-gradient(to right, #0c0a09, transparent)',
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute inset-y-0 right-0 z-10"
          style={{
            width: '8%',
            background: 'linear-gradient(to left, #0c0a09, transparent)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: '16%',
            background: 'linear-gradient(to top, #0c0a09, transparent)',
          }}
        />
        {/* Orange glow behind figure */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse 55% 65% at 50% 85%, rgba(249,115,22,0.13) 0%, transparent 70%)',
          }}
        />
        <img
          src="/hero-photo-nobg.png"
          alt="Pulakandla Raghavender Reddy"
          className="absolute inset-0 w-full h-full object-contain object-bottom z-5"
          style={{ filter: 'drop-shadow(0 0 40px rgba(249,115,22,0.15))' }}
          onError={(e) => {
            e.currentTarget.src = '/hero-photo.jpg';
            e.currentTarget.className += ' rounded-2xl object-cover';
          }}
        />
      </motion.div>

      {/* ── TEXT — left column, z-index above photo ── */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[520px]">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[#f97316] font-mono tracking-widest uppercase text-sm mb-6">
              System Online / Hello World
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[88px] font-extrabold tracking-tight leading-[1.04] mb-8">
              Pulakandla<br />
              <span className="text-gradient">Raghavender</span><br />
              Reddy
            </h1>
            <p className="text-lg text-gray-400 max-w-md mb-12 leading-relaxed">
              Computer Science student &amp; Video Editor — passionate about
              building real-world applications, crafting engaging visual content,
              and continuously learning new technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              ref={buttonRef}
              href="#projects"
              className="magnetic inline-flex items-center gap-2 bg-gradient-accent text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_0_34px_rgba(249,115,22,0.55)] transition-shadow duration-300"
            >
              View My Projects <ArrowRight size={18} />
            </a>
            <div className="flex gap-4">
              <a
                href="https://github.com/raghavenderreddy1707"
                target="_blank" rel="noreferrer"
                className="p-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-[#f97316] hover:bg-[#f97316]/10 transition-all hover-target"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/raghavender-reddy-pulakandla-647428318/"
                target="_blank" rel="noreferrer"
                className="p-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-[#fbbf24] hover:bg-[#fbbf24]/10 transition-all hover-target"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 bg-gradient-to-b from-[#f97316] to-transparent"
        />
      </motion.div>
    </section>
  );
}
