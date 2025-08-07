import { Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useSound } from './SoundManager';
import YesNoPrompt from './YesNoPrompt'; 
import { ContactForm } from './ContactForm'; 
const ContactSection = () => {
  const { playSound } = useSound();

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

  function showSuccessPopup(arg0: boolean) {
    const popup = document.createElement('div');
    popup.innerText = 'Instructions sent!';
    popup.style.position = 'fixed';
    popup.style.top = '40%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = '#18181b';
    popup.style.color = '#FFD700';
    popup.style.fontFamily = '"Press Start 2P", "Arcade", monospace';
    popup.style.fontSize = '1.25rem';
    popup.style.padding = '2rem 3rem';
    popup.style.border = '3px solid #FFD700';
    popup.style.borderRadius = '1rem';
    popup.style.boxShadow = '0 8px 32px #a3e63555';
    popup.style.zIndex = '9999';
    popup.style.textAlign = 'center';
    popup.style.letterSpacing = '0.05em';
    popup.style.textShadow = '0 2px 8px #a3e63577';

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.transition = 'opacity 0.5s';
      popup.style.opacity = '0';
      setTimeout(() => {
      document.body.removeChild(popup);
      }, 500);
    }, 1800);
  }

  function showErrorPopup(message: string) {
    const popup = document.createElement('div');
    popup.innerText = message;
    popup.style.position = 'fixed';
    popup.style.top = '40%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = '#18181b';
    popup.style.color = '#ef4444'; 
    popup.style.fontFamily = '"Press Start 2P", "Arcade", monospace';
    popup.style.fontSize = '1.25rem';
    popup.style.padding = '2rem 3rem';
    popup.style.border = '3px solid #ef4444'; 
    popup.style.borderRadius = '1rem';
    popup.style.boxShadow = '0 8px 32px #ef444455'; 
    popup.style.zIndex = '9999';
    popup.style.textAlign = 'center';
    popup.style.letterSpacing = '0.05em';
    popup.style.textShadow = '0 2px 8px #ef444477'; 

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.transition = 'opacity 0.5s';
      popup.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 500);
    }, 2500); // Longer timeout for error messages
  }

  return (
    <div className="crt-screen p-6">
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
                    showSuccessPopup(true);
                  }}
                  onError={(message) => {
                    setShowForm(false);
                    showErrorPopup(message);
                  }}
                  playSound={playSound}
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