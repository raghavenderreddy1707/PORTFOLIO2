import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Data ───────────────────────────────────────────────── */
const categories = [
  {
    id: 'languages',
    label: 'Languages & Databases',
    icon: '{ }',
    color: '#f97316',
    skills: ['Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: '⚙',
    color: '#fbbf24',
    skills: ['VS Code', 'Git', 'GitHub', 'Arduino', 'Streamlit', 'Hugging Face'],
  },
  {
    id: 'concepts',
    label: 'Concepts',
    icon: '◈',
    color: '#f97316',
    skills: ['Data Structures', 'Algorithms', 'OOP', 'REST APIs', 'IoT Systems'],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    icon: '✦',
    color: '#fbbf24',
    skills: ['Problem-solving', 'Teamwork', 'Adaptability', 'Communication', 'Leadership'],
  },
  {
    id: 'creative',
    label: 'Video & Creative',
    icon: '▶',
    color: '#fb923c',
    skills: ['Video Editing', 'Content Creation', 'Visual Storytelling', 'Motion Graphics', 'Colour Grading'],
  },
];

/* ── Single skill chip ──────────────────────────────────── */
function Chip({ name, color, i }: { name: string; color: string; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05, type: 'spring', stiffness: 280, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center cursor-default select-none px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
      style={{
        border: `1.5px solid ${hovered ? color : color + '40'}`,
        background: hovered ? color + '1a' : 'transparent',
        color: hovered ? '#fff' : color + 'cc',
        boxShadow: hovered ? `0 0 20px ${color}50` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {name}
    </motion.span>
  );
}

/* ── Section ────────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 md:py-40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#f97316]/4 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20"
        >
          <span className="text-[#f97316] font-mono text-sm tracking-widest uppercase">
            What I Know
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        {/* 2 × 2 category grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {categories.map((cat, catIdx) => {
            const isActive = active === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: catIdx * 0.1 }}
                onMouseEnter={() => setActive(cat.id)}
                onMouseLeave={() => setActive(null)}
                className="relative p-10 md:p-12 transition-colors duration-300 cursor-default"
                style={{ background: isActive ? `${cat.color}0c` : 'rgb(12 10 9)' }}
              >
                {/* Category header: icon + label */}
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="text-2xl font-black leading-none"
                    style={{ color: cat.color + (isActive ? 'ff' : '66') }}
                  >
                    {cat.icon}
                  </span>
                  <span className="text-white font-bold text-lg tracking-tight">
                    {cat.label}
                  </span>
                </div>

                {/* Skill chips */}
                <AnimatePresence mode="wait">
                  <motion.div key={isActive ? 'active' : 'idle'} className="flex flex-wrap gap-3">
                    {cat.skills.map((skill, i) => (
                      <Chip key={skill} name={skill} color={cat.color} i={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Corner glow accent */}
                <div
                  className="absolute bottom-0 right-0 w-28 h-28 rounded-tl-full pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${cat.color}22, transparent)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-[#f97316]/40 to-transparent" />
          <span className="text-xs text-gray-600 font-mono tracking-widest uppercase whitespace-nowrap">
            Hover to highlight
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#fbbf24]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
