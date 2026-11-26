
import { useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import ResumeView from './components/ResumeView';
import Nav from './components/Nav';
import { MotionConfig } from 'framer-motion';
import { Agentation } from 'agentation';

function App() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <main className={`w-full min-h-screen bg-black overflow-x-clip ${showResume ? 'print:hidden' : ''}`}>
        <Hero />
        <Nav onOpenResume={() => setShowResume(true)} />
        {/* Sections skip movement for visitors who ask for less motion. */}
        <MotionConfig reducedMotion="user">
          <div id="skills">
            <Skills />
          </div>
          <div id="journey">
            <Experience />
          </div>
          <div id="work">
            <Projects />
          </div>
          <div id="contact">
            <About onOpenResume={() => setShowResume(true)} />
          </div>
        </MotionConfig>
        {import.meta.env.DEV && <Agentation />}
      </main>

      <ResumeView isOpen={showResume} onClose={() => setShowResume(false)} />
    </>
  );
}

export default App;
