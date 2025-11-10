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
    
    // Set favicon
    const setFavicon = (href: string) => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = href;
    };
    
    setFavicon(priviaLogo);
    
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