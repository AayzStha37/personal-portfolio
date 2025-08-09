import { Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useSound } from './SoundManager';
import YesNoPrompt from './YesNoPrompt'; 
import { ContactForm } from './ContactForm'; 
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { playSound } = useSound();
  const isMobile = useIsMobile();

  const handleDownloadCV = () => {
    playSound('power-up');
    const cvUrl = process.env.NODE_ENV === 'development'
      ? '/Aayush_CV.pdf'
      : `${import.meta.env.BASE_URL || '/'}Aayush_CV.pdf`;
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Aayush_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = (type: string) => {
    playSound('menu-confirm');
  };

  // Arcade-themed toasts
  const showSuccessToast = () => {
    toast({
      title: 'Instructions sent! ✅',
      duration: 1800,
      className: 'border-2 border-yellow-400 bg-background/95 text-yellow-400 font-arcade text-xs sm:text-sm shadow-[0_8px_32px_rgba(163,230,53,0.33)]',
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      title: message || 'Something went wrong',
      variant: 'destructive',
      duration: 2500,
      className: 'border-2 font-arcade text-xs sm:text-sm shadow-[0_8px_32px_rgba(239,68,68,0.33)]',
    });
  };

  if (isMobile) {
    return (
      <div className="p-3">
        <div className="text-center mb-6">
          <h2 className="font-arcade text-xl text-primary mb-2">INSTRUCTIONS</h2>
          <p className="font-mono text-xs text-secondary">
            Download complete documentation and establish communication links
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* CV Download Section (mobile-scaled) */}
          <div className="text-center">
            <div className="bg-card p-5 rounded-lg border border-primary/60">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-arcade text-sm text-primary mb-3">COMPLETE DOCUMENTATION</h3>
              <p className="font-mono text-xs text-foreground mb-4 leading-relaxed">
                Access the full technical specifications and comprehensive skill matrix.
              </p>
                <button
                onClick={handleDownloadCV}
                className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FFD700] text-[#18181b]
                     rounded text-xs font-arcade hover:bg-[#e6c200] transition-colors duration-200
                     border border-[#FFD700] hover:shadow-md mx-auto"
                >
                <Download size={14} className="text-white" />
                <span className="text-white">DOWNLOAD CV</span>
                </button>
              <p className="font-mono text-[11px] text-muted-foreground mt-3">
                PDF • Updated {import.meta.env.VITE_GIT_LAST_MODIFIED || '2025-07-31'}
              </p>
            </div>
          </div>

          {/* Contact Links (mobile-scaled) */}
          <div className="space-y-3">
            <h4 className="font-arcade text-sm text-secondary text-center mb-2">
              COMMUNICATION CHANNELS
            </h4>

            <div className="grid gap-3">
              <a
                href="mailto:saayush97@gmail.com"
                onClick={() => handleContactClick('email')}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border 
                           hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-200">
                  <Mail className="text-primary" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-arcade text-xs text-foreground mb-0.5 truncate">PRIMARY EMAIL</h5>
                  <p className="font-mono text-[11px] text-secondary truncate">saayush97@gmail.com</p>
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors duration-200" size={14} />
              </a>

              <a
                href="https://www.linkedin.com/in/aayush-shrestha-550134138"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContactClick('linkedin')}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border 
                           hover:border-secondary hover:shadow-md hover:shadow-secondary/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-secondary/15 rounded-lg flex items-center justify-center group-hover:bg-secondary/25 transition-colors duration-200">
                  <Linkedin className="text-secondary" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-arcade text-xs text-foreground mb-0.5 truncate">LINKEDIN PROFILE</h5>
                  <p className="font-mono text-[11px] text-secondary truncate">linkedin.com/in/aayush-shrestha-550134138/</p>
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-secondary transition-colors duration-200" size={14} />
              </a>

              <a
                href="https://github.com/AayzStha37"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContactClick('github')}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border 
                           hover:border-accent hover:shadow-md hover:shadow-accent/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-accent/15 rounded-lg flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-200">
                  <Github className="text-accent" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-arcade text-xs text-foreground mb-0.5 truncate">CODE REPOSITORY</h5>
                  <p className="font-mono text-[11px] text-accent truncate">github.com/AayzStha37</p>
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-accent transition-colors duration-200" size={14} />
              </a>
            </div>
          </div>

          {/* Preferred contact */}
          <div className="bg-arcade-screen p-4 rounded-lg border border-secondary/30">
            <h5 className="font-arcade text-sm text-secondary mb-2 text-center">📡 PREFERRED CONTACT METHOD</h5>
            <div className="text-center space-y-1">
              <p className="font-mono text-xs text-foreground">For professional inquiries,</p>
              <p className="font-mono text-xs text-primary font-semibold">Email is the fastest way to reach me.</p>
              <p className="font-mono text-[11px] text-muted-foreground mt-2">Response time: Usually within 3 hours</p>
            </div>
          </div>

          {/* CTA + Form */}
          <div className="text-center bg-card p-4 rounded-lg border border-border">
            <h5 className="font-arcade text-sm text-primary mb-3">🚀 READY TO COLLABORATE?</h5>
            <YesNoPrompt>
              {(showForm, setShowForm, selected, setSelected, handleKeyDown, blinking) => (
                <>
                  <div
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className="flex justify-center items-center mb-4 outline-none"
                    aria-label="Ready to collaborate? Choose Yes or No"
                  >
                    <div className="relative flex items-center">
                      {selected === 'yes' && (
                        <span
                          className={`absolute -left-5 text-primary font-arcade text-base ${blinking ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
                          aria-hidden="true"
                        >
                          ▶
                        </span>
                      )}
                      <button
                        type="button"
                        className={`font-arcade text-sm px-4 py-2 rounded transition-colors duration-200 ${
                          selected === 'yes'
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-card text-primary border border-primary'
                        }`}
                        onClick={() => setShowForm(true)}
                        tabIndex={-1}
                      >
                        YES
                      </button>
                    </div>
                  </div>
                  {showForm && (
                  <ContactForm
                  onSent={() => {
                    setShowForm(false);
                    showSuccessToast();
                  }}
                  playSound={playSound}
                  onError={(message) => {
                    setShowForm(false);
                    showErrorToast(message);
                  }}
                  />
                )}
                </>
              )}
            </YesNoPrompt>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="font-arcade text-2xl text-primary mb-4">INSTRUCTIONS</h2>
        <p className="font-mono text-sm text-secondary">
          Download complete documentation and establish communication links
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* CV Download Section */}
        <div className="text-center">
          <div className="bg-card p-8 rounded-lg border-2 border-primary">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="font-arcade text-xl text-primary mb-4">COMPLETE DOCUMENTATION</h3>
            <p className="font-mono text-sm text-foreground mb-6 leading-relaxed">
              Access the full technical specifications, detailed project documentation, 
              and comprehensive skill matrix in the complete CV file.
            </p>
            
            <button
              onClick={handleDownloadCV}
              className="arcade-button px-8 py-4 font-arcade text-lg text-primary-foreground
                       flex items-center gap-3 mx-auto hover:scale-105 transition-all duration-300
                       shadow-lg shadow-primary/30 text-white"
            >
              <Download size={24} />
              DOWNLOAD FULL CV
            </button>
            
            <p className="font-mono text-xs text-muted-foreground mt-4">
              PDF format • Updated {import.meta.env.VITE_GIT_LAST_MODIFIED || '2025-07-31'}
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-4">
          <h4 className="font-arcade text-lg text-secondary text-center mb-6">
            COMMUNICATION CHANNELS
          </h4>
          
          <div className="grid gap-4">
            {/* Email */}
            <a
              href="mailto:saayush97@gmail.com"
              onClick={() => handleContactClick('email')}
              className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border 
                       hover:border-primary hover:shadow-lg hover:shadow-primary/20 
                       transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center
                           group-hover:bg-primary/30 transition-colors duration-300">
                <Mail className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h5 className="font-arcade text-sm text-foreground mb-1">PRIMARY EMAIL</h5>
                <p className="font-mono text-sm text-secondary">saayush97@gmail.com</p>
              </div>
              <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors duration-300" size={16} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/aayush-shrestha-550134138"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick('linkedin')}
              className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border 
                       hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 
                       transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center
                           group-hover:bg-secondary/30 transition-colors duration-300">
                <Linkedin className="text-secondary" size={24} />
              </div>
              <div className="flex-1">
                <h5 className="font-arcade text-sm text-foreground mb-1">LINKEDIN PROFILE</h5>
                <p className="font-mono text-sm text-secondary">linkedin.com/in/aayush-shrestha-550134138/</p>
              </div>
              <ExternalLink className="text-muted-foreground group-hover:text-secondary transition-colors duration-300" size={16} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/AayzStha37"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick('github')}
              className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border 
                       hover:border-accent hover:shadow-lg hover:shadow-accent/20 
                       transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center
                           group-hover:bg-accent/30 transition-colors duration-300">
                <Github className="text-accent" size={24} />
              </div>
              <div className="flex-1">
                <h5 className="font-arcade text-sm text-foreground mb-1">CODE REPOSITORY</h5>
                <p className="font-mono text-sm text-accent">github.com/AayzStha37</p>
              </div>
              <ExternalLink className="text-muted-foreground group-hover:text-accent transition-colors duration-300" size={16} />
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-arcade-screen p-6 rounded-lg border border-secondary/30">
          <h5 className="font-arcade text-md text-secondary mb-4 text-center">
            📡 PREFERRED CONTACT METHOD
          </h5>
          <div className="text-center space-y-2">
            <p className="font-mono text-sm text-foreground">
              For professional inquiries and collaboration opportunities,
            </p>
            <p className="font-mono text-sm text-primary font-semibold">
              Email is the fastest way to reach me.
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-4">
              Response time: Usually within 3 hours
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card p-6 rounded-lg border border-border">
          <h5 className="font-arcade text-lg text-primary mb-3">🚀 READY TO COLLABORATE?</h5>
              {/* Yes/No Option */}
              <YesNoPrompt>
              {(showForm, setShowForm, selected, setSelected, handleKeyDown, blinking) => (
                <>
                <div
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  className="flex justify-center gap-8 items-center mb-6 outline-none"
                  aria-label="Ready to collaborate? Choose Yes or No"
                >
                  <div className="relative flex items-center">
                  {selected === 'yes' && (
                    <span
                    className={`absolute -left-6 text-primary font-arcade text-xl ${blinking ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
                    aria-hidden="true"
                    >
                    ▶
                    </span>
                  )}
                  <button
                    type="button"
                    className={`font-arcade text-lg px-6 py-2 rounded transition-colors duration-200 ${
                    selected === 'yes'
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card text-primary border border-primary'
                    }`}
                    onClick={() => {
                      setShowForm(true);
                      playSound('power-up');
                    }}
                    tabIndex={-1}
                  >
                    YES
                  </button>
                  </div>
                </div>
                {showForm && (
                  <ContactForm
                  onSent={() => {
                    setShowForm(false);
                    showSuccessToast();
                  }}
                  playSound={playSound}
                  onError={(message) => {
                    setShowForm(false);
                    showErrorToast(message);
                  }}
                  />
                )}
                </>
              )}
              </YesNoPrompt>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;