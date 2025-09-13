import { useState, useMemo } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { professionalRoles } from "@/data/professionalData";
import { Timeline } from "./Timeline";
import { ProfessionalCard } from "./ProfessionalCard";
import { SkillFilter } from "./SkillFilter";

export function Professional() {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeRoleId, setActiveRoleId] = useState<number | undefined>();
  const { track } = useTrackEvent();

  // Prepare timeline data
  const timelineRoles = professionalRoles.map(role => ({
    id: role.id,
    period: role.period,
    startYear: role.startYear,
    endYear: role.endYear,
    isOngoing: role.isOngoing
  }));

  // Filter roles based on all criteria
  const filteredRoles = useMemo(() => {
    return professionalRoles.filter(role => {
      // Area filter
      const matchesArea = selectedArea === "All" || role.area.includes(selectedArea);
      
      // Skills filter
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.some(skill => role.technologies.includes(skill));
      
      // Search filter
      const matchesSearch = !searchTerm || 
        role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesArea && matchesSkills && matchesSearch;
    });
  }, [selectedArea, selectedSkills, searchTerm]);

  const handleClearAllFilters = () => {
    setSelectedArea("All");
    setSelectedSkills([]);
    setSearchTerm("");
    setActiveRoleId(undefined);
    track('professional_clear_all_filters');
  };

  return (
    <section id="professional" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Professional Experience
          </h1>
          <p className="text-xl leading-8 text-muted-foreground">
            A journey through my professional career in semiconductor engineering, technology development, and technical sales.
          </p>
        </div>

        {/* Timeline */}
        <Timeline 
          roles={timelineRoles} 
          activeRoleId={activeRoleId} 
        />

        {/* Enhanced Filtering */}
        <div className="mb-12">
          <SkillFilter
            roles={professionalRoles}
            selectedArea={selectedArea}
            selectedSkills={selectedSkills}
            searchTerm={searchTerm}
            onAreaChange={setSelectedArea}
            onSkillsChange={setSelectedSkills}
            onSearchChange={setSearchTerm}
            onClearAll={handleClearAllFilters}
          />
        </div>

        {/* Results Summary */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {filteredRoles.length} of {professionalRoles.length} professional roles
            {selectedArea !== "All" && ` in ${selectedArea}`}
            {selectedSkills.length > 0 && ` with ${selectedSkills.join(', ')}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Professional Roles Grid */}
        <div className="mx-auto max-w-7xl">
          {filteredRoles.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredRoles.map((role, index) => (
                <ProfessionalCard
                  key={role.id}
                  role={role}
                  index={index}
                  isActive={activeRoleId === role.id}
                  onClick={() => setActiveRoleId(activeRoleId === role.id ? undefined : role.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto max-w-md">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No roles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms to find matching professional experience.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}