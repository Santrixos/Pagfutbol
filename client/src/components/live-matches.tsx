import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type MatchWithTeams } from "@shared/schema";
import { TEAM_CONFIGS } from "@/lib/team-config";

export default function LiveMatches() {
  const { data: liveMatches, isLoading } = useQuery<MatchWithTeams[]>({
    queryKey: ["/api/matches/live"],
    refetchInterval: 30000, // Refresh every 30 seconds for live matches
  });

  const { data: upcomingMatches } = useQuery<MatchWithTeams[]>({
    queryKey: ["/api/matches/upcoming"],
  });

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="fas fa-broadcast-tower text-red-500 mr-3"></i>
            Live Matches
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-20 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  const displayMatches = liveMatches && liveMatches.length > 0 ? liveMatches : upcomingMatches?.slice(0, 3) || [];

  const formatTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTeamIcon = (teamSlug: string) => {
    const config = TEAM_CONFIGS[teamSlug];
    return config?.icon || "fas fa-futbol";
  };

  const getTeamColors = (teamSlug: string) => {
    const config = TEAM_CONFIGS[teamSlug];
    return {
      primary: config?.primaryColor || "#gray",
      secondary: config?.secondaryColor || "#white"
    };
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <i className="fas fa-broadcast-tower text-red-500 mr-3"></i>
          {liveMatches && liveMatches.length > 0 ? "Live Matches" : "Next Matches"}
        </h2>
        {liveMatches && liveMatches.length > 0 && (
          <div className="flex items-center text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm">LIVE</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayMatches.length > 0 ? (
          displayMatches.map((match) => {
            const homeColors = getTeamColors(match.homeTeam.slug);
            const awayColors = getTeamColors(match.awayTeam.slug);
            
            return (
              <Card 
                key={match.id} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-red-500 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`font-medium text-sm ${
                      match.status === 'live' ? 'text-red-400' : 
                      match.status === 'finished' ? 'text-gray-400' : 'text-green-400'
                    }`}>
                      {match.status === 'live' && match.minute ? `LIVE ${match.minute}'` :
                       match.status === 'finished' ? 'FT' :
                       `TODAY ${formatTime(match.matchDate)}`}
                    </span>
                    <span className="text-gray-400 text-sm">{match.competition}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: homeColors.primary }}
                        >
                          <i 
                            className={`${getTeamIcon(match.homeTeam.slug)} text-xs`}
                            style={{ color: homeColors.secondary }}
                          ></i>
                        </div>
                        <span className="font-medium">{match.homeTeam.nickname}</span>
                      </div>
                      <span className={`text-2xl font-bold ${
                        match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore
                          ? 'text-green-400' : ''
                      }`}>
                        {match.homeScore !== null ? match.homeScore : match.status === 'upcoming' ? 'vs' : '-'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: awayColors.primary }}
                        >
                          <i 
                            className={`${getTeamIcon(match.awayTeam.slug)} text-xs`}
                            style={{ color: awayColors.secondary }}
                          ></i>
                        </div>
                        <span className="font-medium">{match.awayTeam.nickname}</span>
                      </div>
                      <span className={`text-2xl font-bold ${
                        match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore
                          ? 'text-green-400' : ''
                      }`}>
                        {match.awayScore !== null ? match.awayScore : match.status === 'upcoming' ? 'vs' : '-'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400">{match.venue} • {match.homeTeam.city}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400">No matches available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
}
