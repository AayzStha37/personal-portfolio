import { useState, useEffect } from 'react';
import { useSound } from './SoundManager';
import SpaceshipBackground from './SpaceshipBackground';

interface InsertCoinScreenProps {
  onComplete: () => void;
}

const InsertCoinScreen = ({ onComplete }: InsertCoinScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { playSound } = useSound();

  const handleInsertCoin = () => {
    playSound('coin-drop');
    setIsLoading(true);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading) {
        handleInsertCoin();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <SpaceshipBackground />
        
        <div className="flex flex-col items-center space-y-8">
          <h1 className="font-arcade text-2xl md:text-4xl text-primary mb-8 text-center">
            LOADING PORTFOLIO
          </h1>
          
          <div className="w-80 bg-arcade-console border-2 border-primary rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-arcade text-xs text-foreground">PROGRESS</span>
              <span className="font-arcade text-xs text-primary">{progress}%</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3 border border-border">
              <div 
                className="loading-bar h-full rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {progress === 100 && (
            <div className="font-arcade text-lg text-secondary animate-pulse">
              READY PLAYER ONE
            </div>
          )}
        </div>
      </div>
    );
  }

  // The rest of your component remains the same...
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SpaceshipBackground />
      
      <div className="text-center space-y-8">
        <h1 className="font-arcade text-3xl md:text-6xl text-foreground mb-8">
           [AAYUSH SHRESTHA]
        </h1>
        
        <h2 className="font-arcade text-lg md:text-2xl text-secondary mb-12">
          FULL STACK DEVELOPER
        </h2>
        
        <button
          onClick={handleInsertCoin}
          className="insert-coin font-arcade text-xl md:text-3xl text-primary cursor-pointer 
                     bg-transparent border-none hover:scale-105 transition-transform duration-300
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
                     focus:ring-offset-background"
        >
          INSERT COIN
        </button>
        
        <p className="font-mono text-sm text-muted-foreground mt-8">
          Click or press ENTER to start
        </p>
      </div>
    </div>
  );
};

export default InsertCoinScreen;