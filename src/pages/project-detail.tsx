import { useRoute, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Lock, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { projects } from '@/data/projects';

const categoryColors: Record<string, string> = {
  AI: '#f97316',
  Web: '#fbbf24',
  Hardware: '#fb923c',
};

export default function ProjectDetail() {
  const [, params] = useRoute<{ id: string }>('/projects/:id');
  const [, navigate] = useLocation();

  const project = projects.find((p) => p.id === Number(params?.id));

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center text-white gap-6">
        <p className="text-gray-400 text-xl">Project not found.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#f97316] text-white font-semibold hover:bg-[#ea580c] transition-colors"
        >
          <ArrowLeft size={18} /> Go Home
        </button>
      </div>
    );
  }

  const accentColor = categoryColors[project.category] ?? '#f97316';

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white">
      <Navbar />

      {/* ── Hero image banner ── */}
      <div className="relative h-[52vh] md:h-[65vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.55) saturate(0.8)' }}
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/1200x700/1a0f00/f97316?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09]/60 via-transparent to-transparent" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-24 left-6 md:left-12 z-20"
        >
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-sm font-medium hover:border-[#f97316]/60 hover:bg-[#f97316]/10 transition-all duration-300"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </button>
        </motion.div>

        {/* Title block on image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 z-20"
        >
          <span
            className="inline-block font-mono text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
            style={{ color: accentColor, borderColor: accentColor + '44', background: accentColor + '18' }}
          >
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl">
            {project.title}
          </h1>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-16 max-w-6xl">

          {/* Left: description */}
          <motion.div
            className="md:col-span-2 space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <h2 className="text-sm font-mono tracking-widest uppercase mb-5" style={{ color: accentColor }}>
                About this project
              </h2>
              <p className="text-lg text-gray-300 leading-[1.85]">{project.longDescription}</p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-[1.03]"
                  style={{ background: `linear-gradient(135deg, #f97316, #fbbf24)` }}
                >
                  Visit Live Project <ExternalLink size={18} />
                </a>
              ) : (
                <div
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold border"
                  style={{ color: accentColor, borderColor: accentColor + '44', background: accentColor + '10' }}
                >
                  <Lock size={18} />
                  {project.category === 'Hardware' ? 'Hardware / Physical Project' : 'Private Project'}
                </div>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold border border-white/15 text-gray-200 hover:border-white/40 hover:text-white transition-all duration-300"
                >
                  <Github size={18} /> View Source
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-mono tracking-widest uppercase mb-5" style={{ color: accentColor }}>
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200"
                    style={{
                      color: accentColor,
                      borderColor: accentColor + '44',
                      background: accentColor + '0f',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8" />

            {/* Category info */}
            <div>
              <h2 className="text-sm font-mono tracking-widest uppercase mb-3 text-gray-500">Category</h2>
              <p className="text-white font-semibold">{project.category} Development</p>
            </div>
          </motion.div>
        </div>

        {/* ── Back to all projects ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-white/8"
        >
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            All Projects
          </button>
        </motion.div>
      </div>
    </div>
  );
}
