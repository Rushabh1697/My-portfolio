import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Lock } from 'lucide-react';
import { PROJECTS } from '../content/projects';
import type { Project } from '../content/projects';

const BUTTON =
  'inline-flex items-center gap-2 px-4 py-2.5 font-hud text-xs uppercase tracking-widest transition-colors';

/** Stand-in for a project with nothing deployed to photograph. */
const CodeArt: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.28),_transparent_70%)]">
    <div className="flex gap-2 lg:gap-3" aria-hidden="true">
      {['4', '8', '1', '5', '0', '2'].map((digit, i) => (
        <span key={i} className="w-9 h-12 lg:w-11 lg:h-14 flex items-center justify-center border border-white/20 bg-black/50 font-hud text-xl lg:text-2xl text-white/90">
          {digit}
        </span>
      ))}
    </div>
    <span className="font-hud text-xs uppercase tracking-widest text-white/60">Rotating check-in code</span>
  </div>
);

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const primary = project.live ?? project.code;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      data-glow
      className="group flex flex-col border border-white/10 bg-white/[0.02] hover:border-red-500/50 transition-colors duration-300"
    >
      {/* The picture repeats the main link, so keyboards and screen readers skip it. */}
      <a
        href={primary}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-white/10"
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            width={960}
            height={600}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <CodeArt />
        )}
        <span className="absolute top-0 left-0 bg-red-600 text-white font-title text-2xl md:text-3xl leading-none px-4 py-2">
          {String(index + 1).padStart(2, '0')}
        </span>
      </a>

      <div className="flex flex-col flex-1 p-5 md:p-7">
        <h3 className="text-2xl md:text-3xl font-title uppercase tracking-wide text-white mb-3">{project.name}</h3>
        <p className="text-white/70 leading-relaxed mb-5">{project.description}</p>

        <ul className="flex flex-wrap gap-2 mb-6 list-none p-0">
          {project.stack.map((item) => (
            <li key={item} className="px-3 py-1 border border-white/10 bg-white/5 font-hud text-[11px] tracking-wider text-white/70">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`} className={`${BUTTON} bg-red-600 hover:bg-red-700 text-white`}>
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}
          {project.code ? (
            <a href={project.code} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code`} className={`${BUTTON} border border-white/20 text-white/80 hover:border-white/60 hover:text-white`}>
              <Code className="w-4 h-4" /> Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-hud text-[11px] uppercase tracking-widest text-white/50">
              <Lock className="w-3.5 h-3.5" /> Private code
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  return (
    <section className="relative w-full bg-black py-20 md:py-28 px-5 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Grunge */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-title uppercase tracking-tighter text-white/90 mb-10 md:mb-14">
          Selected <span className="text-red-600">Work</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
