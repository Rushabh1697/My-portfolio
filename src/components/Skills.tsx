import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SKILLS = [
  {
    category: "AI Orchestration",
    items: ["LLMs", "RAG", "Agentic Workflows", "Prompt Engineering", "Tool Calling"],
    color: "from-red-600 to-red-900"
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    color: "from-zinc-700 to-zinc-900"
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "Next.js", "API Design", "System Architecture", "PostgreSQL"],
    color: "from-red-800 to-black"
  },
  {
    category: "Vibe Coding",
    items: ["Rapid Prototyping", "AI-Assisted Debugging", "Architecture Design", "UX/UI Polish"],
    color: "from-red-500 to-red-800"
  }
];

/** A card that flies in from its own side, docks like a suit part and flashes. */
const SkillCard: React.FC<{ group: (typeof SKILLS)[number]; index: number }> = ({ group, index }) => {
  const [docked, setDocked] = useState(false);
  const reducedMotion = useReducedMotion();
  const side = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: side * 140, y: 50, rotate: side * 8, scale: 1.08 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      // Accelerates into place, so the landing reads as a lock.
      transition={{ duration: 0.55, delay: (index % 2) * 0.12, ease: [0.55, 0, 0.85, 0.35] }}
      onAnimationComplete={() => setDocked(true)}
      className="group relative p-6 md:p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${group.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      {docked && !reducedMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none border-2 border-red-500 bg-red-500/15 shadow-[inset_0_0_40px_rgba(239,68,68,0.6)]"
        />
      )}

      <h3 className="text-2xl md:text-3xl font-title uppercase tracking-wide text-white/90 mb-6 md:mb-8">
        {group.category}
      </h3>

      <ul className="flex flex-wrap gap-2 md:gap-3 list-none p-0">
        {group.items.map((item) => (
          <li
            key={item}
            className="px-3 md:px-4 py-2 text-xs md:text-sm font-hud tracking-wider bg-white/5 text-white/80 border border-white/10 hover:border-red-500/50 hover:bg-red-900/20 transition-colors duration-300 cursor-default"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section className="relative w-full bg-[#050000] py-20 md:py-28 px-5 md:px-12 lg:px-24 overflow-hidden">

      {/* Background Grunge elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 md:mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-title uppercase tracking-tighter text-white/90">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Arsenal</span>
          </h2>
          <p className="font-quote text-xl md:text-3xl tracking-widest text-white/60 uppercase mt-4 max-w-3xl">
            AI-Native workflow • Rapid prototyping • Production ready
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
          {SKILLS.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Skills;
