// Internationalization configuration and translations
export type Language = 'es' | 'en' | 'fr';

export interface Translations {
  common: {
    selectTeam: string;
    loading: string;
    error: string;
    liveMatches: string;
    standings: string;
    topScorers: string;
    stats: string;
    news: string;
    facts: string;
    home: string;
    teams: string;
    matches: string;
    players: string;
    about: string;
  };
  teamSelector: {
    title: string;
    subtitle: string;
    question: string;
    description: string;
    preparing: string;
    officialColors: string;
    personalizedContent: string;
    liveData: string;
    teamsAvailable: string;
    season: string;
  };
  teamFacts: {
    foundation: string;
    stadium: string;
    capacity: string;
    titles: string;
    mascot: string;
    anthem: string;
    rivalries: string;
    legendaryPlayers: string;
    curiosities: string;
    achievements: string;
  };
  navigation: {
    dashboard: string;
    liveMatches: string;
    standings: string;
    teamProfile: string;
    statistics: string;
    trivia: string;
    settings: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    common: {
      selectTeam: "Seleccionar Equipo",
      loading: "Cargando...",
      error: "Error",
      liveMatches: "Partidos en Vivo",
      standings: "Tabla de Posiciones",
      topScorers: "Goleadores",
      stats: "Estadísticas",
      news: "Noticias",
      facts: "Datos Curiosos",
      home: "Inicio",
      teams: "Equipos",
      matches: "Partidos",
      players: "Jugadores",
      about: "Acerca de",
    },
    teamSelector: {
      title: "LIGA MX",
      subtitle: "Mexican Football Style",
      question: "¿A qué equipo le vas?",
      description: "Selecciona tu equipo para obtener una experiencia personalizada con los colores oficiales",
      preparing: "Preparando tu experiencia...",
      officialColors: "Colores oficiales",
      personalizedContent: "Contenido personalizado",
      liveData: "Datos en vivo",
      teamsAvailable: "equipos disponibles",
      season: "Liga MX Clausura 2024",
    },
    teamFacts: {
      foundation: "Fundación",
      stadium: "Estadio",
      capacity: "Capacidad",
      titles: "Títulos",
      mascot: "Mascota",
      anthem: "Himno",
      rivalries: "Rivalidades",
      legendaryPlayers: "Jugadores Legendarios",
      curiosities: "Curiosidades",
      achievements: "Logros Destacados",
    },
    navigation: {
      dashboard: "Panel Principal",
      liveMatches: "En Vivo",
      standings: "Tabla",
      teamProfile: "Mi Equipo",
      statistics: "Estadísticas",
      trivia: "Trivia",
      settings: "Configuración",
    },
  },
  en: {
    common: {
      selectTeam: "Select Team",
      loading: "Loading...",
      error: "Error",
      liveMatches: "Live Matches",
      standings: "League Table",
      topScorers: "Top Scorers",
      stats: "Statistics",
      news: "News",
      facts: "Fun Facts",
      home: "Home",
      teams: "Teams",
      matches: "Matches",
      players: "Players",
      about: "About",
    },
    teamSelector: {
      title: "LIGA MX",
      subtitle: "Mexican Football Style",
      question: "Which team do you support?",
      description: "Select your team to get a personalized experience with official colors",
      preparing: "Preparing your experience...",
      officialColors: "Official colors",
      personalizedContent: "Personalized content",
      liveData: "Live data",
      teamsAvailable: "teams available",
      season: "Liga MX Clausura 2024",
    },
    teamFacts: {
      foundation: "Founded",
      stadium: "Stadium",
      capacity: "Capacity",
      titles: "Titles",
      mascot: "Mascot",
      anthem: "Anthem",
      rivalries: "Rivalries",
      legendaryPlayers: "Legendary Players",
      curiosities: "Fun Facts",
      achievements: "Notable Achievements",
    },
    navigation: {
      dashboard: "Dashboard",
      liveMatches: "Live",
      standings: "Table",
      teamProfile: "My Team",
      statistics: "Stats",
      trivia: "Trivia",
      settings: "Settings",
    },
  },
  fr: {
    common: {
      selectTeam: "Sélectionner Équipe",
      loading: "Chargement...",
      error: "Erreur",
      liveMatches: "Matchs en Direct",
      standings: "Classement",
      topScorers: "Buteurs",
      stats: "Statistiques",
      news: "Actualités",
      facts: "Faits Amusants",
      home: "Accueil",
      teams: "Équipes",
      matches: "Matchs",
      players: "Joueurs",
      about: "À propos",
    },
    teamSelector: {
      title: "LIGA MX",
      subtitle: "Style Football Mexicain",
      question: "Quelle équipe supportez-vous?",
      description: "Sélectionnez votre équipe pour une expérience personnalisée avec les couleurs officielles",
      preparing: "Préparation de votre expérience...",
      officialColors: "Couleurs officielles",
      personalizedContent: "Contenu personnalisé",
      liveData: "Données en direct",
      teamsAvailable: "équipes disponibles",
      season: "Liga MX Clausura 2024",
    },
    teamFacts: {
      foundation: "Fondation",
      stadium: "Stade",
      capacity: "Capacité",
      titles: "Titres",
      mascot: "Mascotte",
      anthem: "Hymne",
      rivalries: "Rivalités",
      legendaryPlayers: "Joueurs Légendaires",
      curiosities: "Curiosités",
      achievements: "Réalisations Notables",
    },
    navigation: {
      dashboard: "Tableau de Bord",
      liveMatches: "En Direct",
      standings: "Classement",
      teamProfile: "Mon Équipe",
      statistics: "Statistiques",
      trivia: "Trivia",
      settings: "Paramètres",
    },
  },
};

// Hook for using translations
export function useTranslations(language: Language): Translations {
  return translations[language];
}

// Language detection and storage
export const AVAILABLE_LANGUAGES = [
  { code: 'es' as const, name: 'Español', flag: '🇲🇽' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
];

export function getStoredLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-language');
    if (stored && ['es', 'en', 'fr'].includes(stored)) {
      return stored as Language;
    }
  }
  return 'es'; // Default to Spanish
}

export function setStoredLanguage(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language);
  }
}