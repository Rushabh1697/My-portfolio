import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchRepositories } from '../services/github';
import type { GitHubRepo } from '../services/github';
import { ExternalLink, Code, Star } from 'lucide-react';
import projectsMd from '../content/projects.md?raw';

// Modify this constant to point to your actual GitHub username
const GITHUB_USERNAME = "Rushabh1697"; 

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepositories(GITHUB_USERNAME).then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black py-24 px-8 md:px-24">
      {/* Background Grunge */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Featured Projects (from Markdown) */}
        <div className="mb-32">
          <h2 className="text-5xl md:text-7xl font-title uppercase tracking-tighter text-white/90 mb-12">
            Featured <span className="text-red-600">Work</span>
          </h2>
          
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl md:text-5xl font-title uppercase tracking-wide text-white/90 mt-16 mb-8 border-b border-white/10 pb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-title uppercase tracking-wide text-white/80 mt-12 mb-6" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white/70 mt-8 mb-4 uppercase tracking-wider" {...props} />,
                p: ({node, ...props}) => <p className="text-white/60 leading-relaxed mb-6 max-w-3xl" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside text-white/60 space-y-2 mb-6" {...props} />,
                li: ({node, ...props}) => <li className="text-white/60" {...props} />,
                a: ({node, ...props}) => <a className="text-red-500 hover:text-red-400 transition-colors underline underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />,
                hr: ({node, ...props}) => <hr className="border-white/10 my-16" {...props} />
              }}
            >
              {projectsMd}
            </ReactMarkdown>
          </div>
        </div>

        {/* Other Projects (from GitHub) */}
        <div>
          <h2 className="text-4xl md:text-5xl font-title uppercase tracking-tighter text-white/80 mb-12">
            Other <span className="text-white/50">Explorations</span>
          </h2>

          {loading ? (
            <div className="text-white/50 font-hud uppercase tracking-widest text-sm">Syncing with GitHub...</div>
          ) : repos.length === 0 ? (
            <div className="text-white/50 font-hud uppercase tracking-widest text-sm">No public repositories found for {GITHUB_USERNAME}.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map(repo => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors relative overflow-hidden"
                >
                  {/* Subtle red hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <Code className="w-6 h-6 text-white/40 group-hover:text-red-500 group-hover:-translate-y-1 transition-all" />
                    {repo.homepage && (
                      <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/80 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  
                  <h3 className="relative z-10 text-xl font-bold text-white/90 mb-2 group-hover:text-red-400 transition-colors">
                    {repo.name}
                  </h3>
                  
                  <p className="relative z-10 text-sm text-white/60 mb-6 line-clamp-3">
                    {repo.description}
                  </p>
                  
                  <div className="relative z-10 flex items-center justify-between text-xs font-hud text-white/60 mt-auto">
                    <span>{repo.language || 'Unknown'}</span>
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Projects;
