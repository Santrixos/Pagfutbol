import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TEAM_CONFIGS, type TeamConfig } from "@/lib/team-config";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Team } from "@shared/schema";

interface TeamSelectorProps {
  onTeamSelect: (teamConfig: TeamConfig) => void;
}

export default function TeamSelector({ onTeamSelect }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: teams } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });

  const handleTeamClick = (teamSlug: string) => {
    const teamConfig = TEAM_CONFIGS[teamSlug];
    if (teamConfig) {
      setSelectedTeam(teamSlug);
      setIsAnimating(true);
      setTimeout(() => {
        onTeamSelect(teamConfig);
      }, 800);
    }
  };

  // Create a mexican flag animated background
  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll('.flag-stripe');
      elements.forEach((el, i) => {
        (el as HTMLElement).style.animationDelay = `${i * 0.2}s`;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Mexican Flag Background */}
      <div className="absolute inset-0">
        <div className="flag-stripe absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-20 animate-pulse"></div>
        <div className="flag-stripe absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="flag-stripe absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Football pattern overlay */}
      <div className="absolute inset-0 football-bg opacity-5"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 flex items-center justify-center p-4">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-green-400 via-white via-red-500 to-green-400 bg-clip-text text-transparent animate-pulse">
                LIGA MX
              </h1>
              <div className="h-2 bg-gradient-to-r from-green-500 via-white to-red-500 rounded-full mx-auto mb-4"></div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Mexican Football Style
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Elige tu equipo favorito y personaliza tu experiencia
            </p>
          </div>

          {/* Team Selection */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-600/50 shadow-2xl">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-red-500 bg-clip-text text-transparent">
                ¿A qué equipo le vas?
              </h3>
              <p className="text-gray-400 text-lg">
                Selecciona tu equipo para obtener una experiencia personalizada con los colores oficiales
              </p>
            </div>
            
            {/* Teams Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
              {Object.values(TEAM_CONFIGS).map((team) => (
                <Card
                  key={team.slug}
                  className={`team-card group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                    selectedTeam === team.slug ? 'scale-110 -translate-y-2 ring-4 ring-white' : ''
                  } ${isAnimating && selectedTeam === team.slug ? 'animate-bounce' : ''}`}
                  onClick={() => handleTeamClick(team.slug)}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-90`}></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <CardContent className="relative p-6 text-center">
                    {/* Team icon/emoji */}
                    <div className="mb-4">
                      <div className="text-4xl md:text-5xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                        {team.icon}
                      </div>
                    </div>
                    
                    {/* Team name */}
                    <h4 className="font-black text-white text-sm md:text-base mb-1 drop-shadow-lg">
                      {team.name}
                    </h4>
                    <p className="text-xs text-white/90 font-medium drop-shadow">
                      {team.nickname}
                    </p>
                    
                    {/* Selection indicator */}
                    {selectedTeam === team.slug && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Footer info */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm mb-4">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Colores oficiales
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Contenido personalizado
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Datos en vivo
                </span>
              </div>
              
              {teams && (
                <p className="text-gray-500 text-xs">
                  {teams.length} equipos disponibles • Liga MX Clausura 2024
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay when team is selected */}
      {isAnimating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-white text-xl font-bold">Preparando tu experiencia...</p>
            {selectedTeam && (
              <p className="text-gray-300 mt-2">
                {TEAM_CONFIGS[selectedTeam]?.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
