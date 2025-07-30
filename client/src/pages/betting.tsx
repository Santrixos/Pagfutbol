import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, AlertTriangle, Star } from "lucide-react";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  matchDate: string;
  venue: string;
}

export default function BettingPage() {
  const [selectedBets, setSelectedBets] = useState<Record<number, string>>({});
  const [betAmounts, setBetAmounts] = useState<Record<number, number>>({});

  const { data: matches = [] } = useQuery<Match[]>({
    queryKey: ['/api/matches/upcoming'],
  });

  const generateOdds = (matchId: number) => {
    // Simulamos odds realistas basados en el ID del partido
    const seed = matchId * 7;
    const homeOdds = (1.5 + (seed % 10) * 0.3).toFixed(2);
    const drawOdds = (2.8 + (seed % 5) * 0.4).toFixed(2);
    const awayOdds = (1.8 + (seed % 8) * 0.25).toFixed(2);
    
    return { home: homeOdds, draw: drawOdds, away: awayOdds };
  };

  const calculatePayout = (matchId: number, betType: string, amount: number) => {
    const odds = generateOdds(matchId);
    let multiplier = 1;
    
    switch (betType) {
      case 'home': multiplier = parseFloat(odds.home); break;
      case 'draw': multiplier = parseFloat(odds.draw); break;
      case 'away': multiplier = parseFloat(odds.away); break;
    }
    
    return (amount * multiplier).toFixed(2);
  };

  const placeBet = (matchId: number, betType: string) => {
    setSelectedBets(prev => ({ ...prev, [matchId]: betType }));
  };

  const updateBetAmount = (matchId: number, amount: number) => {
    setBetAmounts(prev => ({ ...prev, [matchId]: amount }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
            Centro de Apuestas
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pronósticos y análisis para los próximos partidos de Liga MX.
            <span className="block text-sm text-red-400 mt-2">
              ⚠️ Solo para entretenimiento - Juega responsablemente
            </span>
          </p>
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-red-500/30">
            <TabsTrigger value="matches" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Próximos Partidos
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Análisis
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Consejos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="mt-8">
            <div className="grid gap-6">
              {matches.length > 0 ? matches.map((match) => {
                const odds = generateOdds(match.id);
                const selectedBet = selectedBets[match.id];
                const betAmount = betAmounts[match.id] || 10;
                
                return (
                  <Card key={match.id} className="border-gray-700 bg-gradient-to-r from-black/80 to-red-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-2xl text-white">
                            {match.homeTeam} vs {match.awayTeam}
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            {new Date(match.matchDate).toLocaleDateString('es-MX', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })} • {match.venue}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-red-500 text-red-400">
                          {match.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Betting Options */}
                        <div>
                          <h4 className="font-semibold text-white mb-4 flex items-center">
                            <Target className="mr-2 h-5 w-5 text-red-500" />
                            Opciones de Apuesta
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            <Button
                              variant={selectedBet === 'home' ? 'default' : 'outline'}
                              className={`flex flex-col h-auto p-4 ${
                                selectedBet === 'home' 
                                  ? 'bg-red-500 text-white' 
                                  : 'border-gray-600 text-gray-300 hover:border-red-400'
                              }`}
                              onClick={() => placeBet(match.id, 'home')}
                            >
                              <span className="text-sm">Local</span>
                              <span className="text-2xl font-bold">{odds.home}</span>
                              <span className="text-xs">{match.homeTeam}</span>
                            </Button>
                            <Button
                              variant={selectedBet === 'draw' ? 'default' : 'outline'}
                              className={`flex flex-col h-auto p-4 ${
                                selectedBet === 'draw' 
                                  ? 'bg-red-500 text-white' 
                                  : 'border-gray-600 text-gray-300 hover:border-red-400'
                              }`}
                              onClick={() => placeBet(match.id, 'draw')}
                            >
                              <span className="text-sm">Empate</span>
                              <span className="text-2xl font-bold">{odds.draw}</span>
                              <span className="text-xs">X</span>
                            </Button>
                            <Button
                              variant={selectedBet === 'away' ? 'default' : 'outline'}
                              className={`flex flex-col h-auto p-4 ${
                                selectedBet === 'away' 
                                  ? 'bg-red-500 text-white' 
                                  : 'border-gray-600 text-gray-300 hover:border-red-400'
                              }`}
                              onClick={() => placeBet(match.id, 'away')}
                            >
                              <span className="text-sm">Visitante</span>
                              <span className="text-2xl font-bold">{odds.away}</span>
                              <span className="text-xs">{match.awayTeam}</span>
                            </Button>
                          </div>
                        </div>

                        {/* Bet Slip */}
                        {selectedBet && (
                          <div className="p-4 border border-red-500/30 rounded-lg bg-red-950/20">
                            <h4 className="font-semibold text-white mb-3 flex items-center">
                              <DollarSign className="mr-2 h-5 w-5 text-red-500" />
                              Tu Apuesta
                            </h4>
                            <div className="space-y-3">
                              <div className="text-sm text-gray-300">
                                Selección: <span className="text-white font-semibold">
                                  {selectedBet === 'home' ? match.homeTeam : 
                                   selectedBet === 'draw' ? 'Empate' : match.awayTeam}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-300">Cantidad:</label>
                                <input
                                  type="number"
                                  min="5"
                                  max="1000"
                                  step="5"
                                  value={betAmount}
                                  onChange={(e) => updateBetAmount(match.id, parseInt(e.target.value) || 0)}
                                  className="w-20 px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm"
                                />
                                <span className="text-sm text-gray-300">USD</span>
                              </div>
                              <div className="text-sm text-gray-300">
                                Ganancia potencial: <span className="text-green-400 font-semibold">
                                  ${calculatePayout(match.id, selectedBet, betAmount)} USD
                                </span>
                              </div>
                              <Button 
                                className="w-full bg-red-500 hover:bg-red-600 text-white"
                                disabled
                              >
                                Confirmar Apuesta (Demo)
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              }) : (
                <Card className="border-gray-700 bg-black/50">
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-400">No hay próximos partidos disponibles.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-gray-700 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-red-500" />
                    Tendencias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>• Equipos locales ganando 65% de los partidos</div>
                    <div>• Promedio de goles por partido: 2.4</div>
                    <div>• 23% de los partidos terminan en empate</div>
                    <div>• Más goles en el segundo tiempo</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="mr-2 h-5 w-5 text-red-500" />
                    Equipos en Forma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>🔥 América - 4 victorias consecutivas</div>
                    <div>⚡ Cruz Azul - Invicto en casa</div>
                    <div>🎯 Tigres - Mejor ataque de la liga</div>
                    <div>🛡️ Monterrey - Mejor defensa</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                    Lesiones Clave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>⚕️ Información actualizada diariamente</div>
                    <div>📊 Impacto en las cuotas</div>
                    <div>🔍 Jugadores clave ausentes</div>
                    <div>📈 Oportunidades de valor</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-700 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-white">Estadísticas de la Temporada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total de goles</span>
                      <span className="text-white font-semibold">284</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Promedio por partido</span>
                      <span className="text-white font-semibold">2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Victorias locales</span>
                      <span className="text-white font-semibold">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Empates</span>
                      <span className="text-white font-semibold">21%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-white">Top Goleadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">1. André-Pierre Gignac</span>
                      <Badge variant="outline" className="border-red-500 text-red-400">12 goles</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">2. Henry Martín</span>
                      <Badge variant="outline" className="border-red-500 text-red-400">11 goles</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">3. Julián Quiñones</span>
                      <Badge variant="outline" className="border-red-500 text-red-400">9 goles</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-8">
            <div className="grid gap-6">
              <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-950/20 to-black/50">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center">
                    <AlertTriangle className="mr-2 h-6 w-6" />
                    Juego Responsable
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p>• Nunca apuestes más de lo que puedes permitirte perder</p>
                  <p>• Establece límites de tiempo y dinero antes de empezar</p>
                  <p>• Las apuestas deben ser entretenimiento, no una forma de ganar dinero</p>
                  <p>• Si sientes que el juego está afectando tu vida, busca ayuda profesional</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-black/50">
                  <CardHeader>
                    <CardTitle className="text-white">Consejos para Principiantes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-300">
                    <div>• Comienza con apuestas pequeñas</div>
                    <div>• Estudia las estadísticas de los equipos</div>
                    <div>• No sigas tus emociones, usa la lógica</div>
                    <div>• Diversifica tus apuestas</div>
                    <div>• Mantén un registro de tus apuestas</div>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-black/50">
                  <CardHeader>
                    <CardTitle className="text-white">Estrategias Avanzadas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-300">
                    <div>• Analiza las cuotas y busca valor</div>
                    <div>• Considera las condiciones del partido</div>
                    <div>• Revisa el historial entre equipos</div>
                    <div>• Mantente informado sobre lesiones</div>
                    <div>• Usa sistemas de gestión de bankroll</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}