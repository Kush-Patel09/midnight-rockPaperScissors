import { motion, useScroll, useTransform } from 'motion/react';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

function GitHubIcon({ size = 20 }: { size?: number }) {
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navY = useTransform(scrollY, [0, 50], [0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.div
      style={{ y: navY }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full mt-6 px-4 pointer-events-none"
    >
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`pointer-events-auto flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-300 w-full max-w-5xl ${
          scrolled 
            ? 'bg-zinc-900/60 backdrop-blur-xl border-zinc-700/50 shadow-2xl' 
            : 'bg-zinc-950/20 backdrop-blur-md border-zinc-800/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-accent rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-accent rounded-lg flex items-center justify-center font-display font-bold text-lg text-white border border-white/20">
              K
            </div>
          </div>
          <span className="font-display font-semibold tracking-tight text-xl hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            Kush Patel
          </span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-1 bg-zinc-950/50 p-1 rounded-lg border border-zinc-800/50">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800/50 group"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l border-zinc-700/50 pl-6">
            <a href="#" className="text-zinc-400 hover:text-accent transition-colors hover:scale-110 duration-200">
              <GitHubIcon size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-accent transition-colors hover:scale-110 duration-200">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}
