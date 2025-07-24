import { type Team } from "@shared/schema";

export interface TeamConfig {
  slug: string;
  name: string;
  nickname: string;
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  gradient: string;
}

export const TEAM_CONFIGS: Record<string, TeamConfig> = {
  america: {
    slug: "america",
    name: "Club América",
    nickname: "Las Águilas",
    primaryColor: "#FFD700",
    secondaryColor: "#003366",
    icon: "🦅",
    gradient: "from-yellow-400 via-yellow-500 to-blue-900"
  },
  chivas: {
    slug: "chivas",
    name: "Chivas Guadalajara",
    nickname: "El Rebaño",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "🐐",
    gradient: "from-red-600 via-red-700 to-white"
  },
  "cruz-azul": {
    slug: "cruz-azul",
    name: "Cruz Azul",
    nickname: "La Máquina",
    primaryColor: "#1F4E79",
    secondaryColor: "#FFFFFF",
    icon: "⚙️",
    gradient: "from-blue-700 via-blue-800 to-blue-900"
  },
  pumas: {
    slug: "pumas",
    name: "Pumas UNAM",
    nickname: "Los Pumas",
    primaryColor: "#003366",
    secondaryColor: "#FFD700",
    icon: "🐾",
    gradient: "from-blue-900 via-blue-800 to-yellow-500"
  },
  tigres: {
    slug: "tigres",
    name: "Tigres UANL",
    nickname: "Los Tigres",
    primaryColor: "#FFB300",
    secondaryColor: "#003366",
    icon: "🐅",
    gradient: "from-yellow-500 via-orange-500 to-blue-900"
  },
  monterrey: {
    slug: "monterrey",
    name: "CF Monterrey",
    nickname: "Los Rayados",
    primaryColor: "#003366",
    secondaryColor: "#FFFFFF",
    icon: "🏔️",
    gradient: "from-blue-900 via-slate-700 to-gray-200"
  },
  santos: {
    slug: "santos",
    name: "Santos Laguna",
    nickname: "Los Guerreros",
    primaryColor: "#00A651",
    secondaryColor: "#FFFFFF",
    icon: "⚔️",
    gradient: "from-green-600 via-green-700 to-white"
  },
  leon: {
    slug: "leon",
    name: "Club León",
    nickname: "La Fiera",
    primaryColor: "#00A651",
    secondaryColor: "#FFD700",
    icon: "🦁",
    gradient: "from-green-700 via-green-600 to-yellow-400"
  },
  juarez: {
    slug: "juarez",
    name: "FC Juárez",
    nickname: "Los Bravos",
    primaryColor: "#E50022",
    secondaryColor: "#000000",
    icon: "🎯",
    gradient: "from-red-600 via-red-700 to-black"
  },
  atlas: {
    slug: "atlas",
    name: "Atlas FC",
    nickname: "Los Zorros",
    primaryColor: "#E50022",
    secondaryColor: "#000000",
    icon: "🦊",
    gradient: "from-red-600 via-red-800 to-black"
  },
  pachuca: {
    slug: "pachuca",
    name: "CF Pachuca",
    nickname: "Los Tuzos",
    primaryColor: "#1F4E79",
    secondaryColor: "#FFFFFF",
    icon: "⚡",
    gradient: "from-blue-700 via-blue-800 to-white"
  },
  toluca: {
    slug: "toluca",
    name: "Deportivo Toluca",
    nickname: "Los Diablos Rojos",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "😈",
    gradient: "from-red-600 via-red-700 to-white"
  },
  mazatlan: {
    slug: "mazatlan",
    name: "Mazatlán FC",
    nickname: "Los Cañoneros",
    primaryColor: "#8B008B",
    secondaryColor: "#FFD700",
    icon: "⚓",
    gradient: "from-purple-700 via-purple-800 to-yellow-400"
  },
  puebla: {
    slug: "puebla",
    name: "Club Puebla",
    nickname: "La Franja",
    primaryColor: "#1F4E79",
    secondaryColor: "#FFFFFF",
    icon: "🏛️",
    gradient: "from-blue-700 via-blue-800 to-white"
  },
  queretaro: {
    slug: "queretaro",
    name: "Querétaro FC",
    nickname: "Los Gallos Blancos",
    primaryColor: "#000000",
    secondaryColor: "#1F4E79",
    icon: "🐓",
    gradient: "from-black via-gray-800 to-blue-700"
  },
  tijuana: {
    slug: "tijuana",
    name: "Club Tijuana",
    nickname: "Los Xolos",
    primaryColor: "#E50022",
    secondaryColor: "#000000",
    icon: "🐕",
    gradient: "from-red-600 via-red-800 to-black"
  },
  necaxa: {
    slug: "necaxa",
    name: "Necaxa",
    nickname: "Los Rayos",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "⚡",
    gradient: "from-red-600 via-red-700 to-white"
  },
  "atletico-san-luis": {
    slug: "atletico-san-luis",
    name: "Atlético de San Luis",
    nickname: "Los Potosinos",
    primaryColor: "#FF0000",
    secondaryColor: "#FFFFFF",
    icon: "🔴",
    gradient: "from-red-500 via-red-600 to-white"
  }
};

export function getTeamConfig(slug: string): TeamConfig | undefined {
  return TEAM_CONFIGS[slug];
}

export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

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

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
