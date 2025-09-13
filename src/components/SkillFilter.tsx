import { useState, useMemo } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTrackEvent } from '@/hooks/useTrackEvent';

interface SkillFilterProps {
  roles: Array<{
    technologies: string[];
    area: string;
  }>;
  selectedArea: string;
  selectedSkills: string[];
  searchTerm: string;
  onAreaChange: (area: string) => void;
  onSkillsChange: (skills: string[]) => void;
  onSearchChange: (term: string) => void;
  onClearAll: () => void;
}

export function SkillFilter({
  roles,
  selectedArea,
  selectedSkills,
  searchTerm,
  onAreaChange,
  onSkillsChange,
  onSearchChange,
  onClearAll
}: SkillFilterProps) {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const { track } = useTrackEvent();

  const areas = ["All", "Engineering", "Sales"];
  
  // Get all unique skills from roles
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    roles.forEach(role => {
      role.technologies.forEach(tech => skillSet.add(tech));
    });
    return Array.from(skillSet).sort();
  }, [roles]);

  // Get skills available for current area filter
  const availableSkills = useMemo(() => {
    if (selectedArea === "All") return allSkills;
    
    const skillSet = new Set<string>();
    roles
      .filter(role => role.area.includes(selectedArea))
      .forEach(role => {
        role.technologies.forEach(tech => skillSet.add(tech));
      });
    
    return Array.from(skillSet).sort();
  }, [allSkills, roles, selectedArea]);

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    onSkillsChange(newSkills);
    track('skill_filter_toggle', { skill, action: selectedSkills.includes(skill) ? 'remove' : 'add' });
  };

  const handleAreaChange = (area: string) => {
    onAreaChange(area);
    track('area_filter_change', { area });
    
    // Remove skills that are no longer available in the new area
    if (area !== "All") {
      const newAreaSkills = new Set(
        roles
          .filter(role => role.area.includes(area))
          .flatMap(role => role.technologies)
      );
      const validSkills = selectedSkills.filter(skill => newAreaSkills.has(skill));
      if (validSkills.length !== selectedSkills.length) {
        onSkillsChange(validSkills);
      }
    }
  };

  const activeFiltersCount = selectedSkills.length + (selectedArea !== "All" ? 1 : 0) + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search roles, companies, or technologies..."
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
            track('professional_search', { term: e.target.value });
          }}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Area Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Area:</span>
          <div className="inline-flex rounded-lg bg-muted p-1">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => handleAreaChange(area)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  selectedArea === area
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Filter */}
        <Popover open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-muted rounded-md hover:bg-muted/80 transition-colors">
              <Filter className="h-4 w-4" />
              Skills
              {selectedSkills.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {selectedSkills.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="center">
            <div className="p-4 space-y-3">
              <h4 className="font-semibold text-sm">Filter by Skills</h4>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {availableSkills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => onSkillsChange([])}
                  className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all skills
                </button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear All Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear all ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Active Skills Display */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}