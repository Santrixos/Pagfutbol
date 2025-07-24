import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Trophy, 
  Users, 
  MapPin,
  Calendar,
  Star,
  Shuffle,
  RefreshCw
} from "lucide-react";
import { useTranslations, type Language } from "@/lib/i18n";
import { type TeamConfig } from "@/lib/team-config";
import { getRandomTeamFacts, getTeamTrivia, type TeamFact } from "@/lib/team-facts";

interface TriviaProps {
  selectedTeam: TeamConfig;
  language: Language;
}

export default function Trivia({ selectedTeam, language }: TriviaProps) {
  const [currentFacts, setCurrentFacts] = useState<TeamFact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(language);

  const teamTrivia = getTeamTrivia(selectedTeam.slug);

  // Load initial facts
  useEffect(() => {
    if (selectedTeam) {
      setCurrentFacts(getRandomTeamFacts(selectedTeam.slug, 5));
    }
  }, [selectedTeam]);

  const refreshFacts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentFacts(getRandomTeamFacts(selectedTeam.slug, 5));
      setIsLoading(false);
    }, 500);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'rare':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '🌟';
      case 'rare':
        return '💎';
      default:
        return '📝';
    }
  };

  if (!teamTrivia) {
    return (
      <div className="p-6">
        <Card className="bg-gray-800/50 border-gray-600/30">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Datos no disponibles</h3>
            <p className="text-gray-400">No hay información de trivia disponible para este equipo.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div 
          className={`inline-block bg-gradient-to-br ${selectedTeam.gradient} rounded-3xl p-6 text-white mb-6`}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <div className="text-4xl">{selectedTeam.icon}</div>
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black mb-2">Trivia de {selectedTeam.nickname}</h1>
          <p className="text-lg opacity-90">Descubre los secretos mejor guardados</p>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Calendar className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">{t.teamFacts.foundation}</h3>
            <p className="text-2xl font-bold text-blue-400">{teamTrivia.foundation.year}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-6 text-center">
            <MapPin className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">{t.teamFacts.stadium}</h3>
            <p className="text-lg font-bold text-green-400">{teamTrivia.stadium.name}</p>
            <p className="text-sm text-gray-400">{teamTrivia.stadium.capacity.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardContent className="p-6 text-center">
            <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">{t.teamFacts.titles}</h3>
            <p className="text-2xl font-bold text-yellow-400">{teamTrivia.achievements.ligaTitles}</p>
            <p className="text-sm text-gray-400">Liga MX</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <Star className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">Último Título</h3>
            <p className="text-2xl font-bold text-purple-400">{teamTrivia.achievements.lastTitle}</p>
          </CardContent>
        </Card>
      </div>

      {/* Foundation Story */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Calendar className="w-6 h-6 mr-3 text-blue-400" />
            Historia de la Fundación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">
            {teamTrivia.foundation.story[language]}
          </p>
        </CardContent>
      </Card>

      {/* Legendary Players */}
      {teamTrivia.legends.length > 0 && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Users className="w-6 h-6 mr-3 text-gold-400" />
              {t.teamFacts.legendaryPlayers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamTrivia.legends.map((legend, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10"
                >
                  <h4 className="font-bold text-white text-lg mb-1">{legend.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{legend.position} • {legend.years}</p>
                  <p className="text-gray-300 text-sm">{legend.achievements[language]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Random Facts */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-white">
              <Sparkles className="w-6 h-6 mr-3 text-pink-400" />
              {t.teamFacts.curiosities}
            </CardTitle>
            <Button
              onClick={refreshFacts}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Shuffle className="w-4 h-4" />
              )}
              <span className="ml-2">Nuevos datos</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentFacts.map((fact, index) => (
              <div 
                key={fact.id}
                className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10 transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{fact.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getRarityColor(fact.rarity)}`}
                      >
                        {getRarityIcon(fact.rarity)} {fact.rarity === 'legendary' ? 'Legendario' : fact.rarity === 'rare' ? 'Raro' : 'Común'}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-500/30 text-gray-400">
                        {fact.category === 'history' ? 'Historia' : 
                         fact.category === 'stadium' ? 'Estadio' :
                         fact.category === 'players' ? 'Jugadores' :
                         fact.category === 'culture' ? 'Cultura' :
                         fact.category === 'achievements' ? 'Logros' : 'Curiosidad'}
                      </Badge>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{fact.text[language]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentFacts.length === 0 && (
            <div className="text-center py-8">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No hay datos curiosos disponibles para este equipo.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rivalries */}
      {teamTrivia.rivalries.length > 0 && (
        <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Trophy className="w-6 h-6 mr-3 text-red-400" />
              {t.teamFacts.rivalries}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamTrivia.rivalries.map((rivalry, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div>
                    <h4 className="font-bold text-white">{rivalry.name[language]}</h4>
                    <p className="text-gray-400 text-sm">vs {rivalry.team}</p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`${
                      rivalry.intensity === 'clasico' 
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : rivalry.intensity === 'high'
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }`}
                  >
                    {rivalry.intensity === 'clasico' ? '🔥 Clásico' : rivalry.intensity === 'high' ? '⚡ Alta' : '💙 Media'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}