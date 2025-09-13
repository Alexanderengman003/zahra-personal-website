import { useState } from 'react';
import { MapPin, Calendar, Building, ChevronDown, ChevronUp, ExternalLink, Award } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';
import { DurationBar } from './DurationBar';
import { Card, CardContent } from '@/components/ui/card';
import { useTrackEvent } from '@/hooks/useTrackEvent';

interface ProfessionalCardProps {
  role: {
    id: number;
    title: string;
    company: string;
    location: string;
    period: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies: string[];
    achievements: string[];
    area: string;
    companyUrl?: string;
    metrics?: Array<{
      label: string;
      value: string;
      icon?: string;
    }>;
    responsibilities?: string[];
  };
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function ProfessionalCard({ role, index, isActive = false, onClick }: ProfessionalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { track } = useTrackEvent();

  const isOngoing = role.period.includes("Currently ongoing");
  
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    track('professional_card_expand', { 
      company: role.company, 
      title: role.title,
      expanded: !isExpanded 
    });
  };

  const handleCompanyClick = () => {
    if (role.companyUrl) {
      track('professional_company_click', { 
        company: role.company,
        url: role.companyUrl 
      });
      window.open(role.companyUrl, '_blank');
    }
  };

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 hover:shadow-large cursor-pointer ${
        isActive ? 'ring-2 ring-primary shadow-glow scale-105' : 'hover:scale-102'
      } ${isOngoing ? 'border-green-500/30 bg-gradient-to-br from-card to-green-50/5' : ''}`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'fade-up 0.6s ease-out both'
      }}
      onClick={onClick}
    >
      {/* Ongoing indicator */}
      {isOngoing && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="relative">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75" />
            <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full" />
          </div>
          <span className="absolute -bottom-6 right-0 text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
            Current Role
          </span>
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CompanyLogo company={role.company} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {role.title}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompanyClick();
                }}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group/company"
              >
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">{role.company}</span>
                {role.companyUrl && <ExternalLink className="h-3 w-3 opacity-0 group-hover/company:opacity-100 transition-opacity" />}
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{role.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{role.period}</span>
            </div>
          </div>

          {/* Duration Bar */}
          <DurationBar 
            startDate={role.startDate} 
            endDate={role.endDate}
          />
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {role.description}
        </p>

        {/* Metrics (if available) */}
        {role.metrics && role.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {role.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-2 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-primary">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Technologies & Skills</h4>
          <div className="flex flex-wrap gap-2">
            {role.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable content */}
        <div className="space-y-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExpand();
            }}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            <Award className="h-4 w-4" />
            <span>Key Achievements</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {/* Achievements - Expandable */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-16 opacity-70'
          }`}>
            <ul className="space-y-2">
              {role.achievements.map((achievement, achievementIndex) => (
                <li
                  key={achievementIndex}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
            
            {!isExpanded && role.achievements.length > 2 && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            )}
          </div>

          {/* Responsibilities - Only show when expanded */}
          {isExpanded && role.responsibilities && (
            <div className="pt-2 border-t border-border/50">
              <h5 className="text-sm font-medium text-foreground mb-2">Core Responsibilities</h5>
              <ul className="space-y-1">
                {role.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}