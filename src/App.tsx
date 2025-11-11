import { useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import priviaLogo from '/favicon.png';

export default function App() {
  useEffect(() => {
    // Set page title
    document.title = 'Privia AI - Making AI Trustworthy';
    
    // Set favicon with fingerprint security icon
    const setFavicon = () => {
      // Create a canvas to draw the fingerprint icon
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Dark green background
        ctx.fillStyle = '#112C3F';
        ctx.fillRect(0, 0, 32, 32);
        
        // White fingerprint icon
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        // Draw fingerprint curves
        ctx.beginPath();
        ctx.arc(16, 16, 10, 0, Math.PI * 1.5);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(16, 16, 7, 0, Math.PI * 1.3);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(16, 16, 4, 0, Math.PI);
        ctx.stroke();
      }
      
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = canvas.toDataURL('image/png');
    };
    
    setFavicon();
    
    // Set meta description
    let metaDescription: HTMLMetaElement | null = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Join the Privia AI waitlist - Making AI Trustworthy through advanced security solutions';
  }, []);

  return (
    <div className="relative">
      <AnimatedBackground />
      <Header />
      <Hero />
      <WaitlistSection />
      <Footer />
    </div>
  );
}
