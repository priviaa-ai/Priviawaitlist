import { useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import faviconImage from '/favicon.png';

export default function App() {
  useEffect(() => {
    // Set page title
    document.title = 'Privia AI – Building Trust in the AI Era';
    
    // Set favicon
    const setFavicon = () => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = faviconImage;
    };
    
    setFavicon();
    
    // Set meta description
    let metaDescription: HTMLMetaElement | null = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Join the Privia AI waitlist — tools making artificial intelligence reliable, transparent, and privacy-respecting.';
    
    // Helper function to set or create meta tags
    const setMetaTag = (property: string, content: string, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name';
      let meta: HTMLMetaElement | null = document.querySelector(`meta[${attr}='${property}']`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Open Graph meta tags for social media sharing
    setMetaTag('og:title', 'Privia AI – Building Trust in the AI Era');
    setMetaTag('og:description', 'Join the Privia AI waitlist — tools making artificial intelligence reliable, transparent, and privacy-respecting.');
    setMetaTag('og:type', 'website');
    setMetaTag('og:url', 'https://priviaai.com');
    setMetaTag('og:image', logoImage);
    setMetaTag('og:site_name', 'Privia AI');
    
    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', 'Privia AI – Building Trust in the AI Era', false);
    setMetaTag('twitter:description', 'Join the Privia AI waitlist — tools making artificial intelligence reliable, transparent, and privacy-respecting.', false);
    setMetaTag('twitter:image', logoImage, false);
    setMetaTag('twitter:site', '@PriviaAI', false);
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


export default function App() {
  useEffect(() => {
    // Set page title
    document.title = 'Privia AI - Making AI Trustworthy';
    
    // Set favicon
    const setFavicon = () => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = faviconImage;
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
