import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "AI Developer Intern",
    company: "VISWAM.AI",
    period: "May 2025 – Aug 2025",
    location: "Hyderabad, India",
    achievements: [
      "Developed open-source AI apps using Streamlit, Python, and Hugging Face",
      "Built CultureBot and Label-it with multilingual support",
      "Contributed to UI/UX, GPT integration, and Hugging Face Spaces deployment"
    ],
    tags: ["Python", "Streamlit", "Hugging Face", "Full-Stack"]
  },
  {
    id: 2,
    role: "Front-End Web Development Intern",
    company: "Edunet Foundation – IBM SkillsBuild (AICTE)",
    period: "Aug 2025 – Oct 2025",
    location: "Remote",
    achievements: [
      "Completed 6-week program on HTML, CSS, JS",
      "Built independent projects and a capstone",
      "Earned AICTE + Edunet certification"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"]
  },
  {
    id: 3,
    role: "System Administrator Intern",
    company: "ServiceNow Virtual Internship | AICTE – Eduskills",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    achievements: [
      "Studied ServiceNow platform fundamentals",
      "Built sample workflows",
      "Completed all modules and received AICTE ServiceNow certification"
    ],
    tags: ["ServiceNow", "ITSM", "Automation", "Workflows"]
  }
];

export default function Experience() {
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 md:py-40 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <span className="text-[#f97316] font-mono text-sm tracking-widest uppercase">Where I've Worked</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Professional <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg width="2" height="100%" className="absolute inset-0">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="#ffffff15" strokeWidth="2" strokeDasharray="4 4" />
              <path
                ref={lineRef}
                d="M 1 0 L 1 10000"
                stroke="url(#grad-exp)"
                strokeWidth="2"
                strokeDasharray="1000"
                fill="none"
              />
              <defs>
                <linearGradient id="grad-exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-12 md:space-y-0 relative">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={exp.id} className="relative md:flex md:items-center justify-between group">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-panel-accent items-center justify-center z-10 border border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.25)]">
                    <Briefcase size={16} className="text-[#f97316]" />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className={`md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'} glass-panel p-6 rounded-2xl relative hover:border-[#f97316]/30 border border-white/5 transition-colors`}
                  >
                    <span className="inline-block px-3 py-1 bg-[#f97316]/10 text-[#f97316] rounded-full text-xs font-mono mb-4 border border-[#f97316]/20">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-[#fbbf24] text-sm mb-4 font-medium">{exp.company} • {exp.location}</div>

                    <ul className={`text-gray-400 text-sm space-y-2 mb-6 ${isEven ? 'md:list-inside' : ''}`}>
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex md:inline-flex items-start gap-2">
                          <span className="text-[#f97316] mt-1 md:hidden">▹</span>
                          <span className={isEven ? 'md:hidden' : 'hidden md:inline text-[#f97316]'}>▹</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-xs bg-[#f97316]/5 text-[#f97316]/80 px-2 py-1 rounded border border-[#f97316]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
