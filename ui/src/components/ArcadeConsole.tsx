import { useState, useEffect, useRef } from 'react';
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
  const [mountedSections, setMountedSections] = useState<Set<Section>>(new Set(['about']));

  // Refs for auto-centering the active nav item
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<Section, HTMLButtonElement | null>>({
    game: null,
    projects: null,
    about: null,
    experience: null,
    contact: null,
  });

  const centerMenuItem = (sectionId: Section, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    const btn = buttonRefs.current[sectionId];
    if (!container || !btn) return;

    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = btn.getBoundingClientRect();
      const currentScrollLeft = container.scrollLeft;
      const buttonCenter = buttonRect.left - containerRect.left + currentScrollLeft + buttonRect.width / 2;
      const rawTargetLeft = buttonCenter - container.clientWidth / 2;
      const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
      const clampedTargetLeft = Math.min(Math.max(0, rawTargetLeft), maxScrollLeft);

      container.scrollTo({ left: clampedTargetLeft, behavior });
    });
  };

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
    centerMenuItem(sectionId);
  };

  const handleMenuHover = () => {
    playSound('menu-bleep');
  };

  useEffect(() => {
    centerMenuItem(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const onResize = () => centerMenuItem(activeSection);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSection]);

  // Center the default landing item (PLAYER PROFILE) on first render of the mobile layout
  useEffect(() => {
    if (!isMobile) return;
    centerMenuItem(activeSection, 'auto');
  }, [isMobile, activeSection]);

  // Mobile: always start each section at the top when switching
  useEffect(() => {
    if (!isMobile) return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [isMobile, activeSection]);

  // Keep non-game sections mounted in mobile to avoid flicker; mount when first visited
  useEffect(() => {
    if (!isMobile) return;
    setMountedSections((prev) => {
      if (prev.has(activeSection)) return prev;
      const next = new Set(prev);
      next.add(activeSection);
      return next;
    });
  }, [isMobile, activeSection]);

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
        <nav className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b mb-4">
          <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory" ref={scrollContainerRef}>
            <div className="flex flex-nowrap gap-3 px-3 py-2">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <div key={item.id} className="snap-center flex flex-col items-center shrink-0">
                    <button
                      ref={(el) => { buttonRefs.current[item.id] = el; }}
                      onClick={() => handleMenuClick(item.id)}
                      onMouseEnter={handleMenuHover}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-flex items-center justify-center rounded-md border h-10 px-4 font-arcade text-[11px] whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 ${
                        isActive
                          ? 'bg-transparent text-primary border-primary focus:ring-primary/40 ring-2 ring-primary/30 shadow-md shadow-primary/30'
                          : 'bg-card text-foreground border-border hover:border-secondary hover:text-secondary focus:ring-primary/30'
                      }`}
                      title={item.description}
                    >
                      <span className="uppercase">{item.label}</span>
                    </button>
                    {isActive && (
                      <div className="mt-1 h-3 flex items-center justify-center">
                        <span className="text-primary text-xs animate-pulse" aria-hidden>▲</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Content */}
        <main className="flex-1">
          {/* Keep non-game sections mounted to reduce flicker; game mounts only when active */}
          <div className={activeSection === 'game' ? '' : 'hidden'} aria-hidden={activeSection !== 'game'}>
            {activeSection === 'game' && <SnakeGame isMobile={isMobile} />}
          </div>
          {(mountedSections.has('projects') || activeSection === 'projects') && (
            <div className={activeSection === 'projects' ? '' : 'hidden'} aria-hidden={activeSection !== 'projects'}>
              <ProjectsSection />
            </div>
          )}
          {(mountedSections.has('about') || activeSection === 'about') && (
            <div className={activeSection === 'about' ? '' : 'hidden'} aria-hidden={activeSection !== 'about'}>
              <AboutSection />
            </div>
          )}
          {(mountedSections.has('experience') || activeSection === 'experience') && (
            <div className={activeSection === 'experience' ? '' : 'hidden'} aria-hidden={activeSection !== 'experience'}>
              <ExperienceSection />
            </div>
          )}
          {(mountedSections.has('contact') || activeSection === 'contact') && (
            <div className={activeSection === 'contact' ? '' : 'hidden'} aria-hidden={activeSection !== 'contact'}>
              <ContactSection />
            </div>
          )}
        </main>

        {/* Aesthetic separator */}
        <div className="mx-6 mt-2" aria-hidden="true">
          <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>
          <div className="h-2 bg-gradient-to-b from-transparent to-black/15 opacity-50"></div>
        </div>

        {/* Console Details (mobile) */}
        <div className="mt-3 text-center px-4 opacity-80">
          <div className="flex justify-center gap-4 text-[10px] font-mono text-muted-foreground">
            <span>© 2025 AAYUSH SHRESTHA</span>
            <span>v1.0.0</span>
            <span>RETRO ARCADE EDITION</span>
          </div>
          <div className="mt-3 flex justify-center gap-3">
            {/* Decorative Console Buttons */}
            <div className="w-3 h-3 bg-destructive rounded-full border-2 border-destructive-foreground"></div>
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-primary-foreground"></div>
            <div className="w-3 h-3 bg-secondary rounded-full border-2 border-secondary-foreground"></div>
          </div>
        </div>

        {/* Footer Credits (mobile) */}
        <div className="text-center mt-6 mb-6 px-4">
          <p className="font-mono text-[10px] text-muted-foreground">
            Built with React, TypeScript & lots of ☕ • Inspired by the golden age of arcade gaming
          </p>
        </div>
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
          <div className="crt-screen bg-arcade-screen rounded-lg p-2 mb-4 h-[950px]">
            <div className="h-full overflow-y-auto custom-scrollbar">
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