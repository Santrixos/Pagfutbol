import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FuturisticBackground, GlassCard, NeonButton } from "@/components/futuristic-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type TeamConfig } from "@/lib/team-config";
import { type Language } from "@/lib/i18n";

interface LiveDashboardProps {
  selectedTeam: TeamConfig;
  language: Language;
}

export default function LiveDashboard({ selectedTeam, language }: LiveDashboardProps) {
  const [activeTab, setActiveTab] = useState<'live' | 'standings' | 'players' | 'stats'>('live');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data: liveMatches, refetch: refetchMatches } = useQuery({
    queryKey: ['/api/matches/live'],
    refetchInterval: autoRefresh ? 30000 : false
  });

  const { data: standings } = useQuery({
    queryKey: ['/api/standings'],
    refetchInterval: autoRefresh ? 60000 : false
  });

  const { data: topScorers } = useQuery({
    queryKey: ['/api/players/top-scorers'],
    refetchInterval: autoRefresh ? 120000 : false
  });

  const tabs = [
    { id: 'live', label: 'En Vivo', icon: 'fas fa-broadcast-tower' },
    { id: 'standings', label: 'Tabla', icon: 'fas fa-list-ol' },
    { id: 'players', label: 'Goleadores', icon: 'fas fa-futbol' },
    { id: 'stats', label: 'Estadísticas', icon: 'fas fa-chart-bar' }
  ];

  return (
    <div className="min-h-screen relative">
      <FuturisticBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ 
                    backgroundColor: selectedTeam.primaryColor,
                    color: selectedTeam.secondaryColor
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <i className={selectedTeam.icon}></i>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-white neon-text">
                    {selectedTeam.name}
                  </h1>
                  <p className="text-cyan-300">{selectedTeam.nickname}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NeonButton
                    variant={autoRefresh ? 'primary' : 'secondary'}
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className="text-sm"
                  >
                    <i className={`fas ${autoRefresh ? 'fa-pause' : 'fa-play'} mr-2`}></i>
                    {autoRefresh ? 'Pausar' : 'Activar'} Auto-refresh
                  </NeonButton>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NeonButton
                    variant="accent"
                    onClick={() => {
                      refetchMatches();
                    }}
                    className="text-sm"
                  >
                    <i className="fas fa-sync mr-2"></i>
                    Actualizar
                  </NeonButton>
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="p-2">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(tab.id as 'live' | 'standings' | 'players' | 'stats')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'live' && (
              <LiveMatchesSection matches={liveMatches} selectedTeam={selectedTeam} />
            )}
            {activeTab === 'standings' && (
              <StandingsSection standings={standings} selectedTeam={selectedTeam} />
            )}
            {activeTab === 'players' && (
              <PlayersSection players={topScorers} selectedTeam={selectedTeam} />
            )}
            {activeTab === 'stats' && (
              <StatsSection selectedTeam={selectedTeam} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function LiveMatchesSection({ matches, selectedTeam }: { matches: any; selectedTeam: TeamConfig }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {matches?.length > 0 ? (
        matches.map((match: any, index: number) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant={match.status === 'live' ? 'destructive' : 'secondary'}
                  className={match.status === 'live' ? 'animate-pulse' : ''}
                >
                  {match.status === 'live' ? `${match.minute}'` : match.status}
                </Badge>
                <span className="text-xs text-white/60">{match.competition}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-futbol text-sm"></i>
                    </div>
                    <span className="font-semibold">{match.homeTeam?.name}</span>
                  </div>
                  <span className="text-2xl font-bold">{match.homeScore ?? '-'}</span>
                </div>

                <div className="flex items-center justify-center">
                  <span className="text-white/40">VS</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-futbol text-sm"></i>
                    </div>
                    <span className="font-semibold">{match.awayTeam?.name}</span>
                  </div>
                  <span className="text-2xl font-bold">{match.awayScore ?? '-'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/60">
                  <span>{match.venue}</span>
                  <span>{new Date(match.matchDate).toLocaleDateString()}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full">
          <GlassCard className="p-12 text-center">
            <i className="fas fa-futbol text-4xl text-white/40 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">No hay partidos en vivo</h3>
            <p className="text-white/70">Los partidos aparecerán aquí cuando estén en curso</p>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

function StandingsSection({ standings, selectedTeam }: { standings: any; selectedTeam: TeamConfig }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white neon-text">Tabla de Posiciones</h2>
        <p className="text-cyan-300">Liga MX 2024-25</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Pos</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Equipo</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">PJ</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">G</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">E</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">P</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {standings?.map((standing: any, index: number) => (
              <motion.tr
                key={standing.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`hover:bg-white/5 transition-colors ${
                  standing.team?.slug === selectedTeam.slug ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-white">{standing.position}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-futbol text-xs"></i>
                    </div>
                    <span className="text-sm font-medium text-white">{standing.team?.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-white/80">{standing.matchesPlayed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-400">{standing.wins}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-400">{standing.draws}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-400">{standing.losses}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-lg font-bold text-cyan-300">{standing.points}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function PlayersSection({ players, selectedTeam }: { players: any; selectedTeam: TeamConfig }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {players?.map((player: any, index: number) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="p-6 hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-2xl text-white"></i>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{player.name}</h3>
              <p className="text-cyan-300 mb-4">{player.team?.name}</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{player.goals}</div>
                  <div className="text-xs text-white/60">Goles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{player.assists || 0}</div>
                  <div className="text-xs text-white/60">Asist.</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{player.appearances || 0}</div>
                  <div className="text-xs text-white/60">Partidos</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function StatsSection({ selectedTeam }: { selectedTeam: TeamConfig }) {
  const stats = [
    { label: 'Promedio de Goles', value: '2.3', icon: 'fas fa-futbol', color: 'text-green-400' },
    { label: 'Posesión Promedio', value: '58%', icon: 'fas fa-chart-pie', color: 'text-blue-400' },
    { label: 'Tiros a Puerta', value: '12.4', icon: 'fas fa-crosshairs', color: 'text-yellow-400' },
    { label: 'Efectividad', value: '78%', icon: 'fas fa-bullseye', color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="p-6 text-center hover:shadow-2xl transition-all duration-300">
            <div className={`text-4xl mb-4 ${stat.color}`}>
              <i className={stat.icon}></i>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}