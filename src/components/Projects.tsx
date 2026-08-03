import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useLocation } from 'wouter';
import { projects } from '@/data/projects';

type ProjectCategory = 'All' | 'AI' | 'Web' | 'Hardware' | 'Content';
const tabs: ProjectCategory[] = ['All', 'AI', 'Web', 'Hardware', 'Content'];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(cardRef.current, {
      rotationY:  ((x - rect.width  / 2) / rect.width)  * 8,
      rotationX: -((y - rect.height / 2) / rect.height) * 8,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.7 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="glass-panel rounded-2xl overflow-hidden group border border-white/5 hover:border-[#f97316]/40 flex flex-col h-full transform-gpu transition-all duration-300 cursor-pointer hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/600x400/1a0f00/f97316?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* "View Details" badge on hover */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-semibold border border-white/20">
            View Details <ArrowRight size={15} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col gap-3">
        <span className="text-xs font-mono text-[#f97316] tracking-wider uppercase">{project.category}</span>
        <h3 className="text-xl font-bold text-white group-hover:text-[#fbbf24] transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs bg-white/5 text-gray-400 px-2.5 py-1 rounded-md border border-white/5">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs text-gray-600 px-2.5 py-1">+{project.tags.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('All');
  const filtered = projects.filter((p) => activeTab === 'All' || p.category === activeTab);

  return (
    <section id="projects" className="py-32 md:py-40 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f97316]/30 to-transparent" />
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#f97316] font-mono text-sm tracking-widest uppercase">What I've Built</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Featured <span className="text-gradient">Work</span>
            </h2>
            <p className="text-gray-400 max-w-xl leading-relaxed">
              A selection of projects spanning full-stack applications, AI integrations, and hardware solutions.
              Click any card to explore the full story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex p-1 glass-panel rounded-full w-max flex-shrink-0"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-accent rounded-full opacity-90"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
