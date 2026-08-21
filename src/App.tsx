
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import { Agentation } from 'agentation';

function App() {
  return (
    <main className="w-full min-h-screen bg-black overflow-x-hidden">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <About />
      <Agentation />
    </main>
  );
}

export default App;
