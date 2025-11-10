import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { XIcon } from './XIcon';
// import logo from '/logo.png';

export function Footer() {
  const socialLinks = [
    { Icon: XIcon, href: 'https://x.com/PriviaAI', label: 'X (Twitter)' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/company/privia-ai', label: 'LinkedIn' },
    { Icon: Mail, href: 'mailto:yuvrajbhatia.work@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative px-4 sm:px-6 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-32 h-12">
              <ImageWithFallback 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2025 All rights reserved
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:border-[#112C3F] hover:shadow-[0_0_20px_rgba(17,44,63,0.3)] transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
