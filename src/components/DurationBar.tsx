import { useMemo } from 'react';

interface DurationBarProps {
  startDate: string;
  endDate: string;
  maxDurationMonths?: number;
}

export function DurationBar({ startDate, endDate, maxDurationMonths = 48 }: DurationBarProps) {
  const duration = useMemo(() => {
    const parseDate = (dateStr: string) => {
      // Handle "Currently ongoing" case
      if (dateStr.includes('Currently ongoing')) {
        return new Date();
      }
      
      // Parse "Month Year" format
      const [month, year] = dateStr.split(' ');
      const monthIndex = new Date(Date.parse(month +" 1, 2012")).getMonth();
      return new Date(parseInt(year), monthIndex);
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    
    const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
                        (end.getMonth() - start.getMonth());
    
    return Math.max(0, diffInMonths);
  }, [startDate, endDate]);

  const percentage = Math.min((duration / maxDurationMonths) * 100, 100);
  const isOngoing = endDate.includes('Currently ongoing');

  const formatDuration = (months: number) => {
    if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} year${years === 1 ? '' : 's'}`;
    }
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Duration</span>
        <span className="text-foreground font-medium">
          {formatDuration(duration)}
          {isOngoing && ' (ongoing)'}
        </span>
      </div>
      <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out rounded-full ${
            isOngoing 
              ? 'bg-gradient-to-r from-primary to-green-500 animate-pulse-glow' 
              : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
        {isOngoing && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-in-right opacity-50" />
        )}
      </div>
    </div>
  );
}