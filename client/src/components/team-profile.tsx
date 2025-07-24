import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FuturisticBackground, GlassCard, NeonButton } from "@/components/futuristic-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type TeamConfig } from "@/lib/team-config";
import { type Language } from "@/lib/i18n";

interface TeamProfileProps {
  selectedTeam: TeamConfig;
  language: Language;
}

export default function TeamProfile({ selectedTeam, language }: TeamProfileProps) {
  const [activeSection, setActiveSection] = useState<'info' | 'facts' | 'achievements' | 'rivals'>('info');

  const { data: standings } = useQuery({
    queryKey: ['/api/standings'],
  });

  const { data: recentMatches } = useQuery({
    queryKey: ['/api/matches', selectedTeam.slug],
  });

  const teamStanding = standings?.find((s: any) => s.team?.slug === selectedTeam.slug);

  const sections = [
    { id: 'info', label: 'Información', icon: 'fas fa-info-circle' },
    { id: 'facts', label: 'Datos Curiosos', icon: 'fas fa-lightbulb' },
    { id: 'achievements', label: 'Logros', icon: 'fas fa-trophy' },
    { id: 'rivals', label: 'Rivalidades', icon: 'fas fa-fire' }
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
          <GlassCard className="overflow-hidden">
            <div 
              className="relative h-64 p-8"
              style={{
                background: `linear-gradient(135deg, ${selectedTeam.primaryColor}40, ${selectedTeam.secondaryColor}20)`
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-grid-white/[0.1] bg-[size:40px_40px]" />
              </div>

              <div className="relative z-10 flex items-center space-x-8">
                {/* Team Logo */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    {selectedTeam.logoUrl ? (
                      <img 
                        src={selectedTeam.logoUrl} 
                        alt={`${selectedTeam.name} logo`}
                        className="w-24 h-24 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div 
                      className="text-6xl"
                      style={{ 
                        color: selectedTeam.primaryColor,
                        display: selectedTeam.logoUrl ? 'none' : 'block'
                      }}
                    >
                      {selectedTeam.icon}
                    </div>
                  </div>
                </motion.div>

                {/* Team Info */}
                <div className="flex-1">
                  <motion.h1 
                    className="text-5xl font-bold text-white neon-text mb-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedTeam.name}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-2xl text-cyan-300 mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedTeam.nickname}
                  </motion.p>

                  <motion.div 
                    className="flex items-center space-x-6 text-white/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-map-marker-alt text-cyan-400"></i>
                      <span>{selectedTeam.city}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-calendar text-cyan-400"></i>
                      <span>Fundado en {selectedTeam.founded}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-home text-cyan-400"></i>
                      <span>{selectedTeam.stadium}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Current Position */}
                {teamStanding && (
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <div className="text-6xl font-bold text-cyan-300 mb-2">
                      #{teamStanding.position}
                    </div>
                    <div className="text-white/80">Posición Liga</div>
                    <div className="text-2xl font-bold text-white mt-2">
                      {teamStanding.points} pts
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard className="p-2">
            <div className="flex space-x-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveSection(section.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${section.icon} text-sm`}></i>
                  <span>{section.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'info' && <TeamInfoSection selectedTeam={selectedTeam} />}
          {activeSection === 'facts' && <TeamFactsSection selectedTeam={selectedTeam} />}
          {activeSection === 'achievements' && <TeamAchievementsSection selectedTeam={selectedTeam} />}
          {activeSection === 'rivals' && <TeamRivalsSection selectedTeam={selectedTeam} />}
        </motion.div>
      </div>
    </div>
  );
}

function TeamInfoSection({ selectedTeam }: { selectedTeam: TeamConfig }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Stadium Info */}
      <GlassCard className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-white flex items-center space-x-3">
            <i className="fas fa-building text-cyan-400"></i>
            <span>Estadio</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            {selectedTeam.imageUrl ? (
              <img 
                src={selectedTeam.imageUrl} 
                alt={selectedTeam.stadium}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-full h-full flex items-center justify-center text-6xl text-white/40"
              style={{ display: selectedTeam.imageUrl ? 'none' : 'flex' }}
            >
              <i className="fas fa-building"></i>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Nombre:</span>
              <span className="text-white font-semibold">{selectedTeam.stadium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Capacidad:</span>
              <span className="text-cyan-300 font-bold">{selectedTeam.capacity?.toLocaleString()} espectadores</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Ciudad:</span>
              <span className="text-white font-semibold">{selectedTeam.city}</span>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {/* Quick Stats */}
      <GlassCard className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-white flex items-center space-x-3">
            <i className="fas fa-chart-bar text-cyan-400"></i>
            <span>Estadísticas Rápidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {selectedTeam.achievements.length}
              </div>
              <div className="text-sm text-white/70">Logros Principales</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {new Date().getFullYear() - selectedTeam.founded}
              </div>
              <div className="text-sm text-white/70">Años de Historia</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {selectedTeam.rivals.length}
              </div>
              <div className="text-sm text-white/70">Rivalidades</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {Math.floor(selectedTeam.capacity / 1000)}K
              </div>
              <div className="text-sm text-white/70">Capacidad (miles)</div>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}

function TeamFactsSection({ selectedTeam }: { selectedTeam: TeamConfig }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {selectedTeam.facts.map((fact, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="p-6 h-full">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-lightbulb text-white text-lg"></i>
              </div>
              <div className="flex-1">
                <p className="text-white leading-relaxed">{fact}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function TeamAchievementsSection({ selectedTeam }: { selectedTeam: TeamConfig }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {selectedTeam.achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <i className="fas fa-trophy text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{achievement}</h3>
            <Badge 
              variant="secondary"
              className="bg-yellow-500/20 text-yellow-300 border-yellow-400"
            >
              Logro Principal
            </Badge>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function TeamRivalsSection({ selectedTeam }: { selectedTeam: TeamConfig }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {selectedTeam.rivals.map((rival, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <i className="fas fa-fire text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{rival}</h3>
              <p className="text-white/70 text-sm mb-4">Rivalidad histórica</p>
              
              <div className="flex justify-center space-x-2">
                <Badge variant="destructive" className="text-xs">
                  <i className="fas fa-fire mr-1"></i>
                  Clásico
                </Badge>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}