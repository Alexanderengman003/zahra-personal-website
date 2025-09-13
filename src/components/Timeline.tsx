import { Calendar, Clock } from 'lucide-react';

interface TimelineProps {
  roles: Array<{
    id: number;
    period: string;
    startYear: number;
    endYear: number | null;
    isOngoing: boolean;
  }>;
  activeRoleId?: number;
}

export function Timeline({ roles, activeRoleId }: TimelineProps) {
  const currentYear = new Date().getFullYear();
  const earliestYear = Math.min(...roles.map(role => role.startYear));
  const totalYears = currentYear - earliestYear + 1;

  const calculatePosition = (year: number) => {
    return ((year - earliestYear) / totalYears) * 100;
  };

  return (
    <div className="relative mb-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Career Timeline
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {earliestYear} - Present ({totalYears} years in tech)
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative h-16 mx-8 mb-4">
        {/* Main timeline line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-muted via-primary/50 to-primary rounded-full" />
        
        {/* Year markers */}
        <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          {Array.from({ length: Math.ceil(totalYears / 2) }, (_, i) => {
            const year = earliestYear + (i * 2);
            return (
              <div key={year} className="flex flex-col items-center">
                <Calendar className="h-3 w-3 mb-1" />
                <span>{year}</span>
              </div>
            );
          })}
          <div className="flex flex-col items-center">
            <Calendar className="h-3 w-3 mb-1" />
            <span>{currentYear}</span>
          </div>
        </div>

        {/* Role timeline dots */}
        {roles.map((role) => {
          const startPosition = calculatePosition(role.startYear);
          const endPosition = role.endYear ? calculatePosition(role.endYear) : 100;
          const isActive = activeRoleId === role.id;
          
          return (
            <div key={role.id} className="absolute top-6">
              {/* Role duration bar */}
              <div 
                className={`absolute h-3 rounded-full transition-all duration-500 ${
                  role.isOngoing 
                    ? 'bg-gradient-to-r from-primary to-green-500 animate-pulse-glow' 
                    : isActive 
                      ? 'bg-primary shadow-glow' 
                      : 'bg-primary/70 hover:bg-primary'
                }`}
                style={{ 
                  left: `${startPosition}%`, 
                  width: `${endPosition - startPosition}%`,
                  minWidth: '8px'
                }}
              />
              
              {/* Start dot */}
              <div 
                className={`absolute w-2 h-2 rounded-full -translate-y-1 transition-all duration-300 ${
                  isActive ? 'bg-primary ring-2 ring-primary/20 scale-150' : 'bg-card border-2 border-primary'
                }`}
                style={{ left: `${startPosition}%` }}
              />
              
              {/* End dot (if not ongoing) */}
              {!role.isOngoing && (
                <div 
                  className={`absolute w-2 h-2 rounded-full -translate-y-1 transition-all duration-300 ${
                    isActive ? 'bg-primary ring-2 ring-primary/20 scale-150' : 'bg-card border-2 border-primary'
                  }`}
                  style={{ left: `${endPosition}%` }}
                />
              )}
            </div>
          );
        })}
        
        {/* Current time indicator */}
        <div 
          className="absolute w-0.5 h-8 bg-green-500 top-4 animate-pulse-glow"
          style={{ left: '100%', transform: 'translateX(-50%)' }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}