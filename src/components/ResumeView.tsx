import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { X, Printer } from 'lucide-react';
import resumeMd from '../content/resume.md?raw';

interface ResumeViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeView: React.FC<ResumeViewProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Strip YAML frontmatter from markdown
    const strippedContent = resumeMd.replace(/---[\s\S]*?---/, '').trim();
    setContent(strippedContent);
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 print:bg-white print:p-0 print:block"
        >
          {/* Controls - Hidden during print */}
          <div className="absolute top-6 right-6 flex gap-4 z-50 print:hidden">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-title tracking-wider uppercase transition-colors"
            >
              <Printer size={18} />
              <span>Print / PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Resume Document Container */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl shadow-2xl custom-scrollbar print:max-h-none print:overflow-visible print:bg-white print:shadow-none print:rounded-none"
          >
            <div className="p-8 md:p-12 lg:p-16">
              
              {/* Header section (Rendered from Frontmatter data manually for styling) */}
              <div className="border-b border-white/10 print:border-black/20 pb-8 mb-8">
                <h1 className="text-4xl md:text-5xl font-title uppercase text-white print:text-black tracking-tight mb-2">Rushabh H. Makwana</h1>
                <h2 className="text-xl md:text-2xl text-red-500 font-hud tracking-widest uppercase mb-6">Web Developer & Founder</h2>
                
                <p className="text-white/70 print:text-black/80 max-w-2xl leading-relaxed mb-6">
                  Web Developer and founder of PIXEL Forge. Passionate about creating responsive, high-performance web applications and orchestrating technical events.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50 print:text-black/60 font-mono">
                  <a href="mailto:rushabhmakwana784@gmail.com" className="hover:text-red-400">rushabhmakwana784@gmail.com</a>
                  <a href="https://github.com/Rushabh1697" target="_blank" rel="noreferrer" className="hover:text-red-400">GitHub</a>
                  <a href="https://gitlab.com/Rushabh1697" target="_blank" rel="noreferrer" className="hover:text-red-400">GitLab</a>
                  <a href="https://www.linkedin.com/in/rushabh-makwana-43590030a" target="_blank" rel="noreferrer" className="hover:text-red-400">LinkedIn</a>
                </div>
              </div>

              {/* Markdown Content */}
              <div className="prose prose-invert prose-red max-w-none print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black print:prose-a:text-black">
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-2xl font-title uppercase tracking-wide text-white print:text-black mt-12 mb-6 border-b border-white/10 print:border-black/20 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white/90 print:text-black mt-8 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="text-white/70 print:text-black/80 my-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside text-white/70 print:text-black/80 my-4 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="marker:text-red-500" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white print:text-black font-bold" {...props} />,
                    em: ({node, ...props}) => <em className="text-red-400 font-hud text-sm uppercase tracking-wider not-italic ml-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-red-500 hover:text-red-400 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeView;
