import { type Team } from "@shared/schema";

export interface TeamConfig {
  slug: string;
  name: string;
  nickname: string;
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  gradient: string;
  city: string;
  founded: number;
  stadium: string;
  logoUrl: string;
  imageUrl: string;
  facts: string[];
  achievements: string[];
  rivals: string[];
  capacity: number;
}

export const TEAM_CONFIGS: Record<string, TeamConfig> = {
  america: {
    slug: "america",
    name: "Club América",
    nickname: "Las Águilas",
    primaryColor: "#FFD700",
    secondaryColor: "#003366",
    icon: "🦅",
    gradient: "from-yellow-400 via-yellow-500 to-blue-900",
    city: "Ciudad de México",
    founded: 1916,
    stadium: "Estadio Azteca",
    capacity: 87000,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/Club-America-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Estadio_Azteca_01.jpg/800px-Estadio_Azteca_01.jpg",
    facts: [
      "Es el equipo más exitoso de México con 13 títulos de liga",
      "El Estadio Azteca es uno de los más grandes del mundo",
      "Ha ganado 7 títulos de la CONCACAF Champions League",
      "Su mascot es un águila llamada 'Águila Real'"
    ],
    achievements: ["13 Títulos de Liga", "7 CONCACAF Champions", "5 Copas México"],
    rivals: ["Chivas", "Cruz Azul", "Pumas"]
  },
  chivas: {
    slug: "chivas",
    name: "Chivas Guadalajara",
    nickname: "El Rebaño",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "🐐",
    gradient: "from-red-600 via-red-700 to-white",
    city: "Guadalajara",
    founded: 1906,
    stadium: "Estadio Akron",
    capacity: 49850,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/Guadalajara-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Estadio_Akron_vista_general.jpg/800px-Estadio_Akron_vista_general.jpg",
    facts: [
      "Solo puede fichar jugadores mexicanos por tradición",
      "Es el segundo equipo más exitoso con 12 títulos",
      "Su estadio Akron es uno de los más modernos de México",
      "El Clásico Nacional contra América es el más importante"
    ],
    achievements: ["12 Títulos de Liga", "4 CONCACAF Champions", "4 Copas México"],
    rivals: ["América", "Atlas", "León"]
  },
  "cruz-azul": {
    slug: "cruz-azul",
    name: "Cruz Azul",
    nickname: "La Máquina",
    primaryColor: "#1F4E79",
    secondaryColor: "#FFFFFF",
    icon: "⚙️",
    gradient: "from-blue-700 via-blue-800 to-blue-900",
    city: "Ciudad de México",
    founded: 1927,
    stadium: "Estadio Azteca",
    capacity: 87000,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/Cruz-Azul-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Estadio_Azteca_01.jpg/800px-Estadio_Azteca_01.jpg",
    facts: [
      "Rompió una maldición de 23 años sin título en 2021",
      "Es conocido como 'La Máquina' por su juego organizado",
      "Comparte el Estadio Azteca con el Club América",
      "Tiene una de las aficiones más leales de México"
    ],
    achievements: ["9 Títulos de Liga", "6 CONCACAF Champions", "5 Copas México"],
    rivals: ["América", "Pumas", "Atlante"]
  },
  pumas: {
    slug: "pumas",
    name: "Pumas UNAM",
    nickname: "Los Pumas",
    primaryColor: "#003366",
    secondaryColor: "#FFD700",
    icon: "🐾",
    gradient: "from-blue-900 via-blue-800 to-yellow-500",
    city: "Ciudad de México",
    founded: 1954,
    stadium: "Estadio Olímpico Universitario",
    capacity: 72000,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/Pumas-UNAM-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Estadio_Olimpico_Universitario_Ciudad_Universitaria.jpg/800px-Estadio_Olimpico_Universitario_Ciudad_Universitaria.jpg",
    facts: [
      "Es el equipo de la Universidad Nacional Autónoma de México",
      "Su estadio albergó los Juegos Olímpicos de 1968",
      "Es conocido por formar grandes jugadores jóvenes",
      "Tiene una de las barras más fieles del fútbol mexicano"
    ],
    achievements: ["7 Títulos de Liga", "3 CONCACAF Champions", "2 Copas México"],
    rivals: ["América", "Cruz Azul", "Atlante"]
  },
  tigres: {
    slug: "tigres",
    name: "Tigres UANL",
    nickname: "Los Tigres",
    primaryColor: "#FFB300",
    secondaryColor: "#003366",
    icon: "🐅",
    gradient: "from-yellow-500 via-orange-500 to-blue-900",
    city: "San Nicolás de los Garza",
    founded: 1960,
    stadium: "Estadio Universitario",
    capacity: 42000,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/Tigres-UANL-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Estadio_Universitario_desde_arriba.jpg/800px-Estadio_Universitario_desde_arriba.jpg",
    facts: [
      "Ha ganado 8 títulos de liga en los últimos 20 años",
      "Llegó a la final del Mundial de Clubes en 2020",
      "Su mascot es un tigre llamado 'Tigre Toño'",
      "Tiene una de las mejores academias de México"
    ],
    achievements: ["8 Títulos de Liga", "5 CONCACAF Champions", "3 Copas México"],
    rivals: ["Monterrey", "Santos", "León"]
  },
  monterrey: {
    slug: "monterrey",
    name: "CF Monterrey",
    nickname: "Los Rayados",
    primaryColor: "#003366",
    secondaryColor: "#FFFFFF",
    icon: "🏔️",
    gradient: "from-blue-900 via-slate-700 to-gray-200",
    city: "Monterrey",
    founded: 1945,
    stadium: "Estadio BBVA",
    capacity: 53500,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/CF-Monterrey-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Estadio_BBVA.jpg/800px-Estadio_BBVA.jpg",
    facts: [
      "Su estadio BBVA es considerado el más moderno de México",
      "Es uno de los equipos más exitosos de la última década",
      "Tiene el Clásico Regiomontano contra Tigres",
      "Su afición es conocida como 'La Adicción Azul'"
    ],
    achievements: ["5 Títulos de Liga", "5 CONCACAF Champions", "3 Copas México"],
    rivals: ["Tigres", "América", "Cruz Azul"]
  },
  santos: {
    slug: "santos",
    name: "Santos Laguna",
    nickname: "Los Guerreros",
    primaryColor: "#00A651",
    secondaryColor: "#FFFFFF",
    icon: "⚔️",
    gradient: "from-green-600 via-green-700 to-white",
    city: "Torreón",
    founded: 1983,
    stadium: "Estadio Corona",
    capacity: 30000,
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/06/Santos-Laguna-Logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Estadio_Corona_-_panoramica.jpg/800px-Estadio_Corona_-_panoramica.jpg",
    facts: [
      "Es famoso por desarrollar jóvenes talentos mexicanos",
      "Ganó 6 títulos de liga en 20 años",
      "Su filosofía se basa en el fútbol ofensivo",
      "Ha exportado muchos jugadores a Europa"
    ],
    achievements: ["6 Títulos de Liga", "2 CONCACAF Champions", "2 Copas México"],
    rivals: ["Tigres", "León", "Atlas"]
  }
};

export function getTeamBySlug(slug: string): TeamConfig | null {
  return TEAM_CONFIGS[slug] || null;
}

export function getAllTeams(): TeamConfig[] {
  return Object.values(TEAM_CONFIGS);
}

export function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}