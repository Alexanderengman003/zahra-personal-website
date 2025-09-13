import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ascilionLogo from "@/assets/ascilion-logo.png";
import brightDayGrapheneLogo from "@/assets/bright-day-graphene-logo.png";
import exegerLogo from "@/assets/exeger-logo.png";
import ebvLogo from "@/assets/ebv-logo.png";

interface CompanyLogoProps {
  company: string;
  size?: 'sm' | 'md' | 'lg';
  showHover?: boolean;
}

interface CompanyInfo {
  logo: string;
  description: string;
  website: string;
  brandColor: string;
  darkMode?: boolean;
}

const companyData: Record<string, CompanyInfo> = {
  "EBV Elektronik": {
    logo: ebvLogo,
    description: "Leading European distributor of semiconductors and electronic components",
    website: "https://www.ebv.com",
    brandColor: "hsl(220 100% 50%)",
  },
  "Exeger Operations AB": {
    logo: exegerLogo,
    description: "Revolutionary solar cell technology company developing flexible solar cells",
    website: "https://www.exeger.com",
    brandColor: "hsl(142 71% 45%)",
    darkMode: true, // Needs invert in dark mode
  },
  "Ascilion AB": {
    logo: ascilionLogo,
    description: "Medical technology and semiconductor testing solutions provider",
    website: "https://www.ascilion.se",
    brandColor: "hsl(210 100% 45%)",
  },
  "Bright Day Graphene AB": {
    logo: brightDayGrapheneLogo,
    description: "Advanced materials company specializing in graphene manufacturing",
    website: "https://www.brightdaygraphene.com",
    brandColor: "hsl(45 100% 50%)",
  },
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
};

export function CompanyLogo({ company, size = 'md', showHover = true }: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false);
  const companyInfo = companyData[company];
  
  if (!companyInfo || imageError) {
    return (
      <div className={`${sizeClasses[size]} rounded-sm bg-muted flex items-center justify-center`}>
        <span className="text-xs font-bold text-muted-foreground">
          {company.charAt(0)}
        </span>
      </div>
    );
  }

  const logoElement = (
    <div className="relative group">
      <img 
        src={companyInfo.logo}
        alt={company}
        className={`${sizeClasses[size]} rounded-sm object-contain transition-all duration-300 group-hover:scale-110 ${
          companyInfo.darkMode ? 'dark:invert' : ''
        }`}
        onError={() => setImageError(true)}
        loading="lazy"
      />
      <div 
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ backgroundColor: companyInfo.brandColor }}
      />
    </div>
  );

  if (!showHover) {
    return logoElement;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          {logoElement}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img 
              src={companyInfo.logo}
              alt={company}
              className={`h-8 w-8 rounded object-contain ${companyInfo.darkMode ? 'dark:invert' : ''}`}
            />
            <div>
              <h4 className="font-semibold text-sm">{company}</h4>
              <a 
                href={companyInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Visit website →
              </a>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {companyInfo.description}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}