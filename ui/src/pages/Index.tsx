import { useState } from 'react';
import { SoundProvider } from '@/components/SoundManager';
import InsertCoinScreen from '@/components/InsertCoinScreen';
import ArcadeConsole from '@/components/ArcadeConsole';

const Index = () => {
  const [hasInsertedCoin, setHasInsertedCoin] = useState(false);

  const handleCoinInserted = () => {
    setHasInsertedCoin(true);
  };

  return (
    <SoundProvider>
      {!hasInsertedCoin ? (
        <InsertCoinScreen onComplete={handleCoinInserted} />
      ) : (
        <ArcadeConsole />
      )}
    </SoundProvider>
  );
};

export default Index;
