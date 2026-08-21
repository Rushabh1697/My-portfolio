import React from 'react';
import { Code, GitCommit, Briefcase, Camera, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Rushabh1697', icon: Code },
  { label: 'GitLab', href: 'https://gitlab.com/Rushabh1697', icon: GitCommit },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushabh-makwana-43590030a', icon: Briefcase },
  { label: 'Instagram', href: 'https://www.instagram.com/_.rushhhhh._16/', icon: Camera },
  { label: 'Phone', href: 'tel:9321144797', icon: Phone },
  { label: 'Email', href: 'mailto:rushabhmakwana784@gmail.com', icon: Mail }
];

interface AboutProps {
  onOpenResume?: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section className="relative w-full min-h-[70vh] bg-zinc-950 py-32 px-8 md:px-24 flex flex-col justify-center overflow-hidden border-t border-white/5">
      
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-title text-white/[0.02] tracking-tighter pointer-events-none uppercase whitespace-nowrap">
        Identity
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col lg:flex-row gap-16 justify-between items-center lg:items-start">
        
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-title uppercase tracking-tighter text-white/90 mb-6"
          >
            Reveal <span className="text-red-600">Identity</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 font-quote text-2xl tracking-wide max-w-md uppercase"
          >
            Open to new opportunities, collaborations, and building AI-native products.
          </motion.p>

          {onOpenResume && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={onOpenResume}
              className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-title tracking-widest uppercase transition-colors rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              View Full Resume
            </motion.button>
          )}
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? "_blank" : undefined}
                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 hover:border-red-500/50 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-6 h-6 text-white/40 group-hover:text-red-500 transition-colors" />
                  <span className="font-hud uppercase tracking-widest text-sm text-white/80 group-hover:text-white transition-colors">{link.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </motion.a>
            )
          })}
        </div>
      </div>
      
    </section>
  );
};

export default About;
