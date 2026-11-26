import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer } from 'lucide-react';
import { RESUME } from '../content/resume';
import type { ResumeEntry, ResumeLink } from '../content/resume';

const Link: React.FC<{ link: ResumeLink; className?: string }> = ({ link, className }) => (
  <a
    href={link.href}
    target={link.href.startsWith('http') ? '_blank' : undefined}
    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className={`break-all hover:underline ${className ?? ''}`}
  >
    {link.label}
  </a>
);

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="flex items-center gap-2 font-title uppercase tracking-wide text-[15px] leading-none text-zinc-950 mt-0 mb-2">
    <span aria-hidden="true" className="w-1.5 h-3.5 bg-red-600" />
    {children}
    <span aria-hidden="true" className="flex-1 h-px bg-zinc-300" />
  </h2>
);

const Entry: React.FC<{ entry: ResumeEntry }> = ({ entry }) => (
  <div className="break-inside-avoid">
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <h3 className="m-0 text-[13px] font-bold text-zinc-950">
        {entry.title}
        {entry.detail && <span className="font-normal text-zinc-600"> · {entry.detail}</span>}
      </h3>
      <div className="shrink-0 flex gap-3 text-[11px]">
        {entry.link && <Link link={entry.link} className="text-red-700" />}
        {entry.meta && <span className="text-zinc-600">{entry.meta}</span>}
      </div>
    </div>
    {entry.points.length > 0 && (
      <ul className="list-disc pl-4 m-0 mt-0.5 marker:text-red-600">
        {entry.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    )}
  </div>
);

/** The printed page and the on-screen view are the same sheet. */
const Sheet: React.FC = () => (
  <article
    className="bg-white text-zinc-800 text-[12.6px] leading-[1.45] select-text"
    style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
  >
    <header className="bg-zinc-950 text-white border-b-[5px] border-red-600 px-5 sm:px-10 py-5">
      <h1 className="m-0 font-title uppercase tracking-tight text-[34px] sm:text-[42px] leading-none">{RESUME.name}</h1>
      <p className="m-0 mt-1.5 font-quote uppercase tracking-[0.18em] text-[17px] text-red-500">{RESUME.role}</p>
      <ul className="list-none p-0 m-0 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-200">
        <li>{RESUME.location}</li>
        {RESUME.contacts.map((contact) => (
          <li key={contact.href}>
            <Link link={contact} />
          </li>
        ))}
      </ul>
    </header>

    <div className="px-5 sm:px-10 pt-4 pb-6 flex flex-col gap-4">
      <p className="m-0 text-[13px] text-zinc-900">{RESUME.summary}</p>

      <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {RESUME.highlights.map((highlight) => (
          <li key={highlight.label} className="flex items-center gap-2.5 border border-zinc-300 border-l-4 border-l-red-600 px-3 py-1.5">
            <span className="font-title text-[22px] leading-none text-zinc-950 whitespace-nowrap">{highlight.value}</span>
            <span className="text-[10.5px] leading-tight text-zinc-600">{highlight.label}</span>
          </li>
        ))}
      </ul>

      {RESUME.sections.map((section) => (
        <section key={section.heading}>
          <Heading>{section.heading}</Heading>
          <div className="flex flex-col gap-1.5">
            {section.entries.map((entry) => (
              <Entry key={`${entry.title}-${entry.detail}`} entry={entry} />
            ))}
          </div>
        </section>
      ))}

      <section className="break-inside-avoid">
        <Heading>Skills</Heading>
        <dl className="m-0 flex flex-col gap-0.5">
          {RESUME.skills.map((skill) => (
            <div key={skill.group} className="flex gap-2">
              <dt className="w-24 shrink-0 font-bold text-zinc-950">{skill.group}</dt>
              <dd className="m-0">{skill.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="break-inside-avoid">
        <Heading>Education</Heading>
        <Entry
          entry={{ title: RESUME.education.degree, detail: RESUME.education.school, meta: RESUME.education.meta, points: [] }}
        />
      </section>
    </div>
  </article>
);

interface ResumeViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeView: React.FC<ResumeViewProps> = ({ isOpen, onClose }) => {
  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll when open. Browsers name the saved PDF after the page title.
  useEffect(() => {
    if (!isOpen) return;
    const title = document.title;
    document.title = 'Rushabh-Makwana-Resume';
    document.body.style.overflow = 'hidden';
    return () => {
      document.title = title;
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="resume-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/85 backdrop-blur-md p-3 md:p-6 print:static print:block print:p-0 print:bg-white"
        >
          {/* Controls - Hidden during print */}
          <div className="shrink-0 w-full max-w-[794px] flex justify-end gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-title tracking-wider uppercase transition-colors"
            >
              <Printer size={18} />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume"
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* A4 is 794px wide on screen. */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="resume-paper w-full max-w-[794px] min-h-0 overflow-y-auto rounded-lg shadow-2xl bg-white print:max-w-none print:overflow-visible print:rounded-none print:shadow-none"
          >
            <Sheet />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeView;
