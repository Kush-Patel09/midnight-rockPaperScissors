import { motion } from 'motion/react';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Let's work together
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">Have a project <span className="italic">in mind?</span></h2>
          <p className="text-zinc-500 text-xl max-w-xl mx-auto mb-12">
            I'm currently accepting new projects and freelance opportunities. 
            Drop me a message and I'll get back to you within 24 hours.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:hello@example.com"
              className="w-full md:w-auto px-10 py-5 bg-white text-zinc-950 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all shadow-xl"
            >
              <Mail size={24} />
              Say Hello
            </a>
            <a 
              href="#"
              className="w-full md:w-auto px-10 py-5 bg-zinc-900 text-zinc-100 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 border border-zinc-800 hover:bg-zinc-800 transition-all"
            >
              <MessageSquare size={24} />
              Book a Call
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="mt-40 pt-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-sm">
         <p>© 2026 Kush Patel. All rights reserved.</p>
         <div className="flex items-center gap-8">
            <a href="#" className="hover:text-zinc-100 transition-colors">GitHub</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Twitter</a>
         </div>
         <p className="font-mono text-[10px] uppercase tracking-tighter opacity-50">Built with React & Tailwind</p>
      </footer>
    </section>
  );
}
