import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type MatchWithTeams, type PlayerWithTeam } from "@shared/schema";
import { TEAM_CONFIGS } from "@/lib/team-config";

export default function FixturesPanel() {
  const { data: upcomingMatches, isLoading: matchesLoading } = useQuery<MatchWithTeams[]>({
    queryKey: ["/api/matches/upcoming"],
  });

  const { data: topScorers, isLoading: scorersLoading } = useQuery<PlayerWithTeam[]>({
    queryKey: ["/api/players/top-scorers"],
  });

  const formatDateTime = (date: string | Date) => {
    const matchDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const timeString = matchDate.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });

    if (matchDate.toDateString() === today.toDateString()) {
      return `Today ${timeString}`;
    } else if (matchDate.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow ${timeString}`;
    } else {
      return matchDate.toLocaleDateString('es-MX', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Next Fixtures */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-bold flex items-center">
            <i className="fas fa-calendar-alt text-blue-500 mr-3"></i>
            Next Fixtures
          </h3>
        </div>
        
        <CardContent className="p-6">
          {matchesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : upcomingMatches && upcomingMatches.length > 0 ? (
            <div className="space-y-4">
              {upcomingMatches.slice(0, 5).map((match) => {
                const homeColors = getTeamColors(match.homeTeam.slug);
                const awayColors = getTeamColors(match.awayTeam.slug);
                
                return (
                  <div key={match.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: homeColors.primary }}
                      >
                        <i 
                          className={`${getTeamIcon(match.homeTeam.slug)} text-xs`}
                          style={{ color: homeColors.secondary }}
                        ></i>
                      </div>
                      <span className="text-xs font-medium">vs</span>
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: awayColors.primary }}
                      >
                        <i 
                          className={`${getTeamIcon(match.awayTeam.slug)} text-xs`}
                          style={{ color: awayColors.secondary }}
                        ></i>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {match.homeTeam.nickname} vs {match.awayTeam.nickname}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDateTime(match.matchDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No upcoming fixtures available</p>
          )}
        </CardContent>
      </Card>

      {/* Top Scorers */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-bold flex items-center">
            <i className="fas fa-futbol text-green-500 mr-3"></i>
            Top Scorers
          </h3>
        </div>
        
        <CardContent className="p-6">
          {scorersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-6" />
                </div>
              ))}
            </div>
          ) : topScorers && topScorers.length > 0 ? (
            <div className="space-y-3">
              {topScorers.slice(0, 5).map((player, index) => {
                const teamColors = getTeamColors(player.team.slug);
                
                return (
                  <div key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: teamColors.primary }}
                      >
                        <span 
                          className="text-xs font-bold"
                          style={{ color: teamColors.secondary }}
                        >
                          {player.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{player.name}</p>
                        <p className="text-xs text-gray-400">{player.team.nickname}</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-400">{player.goals}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No scorer data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
