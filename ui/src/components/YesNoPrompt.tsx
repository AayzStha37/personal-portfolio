import { useState, useEffect, useCallback, ReactNode } from 'react';
import { useSound } from './SoundManager';

type YesNoOption = 'yes' | 'no';

interface YesNoPromptProps {
  children: (
    showForm: boolean | null,
    setShowForm: (show: boolean | null) => void,
    selected: YesNoOption,
    setSelected: (selected: YesNoOption) => void,
    handleKeyDown: (e: React.KeyboardEvent) => void,
    blinking: boolean
  ) => ReactNode;
}

const YesNoPrompt = ({ children }: YesNoPromptProps) => {
  const [selected, setSelected] = useState<YesNoOption>('yes');
  const [showForm, setShowForm] = useState<boolean | null>(null);
  const [blinking, setBlinking] = useState(true);
  const { playSound } = useSound();

  useEffect(() => {
    const blinker = setInterval(() => {
      setBlinking(prev => !prev);
    }, 500);
    return () => clearInterval(blinker);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && selected === 'yes') {
      playSound('menu-select');
      setSelected('no');
    } else if (e.key === 'ArrowLeft' && selected === 'no') {
      playSound('menu-select');
      setSelected('yes');
    } else if (e.key === 'Enter') {
      playSound('menu-confirm');
      setShowForm(selected === 'yes');
    }
  }, [selected, playSound]);

  return children(showForm, setShowForm, selected, setSelected, handleKeyDown, blinking);
};

export default YesNoPrompt;