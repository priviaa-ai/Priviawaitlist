import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[85vh] md:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-2 md:pb-3 relative">
      <div className="max-w-5xl mx-auto text-center">
        {/* "LAUNCHING SOON" Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            style={{ willChange: 'box-shadow' }}
            animate={{
              boxShadow: [
                '0_0_30px_rgba(34,211,238,0.3)',
                '0_0_40px_rgba(167,139,250,0.4)',
                '0_0_30px_rgba(34,211,238,0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-sm bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              LAUNCHING SOON
            </span>
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-5xl md:text-8xl bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent tracking-tight leading-[1.2]"
        >
          Building the Trust Layer for the AI Era.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Privia AI builds tools that make artificial intelligence transparent, reliable, and privacy-respecting, for both enterprises and individuals.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-0"
        >
          <button
            onClick={scrollToWaitlist}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#112C3F] text-white overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(17,44,63,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#112C3F] to-[#1a4d5f] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative z-10">Join Waitlist</span>
            <ChevronDown className="relative z-10 w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
          </button>
        </motion.div>

        {/* Floating elements - reduced intensity */}
        <motion.div
          className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-[#112C3F]/10 blur-3xl"
          animate={{
            y: [0, 6, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-[15%] w-40 h-40 rounded-full bg-[#1a4d5f]/10 blur-3xl"
          animate={{
            y: [0, -6, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
}
