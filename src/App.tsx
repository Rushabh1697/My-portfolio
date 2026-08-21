
import { useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import ResumeView from './components/ResumeView';
import { Agentation } from 'agentation';

function App() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <main className={`w-full min-h-screen bg-black overflow-x-hidden ${showResume ? 'print:hidden' : ''}`}>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <About onOpenResume={() => setShowResume(true)} />
        <Agentation />
      </main>

      <ResumeView isOpen={showResume} onClose={() => setShowResume(false)} />
    </>
  );
}

export default App;
