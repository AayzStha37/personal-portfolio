import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (soundName: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const initializeAudio = () => {
      if (!isMuted && !audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playTone = (frequency: number, duration: number, startTime: number) => {
          if (!audioContextRef.current || isMuted) return;
          
          const oscillator = audioContextRef.current.createOscillator();
          const gainNode = audioContextRef.current.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);
          
          oscillator.frequency.setValueAtTime(frequency, startTime);
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(0.03, startTime + 0.1);
          gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
          
          oscillator.start(startTime);
          oscillator.stop(startTime + duration);
        };
        
        const playPattern = () => {
          if (!audioContextRef.current || isMuted) return;
          
          const now = audioContextRef.current.currentTime;
          const notes = [330, 370, 394, 330, 294, 330, 394, 440]; // Upbeat arcade melody
          
          notes.forEach((freq, i) => {
            playTone(freq, 0.3, now + i * 0.4);
          });
        };
        
        const startBackgroundMusic = () => {
          if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume();
          }
          
          if (!isMuted) {
            playPattern();
            musicIntervalRef.current = window.setInterval(() => {
              if (!isMuted) {
                playPattern();
              }
            }, 3500);
          }
        };

        // Start music immediately if audio context allows, otherwise wait for user interaction
        if (audioContextRef.current.state === 'running') {
          startBackgroundMusic();
        } else {
          const startMusic = () => {
            startBackgroundMusic();
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keydown', startMusic);
          };
          
          document.addEventListener('click', startMusic);
          document.addEventListener('keydown', startMusic);
        }
      }
    };

    if (!isMuted) {
      initializeAudio();
    } else {
      // Stop music when muted
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
    }

    return () => {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [isMuted]);

  const playSound = (soundName: string) => {
    if (isMuted) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different sound profiles for different actions
      const soundProfiles: Record<string, { frequency: number; duration: number; type: OscillatorType }> = {
        'coin-drop': { frequency: 329, duration: 0.6, type: 'sine' },
        'menu-bleep': { frequency: 523, duration: 0.1, type: 'square' },
        'menu-confirm': { frequency: 784, duration: 0.2, type: 'triangle' },
        'item-collect': { frequency: 1047, duration: 0.15, type: 'sawtooth' },
        'game-over': { frequency: 130, duration: 1, type: 'sine' },
        'power-up': { frequency: 1568, duration: 0.3, type: 'triangle' },
        'submit-form-success': { frequency: 880, duration: 0.25, type: 'triangle' },
        'submit-form-error': { frequency: 196, duration: 0.4, type: 'sawtooth' }
      };
      
      const profile = soundProfiles[soundName] || soundProfiles['menu-bleep'];
      
      oscillator.frequency.setValueAtTime(profile.frequency, audioContext.currentTime);
      oscillator.type = profile.type;
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + profile.duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + profile.duration);
      
      // Clean up
      setTimeout(() => audioContext.close(), profile.duration * 1000 + 100);
    } catch (error) {
      console.log('Sound playback failed:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 bg-arcade-console border-2 border-primary rounded-lg 
                   text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </SoundContext.Provider>
  );
};