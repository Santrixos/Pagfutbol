import { type TeamConfig } from "@/lib/team-config";
import { type Language } from "@/lib/i18n";
import LiveDashboard from "@/components/live-dashboard";

interface TeamDashboardProps {
  selectedTeam: TeamConfig;
  language: Language;
}

export default function TeamDashboard({ selectedTeam, language }: TeamDashboardProps) {
  return <LiveDashboard selectedTeam={selectedTeam} language={language} />;
}