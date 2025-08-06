import { useState, useEffect } from 'react';
import { useSound } from './SoundManager';
import SnakeGame from './SnakeGame';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import { useIsMobile } from '@/hooks/use-mobile';

type Section = 'game' | 'projects' | 'about' | 'experience' | 'contact';

const ArcadeConsole = () => {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const { playSound } = useSound();
  const isMobile = useIsMobile();

  const menuItems = [
    { id: 'game' as Section, label: 'SKILLS GAME', description: 'Technical skills' },
    { id: 'projects' as Section, label: 'HIGH SCORES', description: 'Project Gallery' },
    { id: 'about' as Section, label: 'PLAYER PROFILE', description: 'About Me' },
    { id: 'experience' as Section, label: 'CAREER MODE', description: 'Work History' },
    { id: 'contact' as Section, label: 'INSTRUCTIONS', description: 'Contact & CV' }
  ];

  const handleMenuClick = (sectionId: Section) => {
    if (sectionId !== activeSection) {
      playSound('menu-confirm');
      setActiveSection(sectionId);
    }
  };

  const handleMenuHover = () => {
    playSound('menu-bleep');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'game':
        return <SnakeGame isMobile={isMobile} />;
      case 'projects':
        return <ProjectsSection />;
      case 'about':
        return <AboutSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div className="mobile-layout min-h-screen">
        {/* Mobile Navigation */}
        <nav className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-2 font-arcade text-xs rounded border transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                    : 'bg-card text-foreground border-border hover:border-secondary hover:text-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Content */}
        <main className="flex-1">
          {renderSection()}
        </main>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="min-h-screen p-7 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Arcade Console Frame */}
        <div className="arcade-console p-8">
          {/* Screen Area */}
          <div className="bg-arcade-screen rounded-lg p-2 mb-8 h-[950px]">
            <div className="crt-screen h-full overflow-y-auto">
              {renderSection()}
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-arcade-console p-6 rounded-b-lg">
            {/* Navigation Menu */}
            <nav className="nav-menu">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  onMouseEnter={handleMenuHover}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  title={item.description}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Console Details */}
            <div className="mt-6 text-center">
              <div className="flex justify-center gap-8 text-xs font-mono text-muted-foreground">
                <span>© 2025 AAYUSH SHRESTHA</span>
                <span>v1.0.0</span>
                <span>RETRO ARCADE EDITION</span>
              </div>
              
              <div className="mt-4 flex justify-center gap-4">
                {/* Decorative Console Buttons */}
                <div className="w-4 h-4 bg-destructive rounded-full border-2 border-destructive-foreground"></div>
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-primary-foreground"></div>
                <div className="w-4 h-4 bg-secondary rounded-full border-2 border-secondary-foreground"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Credits */}
        <div className="text-center mt-8">
          <p className="font-mono text-xs text-muted-foreground">
            Built with React, TypeScript & lots of ☕ • Inspired by the golden age of arcade gaming
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArcadeConsole;