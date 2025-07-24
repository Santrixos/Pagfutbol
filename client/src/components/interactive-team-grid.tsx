import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlassCard, NeonButton } from "@/components/futuristic-background";
import { type TeamConfig } from "@/lib/team-config";

interface InteractiveTeamGridProps {
  teams: TeamConfig[];
  onTeamSelect: (team: TeamConfig) => void;
  selectedTeam?: TeamConfig | null;
}

export function InteractiveTeamGrid({ teams, onTeamSelect, selectedTeam }: InteractiveTeamGridProps) {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorites' | 'recent'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: standings } = useQuery({
    queryKey: ['/api/standings'],
    staleTime: 30000
  });

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'favorites':
        return matchesSearch && localStorage.getItem(`favorite_${team.slug}`) === 'true';
      case 'recent':
        return matchesSearch && localStorage.getItem(`recent_${team.slug}`);
      default:
        return matchesSearch;
    }
  });

  const getTeamPosition = (teamName: string) => {
    if (!standings || !Array.isArray(standings)) return '—';
    const standing = standings.find((s: any) => 
      s.team?.name?.toLowerCase().includes(teamName.toLowerCase()) ||
      s.team?.nickname?.toLowerCase().includes(teamName.toLowerCase())
    );
    return standing?.position || '—';
  };

  const getTeamPoints = (teamName: string) => {
    if (!standings || !Array.isArray(standings)) return 0;
    const standing = standings.find((s: any) => 
      s.team?.name?.toLowerCase().includes(teamName.toLowerCase()) ||
      s.team?.nickname?.toLowerCase().includes(teamName.toLowerCase())
    );
    return standing?.points || 0;
  };

  const toggleFavorite = (team: TeamConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `favorite_${team.slug}`;
    const isFavorite = localStorage.getItem(key) === 'true';
    if (isFavorite) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, 'true');
    }
    // Force re-render
    setFilter(filter);
  };

  const handleTeamClick = (team: TeamConfig) => {
    localStorage.setItem(`recent_${team.slug}`, Date.now().toString());
    onTeamSelect(team);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <NeonButton
              variant={filter === 'all' ? 'primary' : 'secondary'}
              className="text-sm"
              onClick={() => setFilter('all')}
            >
              Todos los Equipos
            </NeonButton>
            <NeonButton
              variant={filter === 'favorites' ? 'primary' : 'secondary'}
              className="text-sm"
              onClick={() => setFilter('favorites')}
            >
              Favoritos
            </NeonButton>
            <NeonButton
              variant={filter === 'recent' ? 'primary' : 'secondary'}
              className="text-sm"
              onClick={() => setFilter('recent')}
            >
              Recientes
            </NeonButton>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar equipos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent w-64"
            />
            <motion.div
              className="absolute inset-0 border-2 border-cyan-400/0 rounded-xl pointer-events-none"
              animate={{
                borderColor: searchTerm ? "rgba(6,182,212,0.5)" : "rgba(6,182,212,0)"
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Team Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredTeams.map((team, index) => {
            const isHovered = hoveredTeam === team.slug;
            const isFavorite = localStorage.getItem(`favorite_${team.slug}`) === 'true';
            const position = getTeamPosition(team.name);
            const points = getTeamPoints(team.name);

            return (
              <motion.div
                key={team.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <GlassCard
                  className="cursor-pointer overflow-hidden group"
                  onMouseEnter={() => setHoveredTeam(team.slug)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  onClick={() => handleTeamClick(team)}
                >
                  {/* Team Header */}
                  <div 
                    className="relative h-32 p-4 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${team.primaryColor}20, ${team.secondaryColor}10)`
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="w-full h-full bg-grid-white/[0.1] bg-[size:20px_20px]"
                        style={{
                          maskImage: `radial-gradient(circle, black 20%, transparent 70%)`
                        }}
                      />
                    </div>

                    {/* Team Logo/Icon */}
                    <motion.div
                      className="relative z-10 text-6xl"
                      style={{ color: team.primaryColor }}
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <i className={team.icon}></i>
                    </motion.div>

                    {/* Favorite Button */}
                    <motion.button
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(team, e)}
                    >
                      <motion.i
                        className={`fas fa-heart text-lg ${isFavorite ? 'text-red-400' : 'text-white/60'}`}
                        animate={{
                          scale: isFavorite ? [1, 1.3, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>

                    {/* Position Badge */}
                    <motion.div
                      className="absolute top-3 left-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-black/30 backdrop-blur-sm text-white border-white/20"
                      >
                        #{position}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Team Info */}
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                        {team.name}
                      </h3>
                      <p className="text-sm text-white/70">{team.nickname}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="text-white/80">
                        <span className="font-semibold">{points}</span> puntos
                      </div>
                      <div className="text-white/60">
                        Estadio
                      </div>
                    </div>

                    {/* Interactive Stats */}
                    <motion.div
                      className="pt-2 border-t border-white/10"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <div className="text-green-400 font-bold">W</div>
                          <div className="text-white/60">Victorias</div>
                        </div>
                        <div>
                          <div className="text-yellow-400 font-bold">D</div>
                          <div className="text-white/60">Empates</div>
                        </div>
                        <div>
                          <div className="text-red-400 font-bold">L</div>
                          <div className="text-white/60">Derrotas</div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                    animate={{
                      borderColor: isHovered ? team.primaryColor : 'transparent',
                      boxShadow: isHovered ? `0 0 30px ${team.primaryColor}40` : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredTeams.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <GlassCard className="p-8 max-w-md mx-auto">
            <i className="fas fa-search text-4xl text-white/40 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron equipos</h3>
            <p className="text-white/70">Intenta cambiar los filtros o el término de búsqueda</p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}