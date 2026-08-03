import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Mail, Zap, Code2, Rocket, Film } from 'lucide-react';
import { gsap } from 'gsap';

const stats = [
  { value: 8, suffix: '+', label: 'Projects' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 1, suffix: '+', label: 'Years Exp' },
];

const highlights = [
  { icon: <Code2 size={20} />, text: 'Full-Stack & IoT Development' },
  { icon: <Zap size={20} />, text: 'AI & Machine Learning Applications' },
  { icon: <Film size={20} />, text: 'Video Editing & Content Creation' },
  { icon: <Rocket size={20} />, text: 'Always Learning, Always Building' },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && ref.current) {
      const el = ref.current.querySelector('.stat-value');
      if (el) {
        gsap.to(el, {
          innerHTML: value,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
        });
      }
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start">
      <div className="text-4xl md:text-5xl font-extrabold text-white flex items-baseline gap-1">
        <span className="stat-value">0</span>
        <span className="text-[#f97316]">{suffix}</span>
      </div>
      <span className="text-gray-400 text-sm uppercase tracking-widest mt-2">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 md:py-40 relative">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f97316]/50 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#f97316]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center md:text-left"
        >
          <span className="text-[#f97316] font-mono text-sm tracking-widest uppercase">Who I Am</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Inside the <span className="text-gradient">Mind</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Bio block — takes 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="prose prose-invert text-gray-300 max-w-none text-lg leading-relaxed space-y-4 mb-10">
              <p>
                Currently pursuing my Bachelor's degree in Computer Science (AI & Data Science) at ICFAI Foundation for Higher Education, Hyderabad.
              </p>
              <p>
                I'm passionate about developing innovative solutions using modern technologies and have experience in web development, IoT systems, and AI applications. I thrive at the intersection of logical engineering and creative design.
              </p>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-3 mb-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="p-2 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316]">
                    {h.icon}
                  </div>
                  <span className="font-medium">{h.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-accent text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-shadow hover-target"
              >
                <Mail size={18} />
                Contact Me
              </a>
              <a
                href="/pulakandla_raghavender_reddy_resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="glass-panel inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-colors hover-target border border-white/10"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Stats block — takes 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Big decorative number / card */}
            <div className="glass-panel-accent rounded-3xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#f97316]/20 rounded-full blur-2xl" />
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-8 relative z-10">
                {stats.map((stat, i) => (
                  <StatCounter key={i} {...stat} />
                ))}
              </div>
            </div>

            {/* Orange accent bar */}
            <div className="flex items-center gap-4">
              <div className="h-1 flex-1 bg-gradient-to-r from-[#f97316] to-transparent rounded-full" />
              <span className="text-xs text-[#f97316] font-mono tracking-widest uppercase whitespace-nowrap">At a Glance</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
