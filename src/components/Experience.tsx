import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EXPERIENCE_DATA = [
  {
    type: 'experience',
    title: 'Founder & Lead Developer',
    organization: 'PIXEL Forge',
    date: 'Present',
    description: 'Founded PIXEL Forge, a development agency focused on modern web solutions. Leading the architecture and development of client projects.',
    link: 'https://pixelforge-web-eta.vercel.app/'
  },
  {
    type: 'experience',
    title: 'Web Dev Co-head',
    organization: 'E-Cell',
    date: 'Present',
    description: 'Leading web development initiatives for the Entrepreneurship Cell at K.C. College of Engineering. Architecting platforms for college-wide events.'
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Engineering (2nd Year)',
    organization: 'K. C. College Of Engineering, Thane',
    date: 'Present',
    description: 'Currently pursuing my Bachelors degree while actively participating in technical clubs and orchestrating hackathons.'
  },
  {
    type: 'achievement',
    title: 'SINGULARITY Hackathon Organizer',
    organization: 'Intra-College 24hr Event',
    date: 'Recent',
    description: 'Successfully organized and conducted an intra-college 24-hour hackathon named SINGULARITY, fostering innovation and rapid prototyping among students.'
  }
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const topProgress = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <section className="relative w-full bg-[#020000] pt-24 pb-12 px-5 md:px-12 lg:px-24 overflow-hidden">

      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-title uppercase tracking-tighter text-white/90 mb-16 md:mb-24 text-center"
        >
          The <span className="text-red-600">Journey</span>
        </motion.h2>

        {/* The web line runs down the left on phones and down the middle on wider
            screens. The top padding keeps the web clear of the first entry. */}
        <div ref={containerRef} className="relative pt-14 md:pt-24 pb-4">

          {/* Circular Web Base at the top */}
          <div className="absolute top-0 left-5 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] md:w-[180px] md:h-[180px] z-10 pointer-events-none opacity-80">
            <img src="/web_base.png" alt="" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          </div>

          {/* Dynamic Web String extending from base to Spidey */}
          <motion.div
            data-web-string
            className="absolute top-0 left-5 md:left-1/2 -translate-x-1/2 w-[24px] md:w-[30px] z-10 pointer-events-none"
            style={{
              height: topProgress,
              // web_string.png trimmed to the thread, so it stays visible at this size.
              backgroundImage: 'url(/web_string_tile.png)',
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto'
            }}
          />

          {/* Scrolling Spider-Man */}
          <motion.div
            className="absolute left-5 md:left-1/2 -translate-x-1/2 w-[44px] md:w-[90px] z-20 pointer-events-none flex flex-col items-center"
            style={{ top: topProgress }}
          >
            <img
              src="/spiderman_upside_down.png"
              alt="Spider-Man Hanging"
              // Nudged so the thread in the picture continues the strand above it.
              className="w-full h-auto -mt-[7%] translate-x-[4.6%] drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            />
          </motion.div>

          {EXPERIENCE_DATA.map((item, index) => {
            const onLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative pb-14 md:pb-20 pl-14 md:w-1/2 ${onLeft ? 'md:pl-0 md:pr-20 md:text-right' : 'md:ml-auto md:pl-20'}`}
              >
                <div className={`flex flex-col ${onLeft ? 'md:items-end' : 'md:items-start'}`}>
                  <span className="text-red-500 font-hud text-xs tracking-widest uppercase mb-2">{item.date} • {item.type}</span>
                  <h3 className="text-2xl md:text-3xl font-title uppercase text-white/95 mb-1">{item.title}</h3>

                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white/75 font-quote text-lg mb-4 hover:text-red-400 transition-colors underline underline-offset-4 decoration-red-600/60">
                      {item.organization} ↗
                    </a>
                  ) : (
                    <span className="text-white/75 font-quote text-lg mb-4">{item.organization}</span>
                  )}

                  <p className="text-white/70 leading-relaxed max-w-md">{item.description}</p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Experience;
