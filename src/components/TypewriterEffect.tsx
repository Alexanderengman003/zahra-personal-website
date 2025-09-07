import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
}

export const TypewriterEffect = ({ text, speed = 100, className = '' }: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Add natural variation to writing speed (pen-like)
      const baseSpeed = speed;
      const variation = Math.random() * 50 - 25; // ±25ms variation
      const currentSpeed = Math.max(50, baseSpeed + variation);
      
      // Slower for spaces (like lifting the pen)
      const isSpace = text[currentIndex] === ' ';
      const finalSpeed = isSpace ? currentSpeed + 100 : currentSpeed;

      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, finalSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-primary opacity-70 ml-1">✒️</span>
      )}
    </span>
  );
};