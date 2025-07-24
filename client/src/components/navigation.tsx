import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Trophy, 
  Users, 
  BarChart3, 
  Zap, 
  Settings, 
  Menu, 
  X,
  Sparkles,
  Calendar,
  Star
} from "lucide-react";
import LanguageSelector from "./language-selector";
import { useTranslations, type Language } from "@/lib/i18n";
import { type TeamConfig } from "@/lib/team-config";

interface NavigationProps {
  selectedTeam?: TeamConfig;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function Navigation({ selectedTeam, language, onLanguageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const t = useTranslations(language);

  const navigationItems = [
    { 
      path: "/dashboard", 
      icon: Home, 
      label: t.navigation.dashboard,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    { 
      path: "/live", 
      icon: Zap, 
      label: t.navigation.liveMatches,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      badge: "LIVE"
    },
    { 
      path: "/standings", 
      icon: Trophy, 
      label: t.navigation.standings,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    { 
      path: "/team-profile", 
      icon: Users, 
      label: t.navigation.teamProfile,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    { 
      path: "/statistics", 
      icon: BarChart3, 
      label: t.navigation.statistics,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    },
    { 
      path: "/trivia", 
      icon: Sparkles, 
      label: t.navigation.trivia,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      badge: "NEW"
    },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <div className="flex-1 flex flex-col min-h-0 bg-black/90 backdrop-blur-xl border-r border-white/10">
          {/* Header */}
          <div className="flex-1">
            {/* Team Header */}
            {selectedTeam && (
              <div className="p-6 border-b border-white/10">
                <div 
                  className={`bg-gradient-to-br ${selectedTeam.gradient} rounded-2xl p-4 text-center`}
                >
                  <div className="text-3xl mb-2">{selectedTeam.icon}</div>
                  <h2 className="font-bold text-white text-lg">{selectedTeam.name}</h2>
                  <p className="text-white/80 text-sm">{selectedTeam.nickname}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="mt-6 px-4 space-y-2">
              {navigationItems.map((item) => {
                const isCurrentPage = isActive(item.path);
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isCurrentPage ? "secondary" : "ghost"}
                      className={`w-full justify-start text-left h-12 px-4 ${
                        isCurrentPage 
                          ? `${item.bgColor} ${item.color} border border-current/20` 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`ml-2 text-xs px-2 py-1 ${
                            item.badge === 'LIVE' 
                              ? 'bg-red-500 text-white animate-pulse' 
                              : 'bg-emerald-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="mb-4">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            </div>
            <Link href="/settings">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
              >
                <Settings className="w-5 h-5 mr-3" />
                {t.navigation.settings}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-3">
          {selectedTeam && (
            <div 
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedTeam.gradient} flex items-center justify-center`}
            >
              <span className="text-lg">{selectedTeam.icon}</span>
            </div>
          )}
          <div>
            <h1 className="text-white font-bold text-lg">Liga MX</h1>
            {selectedTeam && (
              <p className="text-gray-400 text-sm">{selectedTeam.nickname}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSelector 
            currentLanguage={language} 
            onLanguageChange={onLanguageChange} 
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-xl">
          <div className="pt-16 pb-3 px-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const isCurrentPage = isActive(item.path);
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isCurrentPage ? "secondary" : "ghost"}
                      className={`w-full justify-start text-left h-12 px-4 ${
                        isCurrentPage 
                          ? `${item.bgColor} ${item.color} border border-current/20` 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`ml-2 text-xs px-2 py-1 ${
                            item.badge === 'LIVE' 
                              ? 'bg-red-500 text-white animate-pulse' 
                              : 'bg-emerald-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}