import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#050000] py-32 px-8 md:px-24 overflow-hidden flex flex-col justify-center">
      
      {/* Background Grunge elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-24 z-10"
      >
        <h2 className="text-6xl md:text-8xl font-title uppercase tracking-tighter text-white/90">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Arsenal</span>
        </h2>
        <p className="font-quote text-xl md:text-3xl tracking-widest text-white/40 uppercase mt-4 max-w-2xl">
          AI-Native workflow • Rapid prototyping • Production ready
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 z-10">
        {SKILLS.map((skillGroup, idx) => (
          <motion.div
            key={skillGroup.category}
            style={{ y: idx % 2 === 0 ? y1 : y2 }}
            className="group relative p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${skillGroup.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className="text-3xl font-title uppercase tracking-wide text-white/80 mb-8">
              {skillGroup.category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((item, i) => (
                <motion.span 
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="px-4 py-2 text-sm font-hud tracking-wider bg-white/5 text-white/70 border border-white/10 hover:border-red-500/50 hover:bg-red-900/20 transition-colors duration-300 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default Skills;
