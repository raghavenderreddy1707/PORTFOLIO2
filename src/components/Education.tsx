import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const educationList = [
  {
    id: 1,
    degree: "Bachelor of Technology — Computer Science (AI & Data Science)",
    institution: "ICFAI Foundation for Higher Education, Hyderabad",
    period: "2023 – Present",
    achievements: "Dean's List, Tech Club Member"
  },
  {
    id: 2,
    degree: "Intermediate (Class XII) — Science Stream",
    institution: "Narayana Junior College, Nallagandla",
    period: "2021 – 2023",
    achievements: "Science Stream, Mathematics Excellence"
  },
  {
    id: 3,
    degree: "Secondary School (Class X)",
    institution: "Revathi High School",
    period: "2020 – 2021",
    achievements: "Academic Excellence, Science Fair Winner"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#f97316]/6 blur-[150px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f97316]/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <span className="text-[#f97316] font-mono text-sm tracking-widest uppercase">My Formation</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#f97316]/30 transition-all duration-300 relative group flex flex-col h-full"
            >
              {/* Decorative icon */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 text-[#f97316]">
                <GraduationCap size={64} />
              </div>

              {/* Period badge */}
              <div className="text-[#f97316] font-mono text-sm mb-4 bg-[#f97316]/10 w-max px-3 py-1 rounded-full border border-[#f97316]/20 relative z-10">
                {edu.period}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 relative z-10 pr-12">
                {edu.degree}
              </h3>

              <p className="text-gray-400 text-sm mb-6 relative z-10 flex-1">
                {edu.institution}
              </p>

              <div className="pt-4 border-t border-white/10 mt-auto relative z-10 flex items-start gap-3">
                <Award className="text-[#fbbf24] shrink-0 mt-0.5" size={16} />
                <span className="text-sm text-gray-300">{edu.achievements}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
