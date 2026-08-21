
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { Agentation } from 'agentation';

function App() {
  return (
    <main className="w-full min-h-screen bg-black overflow-x-hidden">
      <Hero />
      <Skills />
      <Projects />
      <Agentation />
    </main>
  );
}

export default App;
