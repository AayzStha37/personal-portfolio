import { useState, useEffect, useCallback } from 'react';
import { useSound } from './SoundManager';
import { useIsMobile } from '../hooks/use-mobile';

interface InsertCoinScreenProps {
  onComplete: () => void;
}

const InsertCoinScreen = ({ onComplete }: InsertCoinScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { playSound } = useSound();
  const isMobile = useIsMobile();

  const handleInsertCoin = useCallback(() => {
    playSound('coin-drop');
    setIsLoading(true);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete(); // Delayed for blinking effect
          }, 2000); // ← Delay for blinking "READY PLAYER ONE"
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  }, [onComplete, playSound]);


  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading) {
        handleInsertCoin();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLoading, handleInsertCoin]);

  if (isLoading) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center bg-background p-4">

        
        <div className="flex flex-col items-center space-y-8">
          <h1 className="font-arcade text-2xl md:text-4xl text-primary mb-6 md:mb-8 text-center">
            LOADING PORTFOLIO
          </h1>
          
          <div className={`bg-arcade-console border-2 border-primary rounded-lg p-4 ${isMobile ? 'w-full max-w-xs' : 'w-80'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-arcade text-xs text-foreground">PROGRESS</span>
              <span className="font-arcade text-xs text-primary">{progress}%</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 md:h-3 border border-border">
              <div 
                className="loading-bar h-full rounded-full transition-all duration-100 ease-out"
                style={{
                  background: '#FFD700',
                  animation: 'none',
                  width: `${progress}%`
                }}
              />
            </div>
          </div>
          
          {progress === 100 && (
            <div className="font-arcade text-base md:text-lg text-secondary animate-pulse">
              READY PLAYER ONE
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-background p-4">
      
      
      <div className="text-center space-y-8">
        <h1 className="font-arcade text-3xl md:text-6xl text-foreground mb-6 md:mb-8">
           AAYUSH SHRESTHA
        </h1>
        
        <h2 className="font-arcade text-base md:text-2xl text-secondary mb-8 md:mb-12">
          SOFTWARE ENGINEER/DEVELOPER 
        </h2>
        
        <div className="flex items-center justify-center space-x-4">
          {/* Mario Coin Animation */}
          <span className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img
              src="/mario-coin.gif"
              alt="Mario Coin"
              className="animate-spin-slow w-10 h-10"
              style={{ animation: 'spin 1.2s linear infinite' }}
            />
          </span>
          <button
            onClick={handleInsertCoin}
            className="insert-coin font-arcade text-lg md:text-3xl text-primary cursor-pointer 
                 bg-transparent border-none hover:scale-105 transition-transform duration-300
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
                 focus:ring-offset-background"
          >
            INSERT COIN
          </button>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotateY(0deg);}
              100% { transform: rotateY(360deg);}
            }
            .animate-spin-slow {
              animation: spin 1.2s linear infinite;
            }
          `}
        </style>
        
  <p className="font-mono text-xs md:text-sm text-muted-foreground mt-6 md:mt-8">
          Click or press ENTER to start
        </p>
      </div>
    </div>
  );
};

export default InsertCoinScreen;