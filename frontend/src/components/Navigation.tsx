import React, { useState, useEffect } from 'react';
import { Search, User } from 'lucide-react';

interface NavigationProps {
  location: string;
  onChangeLocation: () => void;
  onOpenFavorites: () => void;
  onOpenProfile: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenProfile,
  onNavigateSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero-section', label: 'Explore' },
    { id: 'compare-section', label: 'Compare' },
    { id: 'discover-section', label: 'Discover' },
    { id: 'savings-section', label: 'Savings' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-[#080706]/85 backdrop-blur-md border-[#C8A96B]/15 py-4' 
        : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Brand Wordmark (DISHCOUNT Floating Logo) */}
        <button
          onClick={() => onNavigateSection('hero-section')}
          className="text-left group"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#F4EBDD] font-light uppercase block group-hover:text-[#C8A96B] transition-colors">
            DISHCOUNT
          </span>
        </button>

        {/* Center Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigateSection(link.id)}
              className="text-xs tracking-[0.2em] font-sans font-light uppercase text-[#F4EBDD]/70 hover:text-[#C8A96B] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Controls: Search & Profile */}
        <div className="flex items-center gap-6 text-[#F4EBDD]/80">
          <button
            onClick={() => onNavigateSection('hero-section')}
            title="Search food"
            className="hover:text-[#C8A96B] transition-colors p-1"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          <button
            onClick={onOpenProfile}
            title="Profile"
            className="hover:text-[#C8A96B] transition-colors p-1"
          >
            <User className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

      </div>
    </header>
  );
};
