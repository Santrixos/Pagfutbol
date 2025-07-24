import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Users, 
  Clock, 
  TrendingUp, 
  Zap, 
  Star,
  Calendar,
  Target,
  Sparkles
} from "lucide-react";
import { useTranslations, type Language } from "@/lib/i18n";
import { type TeamConfig } from "@/lib/team-config";
import { getRandomTeamFacts, getTeamTrivia } from "@/lib/team-facts";
import { type Team, type Match, type Standing, type Player } from "@shared/schema";

interface DashboardProps {
  selectedTeam: TeamConfig;
  language: Language;
}

export default function Dashboard({ selectedTeam, language }: DashboardProps) {
  const t = useTranslations(language);

  // Fetch data
  const { data: teams } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const { data: liveMatches } = useQuery<Match[]>({ queryKey: ["/api/matches/live"] });
  const { data: upcomingMatches } = useQuery<Match[]>({ queryKey: ["/api/matches/upcoming"] });
  const { data: standings } = useQuery<Standing[]>({ queryKey: ["/api/standings"] });
  const { data: topScorers } = useQuery<Player[]>({ queryKey: ["/api/players/top-scorers"] });

  // Get team trivia and facts
  const teamTrivia = getTeamTrivia(selectedTeam.slug);
  const randomFacts = getRandomTeamFacts(selectedTeam.slug, 2);

  // Find current team data
  const currentTeam = teams?.find(team => team.slug === selectedTeam.slug);
  const teamStanding = standings?.find(standing => standing.teamId === currentTeam?.id);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div 
          className={`inline-block bg-gradient-to-br ${selectedTeam.gradient} rounded-3xl p-8 text-white mb-6`}
        >
          <div className="text-6xl mb-4">{selectedTeam.icon}</div>
          <h1 className="text-4xl font-black mb-2">{selectedTeam.name}</h1>
          <p className="text-xl opacity-90">{selectedTeam.nickname}</p>
          {teamTrivia && (
            <p className="text-sm opacity-75 mt-2">
              {language === 'es' ? 'Fundado en' : language === 'en' ? 'Founded in' : 'Fondé en'} {teamTrivia.foundation.year}
            </p>
          )}
        </div>
      </div>

      {/* Live Matches Alert */}
      {liveMatches && liveMatches.length > 0 && (
        <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-bold text-red-400">¡Partidos en vivo!</h3>
                <p className="text-gray-300 text-sm">
                  {liveMatches.length} {liveMatches.length === 1 ? 'partido' : 'partidos'} en curso
                </p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto border-red-500/50 text-red-400 hover:bg-red-500/10">
                <Zap className="w-4 h-4 mr-2" />
                Ver en vivo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Team Position */}
        {teamStanding && (
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Posición actual</p>
                  <p className="text-3xl font-bold text-blue-400">#{teamStanding.position}</p>
                  <p className="text-gray-300 text-sm">{teamStanding.points} puntos</p>
                </div>
                <Trophy className="w-10 h-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Titles */}
        {teamTrivia && (
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Títulos de Liga</p>
                  <p className="text-3xl font-bold text-yellow-400">{teamTrivia.achievements.ligaTitles}</p>
                  <p className="text-gray-300 text-sm">Último: {teamTrivia.achievements.lastTitle}</p>
                </div>
                <Star className="w-10 h-10 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stadium Capacity */}
        {teamTrivia && (
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Capacidad del Estadio</p>
                  <p className="text-3xl font-bold text-green-400">
                    {teamTrivia.stadium.capacity.toLocaleString()}
                  </p>
                  <p className="text-gray-300 text-sm">{teamTrivia.stadium.name}</p>
                </div>
                <Users className="w-10 h-10 text-green-400" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Match */}
        {upcomingMatches && upcomingMatches.length > 0 && (
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Próximo partido</p>
                  <p className="text-lg font-bold text-purple-400">
                    {new Date(upcomingMatches[0].matchDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 text-sm">Próximo partido</p>
                </div>
                <Calendar className="w-10 h-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Team Facts Section */}
      {randomFacts.length > 0 && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Sparkles className="w-6 h-6 mr-3 text-pink-400" />
              Datos Curiosos de {selectedTeam.nickname}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {randomFacts.map((fact, index) => (
                <div 
                  key={fact.id}
                  className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{fact.icon}</div>
                    <div className="flex-1">
                      <p className="text-gray-300">{fact.text[language]}</p>
                      <Badge 
                        variant="secondary" 
                        className={`mt-2 text-xs ${
                          fact.rarity === 'legendary' 
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                            : fact.rarity === 'rare'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                        }`}
                      >
                        {fact.rarity === 'legendary' ? '🌟 Legendario' : fact.rarity === 'rare' ? '💎 Raro' : '📝 Común'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:bg-gray-800/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">Partidos en Vivo</h3>
            <p className="text-gray-400 text-sm">Sigue los partidos en tiempo real</p>
          </CardContent>
        </Card>

        <Card className="hover:bg-gray-800/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">Tabla de Posiciones</h3>
            <p className="text-gray-400 text-sm">Revisa la posición de tu equipo</p>
          </CardContent>
        </Card>

        <Card className="hover:bg-gray-800/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">Estadísticas</h3>
            <p className="text-gray-400 text-sm">Análisis detallado del rendimiento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}