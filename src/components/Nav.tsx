import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Work', id: 'work' },
  { label: 'Contact', id: 'contact' },
];

const ITEM =
  'font-hud text-xs uppercase tracking-widest text-white/75 hover:text-red-400 transition-colors';

/** A small bar that appears once the opening has been scrolled past. */
const Nav: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('hero-section');
      const past = hero !== null && hero.getBoundingClientRect().bottom <= 64;
      setVisible(past);
      if (!past) setOpen(false);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';
  const goTo = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior });
  };

  const items = (
    <>
      {LINKS.map((link) => (
        <a key={link.id} href={`#${link.id}`} onClick={(event) => goTo(event, link.id)} className={`${ITEM} py-3 md:py-1`}>
          {link.label}
        </a>
      ))}
      <button
        onClick={() => {
          setOpen(false);
          onOpenResume();
        }}
        className="font-hud text-xs uppercase tracking-widest text-white border border-red-600 hover:bg-red-600 px-4 py-2.5 md:py-1.5 transition-colors"
      >
        Resume
      </button>
    </>
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Main"
          initial={{ y: reducedMotion ? 0 : -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reducedMotion ? 0 : -70, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 inset-x-0 z-50 bg-black/85 backdrop-blur-md border-b border-red-900/50 print:hidden"
        >
          <div className="max-w-7xl mx-auto h-14 px-5 md:px-12 flex items-center justify-between">
            <button
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
              className="font-title uppercase tracking-wide text-xl text-white"
            >
              Rushabh<span className="text-red-600">.</span>
            </button>

            <div className="hidden md:flex items-center gap-8">{items}</div>

            <button
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 -mr-2 text-white"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {open && (
            <div className="md:hidden flex flex-col items-stretch px-5 pb-5 border-t border-white/10 text-center">
              {items}
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Nav;
