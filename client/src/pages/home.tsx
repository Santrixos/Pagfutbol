import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import TeamSelector from "@/components/team-selector";
import LiveMatches from "@/components/live-matches";
import StandingsTable from "@/components/standings-table";
import FixturesPanel from "@/components/fixtures-panel";
import { type TeamConfig, hexToHsl } from "@/lib/team-config";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<TeamConfig | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load selected team from localStorage
  useEffect(() => {
    const savedTeam = localStorage.getItem('selectedTeam');
    if (savedTeam) {
      try {
        setSelectedTeam(JSON.parse(savedTeam));
      } catch (error) {
        console.error('Error loading saved team:', error);
      }
    }
  }, []);

  // Save selected team to localStorage
  useEffect(() => {
    if (selectedTeam) {
      localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));
      applyTeamTheming(selectedTeam);
    }
  }, [selectedTeam]);

  const scrapeMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/scrape"),
    onSuccess: () => {
      toast({
        title: "Data Updated",
        description: "Football data has been refreshed successfully",
      });
      // Invalidate all queries to refetch data
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update football data",
        variant: "destructive",
      });
    },
  });

  const applyTeamTheming = (team: TeamConfig) => {
    const root = document.documentElement;
    
    // Convert hex colors to HSL for CSS variables
    const primaryHsl = hexToHsl(team.primaryColor);
    const secondaryHsl = hexToHsl(team.secondaryColor);
    
    // Update CSS custom properties
    root.style.setProperty('--team-primary', primaryHsl);
    root.style.setProperty('--team-secondary', secondaryHsl);
    root.style.setProperty('--team-primary-hex', team.primaryColor);
    root.style.setProperty('--team-secondary-hex', team.secondaryColor);
    
    // Update page title
    document.title = `${team.name} - Mexican Football Style`;
  };

  const handleTeamSelect = (team: TeamConfig) => {
    setSelectedTeam(team);
  };

  const handleChangeTeam = () => {
    setSelectedTeam(null);
    localStorage.removeItem('selectedTeam');
    
    // Reset theming
    const root = document.documentElement;
    root.style.removeProperty('--team-primary');
    root.style.removeProperty('--team-secondary');
    root.style.removeProperty('--team-primary-hex');
    root.style.removeProperty('--team-secondary-hex');
    
    document.title = "Mexican Football Style - Liga MX Live";
  };

  if (!selectedTeam) {
    return <TeamSelector onTeamSelect={handleTeamSelect} />;
  }

  return (
    <div className="min-h-screen transition-all duration-500 relative">
      {/* Dynamic background based on selected team */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${selectedTeam.primaryColor}20, ${selectedTeam.secondaryColor}20)`
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: selectedTeam.primaryColor }}
              >
                <i 
                  className={`${selectedTeam.icon} text-xl`}
                  style={{ color: selectedTeam.secondaryColor }}
                ></i>
              </div>
              <div>
                <h1 className="text-xl font-bold">Mexican Football Style</h1>
                <p className="text-sm text-gray-400">{selectedTeam.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => scrapeMutation.mutate()}
                disabled={scrapeMutation.isPending}
                variant="outline"
                size="sm"
                className="border-gray-600 hover:bg-gray-700"
              >
                <i className={`fas ${scrapeMutation.isPending ? 'fa-spinner fa-spin' : 'fa-sync'} mr-2`}></i>
                {scrapeMutation.isPending ? 'Updating...' : 'Refresh Data'}
              </Button>
              <Button
                onClick={handleChangeTeam}
                size="sm"
                style={{ 
                  backgroundColor: selectedTeam.primaryColor,
                  color: selectedTeam.secondaryColor
                }}
                className="hover:opacity-90"
              >
                Change Team
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Matches Section */}
        <LiveMatches />

        {/* Standings and Fixtures Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Liga MX Standings */}
          <div className="xl:col-span-2">
            <StandingsTable selectedTeamSlug={selectedTeam.slug} />
          </div>

          {/* Fixtures and Top Scorers Panel */}
          <div>
            <FixturesPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
