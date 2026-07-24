import { motion } from 'motion/react';
import { ExternalLink, Award, Calendar, ChevronRight } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'March 2024',
    url: '#',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    description: 'Validates expertise in designing distributed systems on AWS.',
  },
  {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera (Meta)',
    date: 'Dec 2023',
    url: '#',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop',
    description: 'Comprehensive program covering React, UI/UX, and web development fundamentals.',
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera (Google)',
    date: 'Oct 2023',
    url: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description: 'Foundations of data analysis, SQL, Tableau, and R programming.',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-accent" />
            <h2 className="text-4xl font-display font-bold tracking-tight">Certifications</h2>
          </div>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Professional qualifications and continuous learning achievements that validate my skills.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative glass-card rounded-2xl overflow-hidden hover:border-accent/50 transition-colors duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent z-10" />
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full border border-zinc-700/50">
                  <Award size={20} className="text-accent" />
                </div>
              </div>

              <div className="p-6 relative z-20 -mt-12">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-sm font-medium text-zinc-300 mb-3">
                  {cert.issuer}
                </p>
                
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
                  {cert.description}
                </p>

                <a 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors group/link"
                >
                  View Credential
                  <ChevronRight size={16} className="text-accent group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
