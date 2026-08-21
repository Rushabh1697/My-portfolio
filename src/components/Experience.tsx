import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EXPERIENCE_DATA = [
  {
    type: 'experience',
    title: 'Founder & Lead Developer',
    organization: 'PIXEL Forge',
    date: 'Present',
    description: 'Founded PIXEL Forge, a development agency focused on modern web solutions. Leading the architecture and development of client projects.',
    link: 'https://pixelforge-ruddy.vercel.app/'
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

  const topProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full min-h-screen bg-[#020000] py-24 px-8 md:px-24 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-title uppercase tracking-tighter text-white/90 mb-20 text-center"
        >
          The <span className="text-red-600">Journey</span>
        </motion.h2>

        <div ref={containerRef} className="relative md:mx-auto md:ml-0 ml-12 pb-24">
          
          {/* Circular Web Base at the top */}
          <div 
            className="absolute top-0 w-[180px] h-[180px] z-10 pointer-events-none opacity-80"
            style={{ left: '-4px', transform: 'translateX(-50%) translateY(-50%)' }}
          >
            <img src="/web_base.png" alt="Web Base" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          </div>

          {/* Dynamic Web String extending from base to Spidey */}
          <motion.div 
            className="absolute top-0 w-[6px] z-10 pointer-events-none mix-blend-screen"
            style={{ 
              left: '-4px', 
              transform: 'translateX(-50%)',
              height: topProgress,
              backgroundImage: 'url(/web_string.png)',
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto'
            }}
          />

          {/* Scrolling Spider-Man */}
          <motion.div 
            className="absolute -left-[45px] w-[90px] z-20 pointer-events-none flex flex-col items-center"
            style={{ top: topProgress }}
          >
            <img 
              src="/spiderman_upside_down.png" 
              alt="Spider-Man Hanging" 
              className="w-full h-auto drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            />
          </motion.div>
          
          {EXPERIENCE_DATA.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-16 pl-12 relative group"
            >
              <div className="flex flex-col">
                <span className="text-red-500 font-hud text-xs tracking-widest uppercase mb-2">{item.date} • {item.type}</span>
                <h3 className="text-2xl md:text-3xl font-title uppercase text-white/90 mb-1">{item.title}</h3>
                
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white/60 font-quote text-lg mb-4 hover:text-red-400 transition-colors">
                    {item.organization} ↗
                  </a>
                ) : (
                  <span className="text-white/60 font-quote text-lg mb-4">{item.organization}</span>
                )}

                <p className="text-white/50 leading-relaxed max-w-2xl">{item.description}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;
