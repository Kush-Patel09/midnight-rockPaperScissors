import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden bg-zinc-950">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full z-10 relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center mt-12 md:mt-0">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left flex flex-col items-start order-2 md:order-1"
        >
          <motion.div variants={textVariants} className="overflow-hidden mb-6">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white">
              Kush Patel.
            </h1>
          </motion.div>

          <motion.div variants={textVariants} className="overflow-hidden mb-10">
            <p className="text-zinc-400 text-lg md:text-2xl font-light tracking-wide max-w-xl leading-relaxed">
              Data Analyst • Web Developer • Creative Thinker • AI Enthusiast
            </p>
          </motion.div>

          <motion.div variants={textVariants} className="flex flex-wrap gap-4 mt-4">
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors duration-300"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full bg-transparent text-white font-semibold border border-zinc-700 hover:border-white transition-colors duration-300"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', damping: 25 }}
          className="relative flex justify-center md:justify-end order-1 md:order-2"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full border border-zinc-700/50 overflow-hidden shadow-2xl">
              <img 
                src="/profile.png" 
                alt="Kush Patel" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
              />
            </div>
            
            {/* Floating accent dot */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-4 h-4 bg-accent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
