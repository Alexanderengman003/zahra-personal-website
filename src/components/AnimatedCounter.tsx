import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}

export const AnimatedCounter = ({ 
  end, 
  duration = 1000, 
  delay = 0, 
  suffix = '' 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;
      
      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = Math.round(startValue + (end - startValue) * easedProgress);
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return <span>{count}{suffix}</span>;
};