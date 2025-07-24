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
    secondaryColor: "#1F4E79",
    icon: "fas fa-crown",
    gradient: "from-yellow-400 to-blue-800"
  },
  chivas: {
    slug: "chivas",
    name: "Chivas Guadalajara",
    nickname: "El Rebaño",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "fas fa-mountain",
    gradient: "from-red-600 to-white"
  },
  "cruz-azul": {
    slug: "cruz-azul",
    name: "Cruz Azul",
    nickname: "La Máquina",
    primaryColor: "#1F4E79",
    secondaryColor: "#FFFFFF",
    icon: "fas fa-cross",
    gradient: "from-blue-700 to-blue-900"
  },
  pumas: {
    slug: "pumas",
    name: "Pumas UNAM",
    nickname: "Los Pumas",
    primaryColor: "#003366",
    secondaryColor: "#FFD700",
    icon: "fas fa-cat",
    gradient: "from-blue-900 to-yellow-500"
  },
  tigres: {
    slug: "tigres",
    name: "Tigres UANL",
    nickname: "Los Tigres",
    primaryColor: "#FFB300",
    secondaryColor: "#003366",
    icon: "fas fa-paw",
    gradient: "from-yellow-500 to-blue-900"
  },
  monterrey: {
    slug: "monterrey",
    name: "CF Monterrey",
    nickname: "Los Rayados",
    primaryColor: "#003366",
    secondaryColor: "#FFFFFF",
    icon: "fas fa-mountain",
    gradient: "from-blue-900 to-gray-200"
  },
  santos: {
    slug: "santos",
    name: "Santos Laguna",
    nickname: "Los Guerreros",
    primaryColor: "#00A651",
    secondaryColor: "#FFFFFF",
    icon: "fas fa-leaf",
    gradient: "from-green-600 to-white"
  },
  leon: {
    slug: "leon",
    name: "Club León",
    nickname: "La Fiera",
    primaryColor: "#00A651",
    secondaryColor: "#FFD700",
    icon: "fas fa-shield-alt",
    gradient: "from-green-700 to-yellow-400"
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
