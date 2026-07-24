import { motion } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11.02 11.02 0 0 1 12 6.07c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.66.42.36.78 1.06.78 2.15v3.17c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const projects = [
  {
    title: 'E-commerce Redesign',
    description: 'A modern, accessible storefront for a premium coffee roastery with seamless payment integration.',
    tags: ['Next.js', 'Tailwind', 'Stripe', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    links: { live: '#', github: '#' }
  },
  {
    title: 'Data Dashboard',
    description: 'Real-time analytics and visualization dashboard for subscription-based businesses.',
    tags: ['React', 'D3.js', 'Express', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
    links: { live: '#', github: '#' }
  },
  {
    title: 'Social Platform',
    description: 'A minimalist social network focused on high-quality photography and creators.',
    tags: ['TypeScript', 'Firebase', 'Motion', 'React Query'],
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=800',
    links: { live: '#', github: '#' }
  },
  {
    title: 'AI Travel Planner',
    description: 'Personalized itinerary generation using large language models and smart routing.',
    tags: ['Python', 'FastAPI', 'React', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
    links: { live: '#', github: '#' }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-zinc-950 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-accent/10 rounded-lg border border-accent/20 text-accent">
              <Code2 size={24} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 italic">Work</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-xl text-lg"
          >
            A showcase of my recent projects, blending thoughtful design with 
            robust technical implementation to solve real-world problems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.7, type: "spring", bounce: 0.2 }}
              className="group relative glass-card rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-xs font-mono uppercase tracking-wider rounded-lg border border-zinc-700/50"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-3 text-white group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <a href={project.links.live} className="relative text-white font-medium text-sm flex items-center gap-2 group/link">
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover/link:w-full transition-all duration-300" />
                      <ExternalLink size={16} className="text-accent" /> Live Demo
                    </a>
                    <a href={project.links.github} className="relative text-zinc-400 hover:text-white transition-colors font-medium text-sm flex items-center gap-2 group/link">
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover/link:w-full transition-all duration-300" />
                      <GitHubIcon size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
