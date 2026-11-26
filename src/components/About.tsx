import React from 'react';
import { Code, GitCommit, Briefcase, Camera, Phone, Mail, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const EMAIL = 'rushabhmakwana784@gmail.com';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Rushabh1697', icon: Code },
  { label: 'GitLab', href: 'https://gitlab.com/Rushabh1697', icon: GitCommit },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushabh-makwana-43590030a', icon: Briefcase },
  { label: 'Instagram', href: 'https://www.instagram.com/_.rushhhhh._16/', icon: Camera },
  { label: 'Phone', href: 'tel:9321144797', icon: Phone },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: Mail }
];

interface AboutProps {
  onOpenResume?: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section className="relative w-full min-h-[70vh] bg-zinc-950 py-24 md:py-32 px-5 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden border-t border-white/5">

      {/* Spider-signal: rings pulsing out from behind the heading */}
      <div aria-hidden="true" className="absolute left-1/2 top-40 pointer-events-none">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute w-[300px] h-[300px] md:w-[520px] md:h-[520px] -ml-[150px] -mt-[150px] md:-ml-[260px] md:-mt-[260px] rounded-full border border-red-600/50"
            initial={{ scale: 0.35, opacity: 0 }}
            animate={{ scale: [0.35, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: ring * 1.5, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-title uppercase tracking-tighter text-white/95 mb-5"
        >
          Send a <span className="text-red-600">Signal</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 font-quote text-xl md:text-2xl tracking-wide max-w-xl uppercase"
        >
          Open to web development internships and freelance work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-9 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href={`mailto:${EMAIL}`}
            data-glow
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-title tracking-widest uppercase transition-all rounded-sm shadow-[0_0_30px_rgba(220,38,38,0.45)] hover:shadow-[0_0_45px_rgba(220,38,38,0.8)]"
          >
            <Mail className="w-5 h-5" /> Email me
          </a>
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              data-glow
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/25 hover:border-white/70 bg-black/40 text-white text-lg font-title tracking-widest uppercase transition-colors rounded-sm"
            >
              <FileText className="w-5 h-5" /> View full resume
            </button>
          )}
        </motion.div>

        <div className="w-full mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith('http') ? "_blank" : undefined}
                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                data-glow
                className="group flex items-center justify-between gap-3 p-4 md:p-6 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-red-500/60 hover:bg-white/[0.05] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <Icon className="shrink-0 w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-red-500 transition-colors" />
                  <span className="font-hud uppercase tracking-wider md:tracking-widest text-xs md:text-sm text-white/85 group-hover:text-white transition-colors">{link.label}</span>
                </div>
                <ArrowRight className="hidden sm:block shrink-0 w-4 h-4 text-white/30 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </motion.a>
            )
          })}
        </div>
      </div>

    </section>
  );
};

export default About;
