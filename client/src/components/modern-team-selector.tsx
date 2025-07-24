import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { type TeamConfig, TEAM_CONFIGS } from "@/lib/team-config";
import { type Team } from "@shared/schema";
import { FuturisticBackground, GlassCard, NeonButton } from "@/components/futuristic-background";
import LanguageSelector from "./language-selector";
import { useTranslations, type Language, getStoredLanguage, setStoredLanguage } from "@/lib/i18n";

interface ModernTeamSelectorProps {
  onTeamSelect: (teamConfig: TeamConfig, language: Language) => void;
}

export default function ModernTeamSelector({ onTeamSelect }: ModernTeamSelectorProps) {
  const [language, setLanguage] = useState<Language>(getStoredLanguage());
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: teams } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });

  const { data: standings } = useQuery({
    queryKey: ['/api/standings'],
    staleTime: 30000
  });

  const t = useTranslations(language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setStoredLanguage(newLanguage);
  };

  const handleTeamClick = (teamSlug: string) => {
    const teamConfig = TEAM_CONFIGS[teamSlug];
    if (teamConfig) {
      setSelectedTeam(teamSlug);
      setIsTransitioning(true);
      
      setTimeout(() => {
        onTeamSelect(teamConfig, language);
      }, 1000);
    }
  };

  const getTeamPosition = (teamSlug: string) => {
    if (!standings || !Array.isArray(standings)) return '—';
    const standing = standings.find((s: any) => 
      s.team?.slug === teamSlug
    );
    return standing?.position || '—';
  };

  const getTeamPoints = (teamSlug: string) => {
    if (!standings || !Array.isArray(standings)) return 0;
    const standing = standings.find((s: any) => 
      s.team?.slug === teamSlug
    );
    return standing?.points || 0;
  };

  const availableTeams = teams?.filter(team => TEAM_CONFIGS[team.slug]) || [];
  const filteredTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center py-16 px-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 neon-text"
            style={{
              background: 'linear-gradient(45deg, #00f5ff, #ff00ff, #00ff00)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 3s ease infinite'
            }}
          >
            {t.teamSelector.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-cyan-300 max-w-3xl mx-auto mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t.teamSelector.subtitle}
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          >
            <GlassCard className="inline-block p-4">
              <LanguageSelector 
                language={language} 
                onLanguageChange={handleLanguageChange}
              />
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Search and Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <GlassCard className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {t.teamSelector.selectTeam}
                </h2>
                
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
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredTeams.map((team, index) => {
                const teamConfig = TEAM_CONFIGS[team.slug];
                if (!teamConfig) return null;

                const isHovered = hoveredTeam === team.slug;
                const isSelected = selectedTeam === team.slug;
                const position = getTeamPosition(team.slug);
                const points = getTeamPoints(team.slug);

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
                      className={`cursor-pointer overflow-hidden group ${
                        isSelected ? 'ring-2 ring-cyan-400' : ''
                      }`}
                      onMouseEnter={() => setHoveredTeam(team.slug)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      onClick={() => handleTeamClick(team.slug)}
                    >
                      {/* Team Header */}
                      <div 
                        className="relative h-32 p-4 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${teamConfig.primaryColor}20, ${teamConfig.secondaryColor}10)`
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
                          style={{ color: teamConfig.primaryColor }}
                          animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.2 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <i className={teamConfig.icon}></i>
                        </motion.div>

                        {/* Position Badge */}
                        <motion.div
                          className="absolute top-3 left-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="bg-black/30 backdrop-blur-sm text-white border border-white/20 px-2 py-1 rounded-full text-xs">
                            #{position}
                          </div>
                        </motion.div>
                      </div>

                      {/* Team Info */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                            {team.name}
                          </h3>
                          <p className="text-sm text-white/70">{team.nickname}</p>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div className="text-white/80">
                            <span className="font-semibold">{points}</span> pts
                          </div>
                          <div className="text-white/60">
                            {team.city}
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                            >
                              <div className="text-center">
                                <motion.i 
                                  className="fas fa-check-circle text-4xl text-green-400 mb-2"
                                  animate={{ scale: [0, 1.2, 1] }}
                                  transition={{ duration: 0.5 }}
                                ></motion.i>
                                <p className="text-white font-bold">Seleccionado</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                        animate={{
                          borderColor: isHovered ? teamConfig.primaryColor : 'transparent',
                          boxShadow: isHovered ? `0 0 30px ${teamConfig.primaryColor}40` : 'none'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </GlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && selectedTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: selectedTeam && TEAM_CONFIGS[selectedTeam]
                ? `linear-gradient(135deg, ${TEAM_CONFIGS[selectedTeam].primaryColor}20, ${TEAM_CONFIGS[selectedTeam].secondaryColor}10)`
                : 'rgba(0, 0, 0, 0.8)'
            }}
          >
            <GlassCard className="p-12 text-center max-w-md">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="text-8xl mb-6"
                style={{ color: selectedTeam && TEAM_CONFIGS[selectedTeam] ? TEAM_CONFIGS[selectedTeam].primaryColor : '#00f5ff' }}
              >
                <i className={selectedTeam && TEAM_CONFIGS[selectedTeam] ? TEAM_CONFIGS[selectedTeam].icon : 'fas fa-futbol'}></i>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedTeam && teams?.find(t => t.slug === selectedTeam)?.name}
              </h3>
              
              <p className="text-cyan-300 mb-6">
                Inicializando experiencia futurística...
              </p>
              
              <motion.div 
                className="w-full h-2 bg-white/20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}