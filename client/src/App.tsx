import { useState } from "react";
import { Router, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { type TeamConfig } from "@/lib/team-config";
import { type Language } from "@/lib/i18n";
import TeamSelector from "@/components/team-selector";
import Navigation from "@/components/navigation";
import Dashboard from "@/pages/dashboard";
import Trivia from "@/pages/trivia";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function App() {
  const [selectedTeam, setSelectedTeam] = useState<TeamConfig | null>(null);
  const [language, setLanguage] = useState<Language>('es');

  const handleTeamSelect = (teamConfig: TeamConfig, selectedLanguage: Language) => {
    setSelectedTeam(teamConfig);
    setLanguage(selectedLanguage);
    // Apply team colors to CSS variables
    document.documentElement.style.setProperty('--team-primary', teamConfig.primaryColor);
    document.documentElement.style.setProperty('--team-secondary', teamConfig.secondaryColor);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gray-900">
          {!selectedTeam ? (
            <TeamSelector onTeamSelect={handleTeamSelect} />
          ) : (
            <div className="flex h-screen overflow-hidden">
              <Navigation 
                selectedTeam={selectedTeam} 
                language={language} 
                onLanguageChange={setLanguage} 
              />
              
              <div className="flex-1 lg:ml-72 overflow-auto">
                <div className="min-h-screen" style={{
                  background: `linear-gradient(135deg, ${selectedTeam.primaryColor}15, ${selectedTeam.secondaryColor}10)`
                }}>
                  <div className="pt-16 lg:pt-0">
                    <Router>
                      <Route path="/" component={() => <Redirect to="/dashboard" />} />
                      <Route path="/dashboard" component={() => <Dashboard selectedTeam={selectedTeam} language={language} />} />
                      <Route path="/live" component={() => <Home />} />
                      <Route path="/standings" component={() => <Home />} />
                      <Route path="/team-profile" component={() => <Home />} />
                      <Route path="/statistics" component={() => <Home />} />
                      <Route path="/trivia" component={() => <Trivia selectedTeam={selectedTeam} language={language} />} />
                      <Route path="/settings" component={() => <Home />} />
                      <Route path="/404" component={NotFound} />
                      <Route>
                        {(params) => <Redirect to="/404" />}
                      </Route>
                    </Router>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
