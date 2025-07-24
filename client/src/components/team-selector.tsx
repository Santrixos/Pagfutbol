import { useState } from "react";
import { TEAM_CONFIGS, type TeamConfig } from "@/lib/team-config";
import { Card, CardContent } from "@/components/ui/card";

interface TeamSelectorProps {
  onTeamSelect: (teamConfig: TeamConfig) => void;
}

export default function TeamSelector({ onTeamSelect }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamClick = (teamSlug: string) => {
    const teamConfig = TEAM_CONFIGS[teamSlug];
    if (teamConfig) {
      setSelectedTeam(teamSlug);
      setTimeout(() => {
        onTeamSelect(teamConfig);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-red-500 to-white bg-clip-text text-transparent">
            MEXICAN FOOTBALL STYLE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Choose your Liga MX team and experience personalized football
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-green-400">¿A qué equipo le vas?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {Object.values(TEAM_CONFIGS).map((team) => (
              <Card
                key={team.slug}
                className={`team-card bg-gradient-to-br ${team.gradient} hover:scale-105 transform transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-current ${
                  selectedTeam === team.slug ? 'scale-95' : ''
                }`}
                onClick={() => handleTeamClick(team.slug)}
                style={{
                  borderColor: selectedTeam === team.slug ? team.primaryColor : 'transparent'
                }}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
                      <i className={`${team.icon} text-2xl`} style={{ color: team.primaryColor }}></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base">{team.name}</h3>
                    <p className="text-xs text-white/80 mt-1">{team.nickname}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-gray-400 text-sm">
            Select your team to personalize your experience with official colors and content
          </p>
        </div>
      </div>
    </div>
  );
}
