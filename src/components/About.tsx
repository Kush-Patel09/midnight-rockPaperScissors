import * as React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Layout, Database, Cloud, GitBranch } from 'lucide-react';

export default function About() {
  const skills = [
    { category: 'Frontend', icon: <Layout size={18} />, items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion'] },
    { category: 'Backend', icon: <Database size={18} />, items: ['Node.js', 'Express', 'PostgreSQL', 'Firebase', 'Python'] },
    { category: 'DevOps & Tools', icon: <Cloud size={18} />, items: ['Figma', 'Git', 'Vercel', 'Docker', 'AWS'] },
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-zinc-900/20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 text-zinc-400">
                <Terminal size={24} />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 italic">Me</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
              <p>
                I bridge the gap between creative vision and technical reality. 
                With over <span className="text-zinc-200 font-medium">5 years of experience</span> in the digital space, I've helped 
                startups and established brands build memorable experiences that users love.
              </p>
              <p>
                My philosophy is simple: build things that are <span className="text-zinc-200 font-medium">fast, accessible, 
                and meaningful</span>. I believe that every interaction should be an 
                opportunity to delight users while maintaining rock-solid performance under the hood.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 glass-card rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-5xl font-display font-bold text-zinc-100 mb-2 block transition-colors duration-300 group-hover:text-accent">15+</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <GitBranch size={14} /> Projects
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 glass-card rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-5xl font-display font-bold text-white mb-2 block group-hover:text-blue-400 transition-colors">5+</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <Cpu size={14} /> Years Exp
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="glass-card p-8 rounded-[2rem] relative overflow-hidden group hover:border-zinc-700/80 transition-colors duration-500">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-colors duration-500" />
              
              <h3 className="text-sm font-mono uppercase tracking-widest text-white mb-10 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                Technical Arsenal
              </h3>
              
              <div className="space-y-8 relative z-10">
                {skills.map((group, index) => (
                  <motion.div 
                    key={group.category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                  >
                    <h4 className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
                      <span className="text-zinc-500">{group.icon}</span>
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {group.items.map(skill => (
                        <span 
                          key={skill} 
                          className="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/80 rounded-xl text-sm text-zinc-300 hover:text-white hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
