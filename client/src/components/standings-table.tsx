import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type StandingWithTeam } from "@shared/schema";
import { TEAM_CONFIGS } from "@/lib/team-config";

interface StandingsTableProps {
  selectedTeamSlug?: string;
}

export default function StandingsTable({ selectedTeamSlug }: StandingsTableProps) {
  const { data: standings, isLoading } = useQuery<StandingWithTeam[]>({
    queryKey: ["/api/standings"],
  });

  if (isLoading) {
    return (
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Skeleton className="h-6 w-6 mr-3" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTeamIcon = (teamSlug: string) => {
    const config = TEAM_CONFIGS[teamSlug];
    return config?.icon || "fas fa-futbol";
  };

  const getTeamColors = (teamSlug: string) => {
    const config = TEAM_CONFIGS[teamSlug];
    return {
      primary: config?.primaryColor || "#6B7280",
      secondary: config?.secondaryColor || "#FFFFFF"
    };
  };

  const getPositionIndicator = (position: number) => {
    if (position <= 4) return "bg-green-500"; // Playoffs
    if (position <= 12) return "bg-blue-500"; // Repechaje
    return "bg-gray-500"; // Safe
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold flex items-center">
          <i className="fas fa-trophy text-yellow-500 mr-3"></i>
          Liga MX Standings
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3">Pos</th>
              <th className="px-6 py-3">Team</th>
              <th className="px-6 py-3 text-center">MP</th>
              <th className="px-6 py-3 text-center">W</th>
              <th className="px-6 py-3 text-center">D</th>
              <th className="px-6 py-3 text-center">L</th>
              <th className="px-6 py-3 text-center">GD</th>
              <th className="px-6 py-3 text-center">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {standings && standings.length > 0 ? (
              standings.map((standing, index) => {
                const teamColors = getTeamColors(standing.team.slug);
                const isSelectedTeam = selectedTeamSlug === standing.team.slug;
                
                return (
                  <tr 
                    key={standing.id} 
                    className={`hover:bg-gray-700/30 transition-colors ${
                      isSelectedTeam ? 'bg-yellow-500/10 border-l-4 border-yellow-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-6 ${getPositionIndicator(standing.position)} rounded mr-3`}></div>
                        <span className="font-bold">{standing.position}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: teamColors.primary }}
                        >
                          <i 
                            className={`${getTeamIcon(standing.team.slug)} text-xs`}
                            style={{ color: teamColors.secondary }}
                          ></i>
                        </div>
                        <span className={`font-medium ${isSelectedTeam ? 'text-yellow-400' : 'text-white'}`}>
                          {standing.team.nickname}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{standing.matchesPlayed}</td>
                    <td className="px-6 py-4 text-center text-green-400">{standing.wins}</td>
                    <td className="px-6 py-4 text-center text-yellow-400">{standing.draws}</td>
                    <td className="px-6 py-4 text-center text-red-400">{standing.losses}</td>
                    <td className="px-6 py-4 text-center">
                      {standing.goalDifference >= 0 ? '+' : ''}{standing.goalDifference}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-green-400">{standing.points}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                  No standings data available. Try refreshing the data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
