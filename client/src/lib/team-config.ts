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
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/club-america-vector-logo.png",
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
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/chivas-guadalajara-vector-logo.png",
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
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/cruz-azul-vector-logo.png",
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
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/pumas-unam-vector-logo.png",
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
    capacity: 41870,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/tigres-uanl-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Estadio_Universitario_panorama.jpg/800px-Estadio_Universitario_panorama.jpg",
    facts: [
      "Es uno de los equipos más exitosos de la última década",
      "Ganó la final de la Liga de Campeones de la CONCACAF en 2020",
      "Su estadio tiene una de las mejores atmósferas de México",
      "Conocido por su juego físico y directo"
    ],
    achievements: ["8 Títulos de Liga", "5 CONCACAF Champions", "3 Copas México"],
    rivals: ["Monterrey", "Santos", "Pumas"]
  },
  monterrey: {
    slug: "monterrey",
    name: "CF Monterrey",
    nickname: "Los Rayados",
    primaryColor: "#003CA5",
    secondaryColor: "#FFFFFF",
    icon: "⚡",
    gradient: "from-blue-700 via-blue-600 to-white",
    city: "Monterrey",
    founded: 1945,
    stadium: "Estadio BBVA",
    capacity: 53500,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/monterrey-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Estadio_BBVA_Bancomer.jpg/800px-Estadio_BBVA_Bancomer.jpg",
    facts: [
      "Juega en uno de los estadios más modernos de América",
      "Es conocido por su gran organización y disciplina táctica",
      "Tiene el derbi regiomontano contra Tigres",
      "Ha sido campeón de la CONCACAF Champions League"
    ],
    achievements: ["5 Títulos de Liga", "4 CONCACAF Champions", "3 Copas México"],
    rivals: ["Tigres", "Santos", "América"]
  },
  santos: {
    slug: "santos",
    name: "Santos Laguna",
    nickname: "Los Guerreros",
    primaryColor: "#00A651",
    secondaryColor: "#FFFFFF",
    icon: "🛡️",
    gradient: "from-green-600 via-green-700 to-white",
    city: "Torreón",
    founded: 1983,
    stadium: "Estadio Corona",
    capacity: 30050,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/santos-laguna-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Estadio_Corona_TSM.jpg/800px-Estadio_Corona_TSM.jpg",
    facts: [
      "Es uno de los equipos más jóvenes pero exitosos",
      "Ha ganado 6 títulos desde su fundación en 1983",
      "Conocido por formar grandes jugadores jóvenes",
      "Su afición es muy apasionada y leal"
    ],
    achievements: ["6 Títulos de Liga", "2 CONCACAF Champions", "1 Copa México"],
    rivals: ["Monterrey", "Tigres", "León"]
  },
  atlas: {
    slug: "atlas",
    name: "Atlas FC",
    nickname: "Los Zorros",
    primaryColor: "#E50022",
    secondaryColor: "#000000",
    icon: "🦊",
    gradient: "from-red-600 via-red-700 to-black",
    city: "Guadalajara",
    founded: 1916,
    stadium: "Estadio Jalisco",
    capacity: 56713,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/atlas-fc-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Estadio_Jalisco.jpg/800px-Estadio_Jalisco.jpg",
    facts: [
      "Rompió una sequía de 70 años sin título en 2021",
      "Es el equipo más antiguo de Guadalajara",
      "Comparte ciudad con las Chivas",
      "Conocido por su resistencia y nunca rendirse"
    ],
    achievements: ["2 Títulos de Liga", "0 CONCACAF Champions", "3 Copas México"],
    rivals: ["Chivas", "León", "América"]
  },
  leon: {
    slug: "leon",
    name: "Club León",
    nickname: "La Fiera",
    primaryColor: "#00A651",
    secondaryColor: "#FFFFFF",
    icon: "🦁",
    gradient: "from-green-500 via-green-600 to-white",
    city: "León",
    founded: 1944,
    stadium: "Estadio León",
    capacity: 31297,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/club-leon-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Estadio_Leon.jpg/800px-Estadio_Leon.jpg",
    facts: [
      "Renació después de estar en Segunda División",
      "Ha ganado dos títulos en la última década",
      "Es conocido por su juego ofensivo y vistoso",
      "Tiene una de las aficiones más fieles de México"
    ],
    achievements: ["8 Títulos de Liga", "1 CONCACAF Champions", "4 Copas México"],
    rivals: ["Atlas", "Chivas", "Santos"]
  },
  toluca: {
    slug: "toluca",
    name: "Deportivo Toluca",
    nickname: "Los Diablos Rojos",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "😈",
    gradient: "from-red-600 via-red-700 to-white",
    city: "Toluca",
    founded: 1917,
    stadium: "Estadio Nemesio Díez",
    capacity: 30000,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/toluca-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Estadio_Nemesio_Diez.jpg/800px-Estadio_Nemesio_Diez.jpg",
    facts: [
      "Es uno de los equipos más exitosos históricamente",
      "Su estadio está a gran altitud (2680 metros)",
      "Ha sido tricampeón en dos ocasiones",
      "Conocido como 'La Máquina Escarlata'"
    ],
    achievements: ["10 Títulos de Liga", "2 CONCACAF Champions", "3 Copas México"],
    rivals: ["América", "Cruz Azul", "Morelia"]
  },
  pachuca: {
    slug: "pachuca",
    name: "CF Pachuca",
    nickname: "Los Tuzos",
    primaryColor: "#003CA5",
    secondaryColor: "#FFFFFF",
    icon: "⛏️",
    gradient: "from-blue-700 via-blue-600 to-white",
    city: "Pachuca",
    founded: 1901,
    stadium: "Estadio Hidalgo",
    capacity: 30000,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/pachuca-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Estadio_Hidalgo.jpg/800px-Estadio_Hidalgo.jpg",
    facts: [
      "Es el equipo profesional más antiguo de México",
      "Ha ganado 5 títulos de CONCACAF Champions League",
      "Su escuela de fútbol es reconocida mundialmente",
      "Conocido por formar jugadores técnicos"
    ],
    achievements: ["6 Títulos de Liga", "5 CONCACAF Champions", "5 Copas México"],
    rivals: ["América", "Cruz Azul", "Toluca"]
  },
  puebla: {
    slug: "puebla",
    name: "Club Puebla",
    nickname: "La Franja",
    primaryColor: "#003CA5",
    secondaryColor: "#FFFFFF",
    icon: "🏛️",
    gradient: "from-blue-600 via-blue-700 to-white",
    city: "Puebla",
    founded: 1944,
    stadium: "Estadio Cuauhtémoc",
    capacity: 42648,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/puebla-fc-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estadio_Cuauhtemoc.jpg/800px-Estadio_Cuauhtemoc.jpg",
    facts: [
      "Su estadio albergó partidos del Mundial 1970 y 1986",
      "Es conocido por su resistencia y lucha",
      "Ha tenido varios ciclos exitosos en su historia",
      "Su afición es muy apasionada y fiel"
    ],
    achievements: ["2 Títulos de Liga", "0 CONCACAF Champions", "2 Copas México"],
    rivals: ["América", "Cruz Azul", "Atlante"]
  },
  tijuana: {
    slug: "tijuana",
    name: "Club Tijuana",
    nickname: "Los Xolos",
    primaryColor: "#E50022",
    secondaryColor: "#000000",
    icon: "🐕",
    gradient: "from-red-600 via-red-700 to-black",
    city: "Tijuana",
    founded: 2007,
    stadium: "Estadio Caliente",
    capacity: 27000,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/tijuana-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Estadio_Caliente.jpg/800px-Estadio_Caliente.jpg",
    facts: [
      "Es uno de los equipos más jóvenes de Primera División",
      "Ascendió rápidamente desde Tercera División",
      "Su mascot es el perro xoloitzcuintle",
      "Representa la frontera norte de México"
    ],
    achievements: ["1 Título de Liga", "0 CONCACAF Champions", "1 Copa México"],
    rivals: ["América", "Chivas", "Santos"]
  },
  necaxa: {
    slug: "necaxa",
    name: "Club Necaxa",
    nickname: "Los Rayos",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "⚡",
    gradient: "from-red-600 via-red-700 to-white",
    city: "Aguascalientes",
    founded: 1923,
    stadium: "Estadio Victoria",
    capacity: 25000,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/necaxa-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Estadio_Victoria_Aguascalientes.jpg/800px-Estadio_Victoria_Aguascalientes.jpg",
    facts: [
      "Fue bicampeón en los años 90",
      "Es conocido por su juego rápido y directo",
      "Tiene una rica historia en el fútbol mexicano",
      "Su afición es muy leal a pesar de los altibajos"
    ],
    achievements: ["3 Títulos de Liga", "1 CONCACAF Champions", "2 Copas México"],
    rivals: ["América", "Cruz Azul", "León"]
  },
  queretaro: {
    slug: "queretaro",
    name: "Querétaro FC",
    nickname: "Los Gallos Blancos",
    primaryColor: "#003CA5",
    secondaryColor: "#FFFFFF",
    icon: "🐓",
    gradient: "from-blue-700 via-blue-600 to-white",
    city: "Querétaro",
    founded: 1950,
    stadium: "Estadio Corregidora",
    capacity: 33162,
    logoUrl: "https://logoeps.com/wp-content/uploads/2013/03/queretaro-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Estadio_La_Corregidora.JPG/800px-Estadio_La_Corregidora.JPG",
    facts: [
      "Ha tenido varios ascensos y descensos",
      "Es conocido por ser un equipo luchador",
      "Su estadio tiene una buena atmosfera",
      "Representa el centro de México"
    ],
    achievements: ["0 Títulos de Liga", "0 CONCACAF Champions", "1 Copa México"],
    rivals: ["Toluca", "Pachuca", "León"]
  },
  mazatlan: {
    slug: "mazatlan",
    name: "Mazatlán FC",
    nickname: "Los Cañoneros",
    primaryColor: "#663399",
    secondaryColor: "#FFFFFF",
    icon: "🚢",
    gradient: "from-purple-600 via-purple-700 to-white",
    city: "Mazatlán",
    founded: 2020,
    stadium: "Estadio El Encanto",
    capacity: 25000,
    logoUrl: "https://logoeps.com/wp-content/uploads/2020/02/mazatlan-fc-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Estadio_El_Encanto.jpg/800px-Estadio_El_Encanto.jpg",
    facts: [
      "Es el equipo más nuevo de Primera División",
      "Representa el puerto de Mazatlán",
      "Su estadio está cerca del océano Pacífico",
      "Busca establecerse en la máxima categoría"
    ],
    achievements: ["0 Títulos de Liga", "0 CONCACAF Champions", "0 Copas México"],
    rivals: ["Tijuana", "Santos", "León"]
  },
  juarez: {
    slug: "juarez",
    name: "FC Juárez",
    nickname: "Los Bravos",
    primaryColor: "#E50022",
    secondaryColor: "#000000",
    icon: "🤠",
    gradient: "from-red-600 via-red-700 to-black",
    city: "Ciudad Juárez",
    founded: 2015,
    stadium: "Estadio Olímpico Benito Juárez",
    capacity: 22500,
    logoUrl: "https://logoeps.com/wp-content/uploads/2015/10/fc-juarez-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Estadio_Olimpico_Benito_Juarez.jpg/800px-Estadio_Olimpico_Benito_Juarez.jpg",
    facts: [
      "Representa la frontera norte de México",
      "Es un equipo joven pero ambicioso",
      "Su afición está creciendo rápidamente",
      "Busca consolidarse en Primera División"
    ],
    achievements: ["0 Títulos de Liga", "0 CONCACAF Champions", "0 Copas México"],
    rivals: ["Tijuana", "América", "Cruz Azul"]
  },
  "atletico-san-luis": {
    slug: "atletico-san-luis",
    name: "Atlético San Luis",
    nickname: "Los Rojiblancos",
    primaryColor: "#E50022",
    secondaryColor: "#FFFFFF",
    icon: "⚔️",
    gradient: "from-red-600 via-red-700 to-white",
    city: "San Luis Potosí",
    founded: 1957,
    stadium: "Estadio Alfonso Lastras",
    capacity: 25709,
    logoUrl: "https://logoeps.com/wp-content/uploads/2019/05/atletico-san-luis-vector-logo.png",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Estadio_Alfonso_Lastras_Ramirez.JPG/800px-Estadio_Alfonso_Lastras_Ramirez.JPG",
    facts: [
      "Regresó a Primera División después de varios años",
      "Tiene una rica historia en el fútbol mexicano",
      "Su estadio tiene una atmósfera única",
      "Es conocido por su garra y determinación"
    ],
    achievements: ["1 Título de Liga", "0 CONCACAF Champions", "1 Copa México"],
    rivals: ["León", "Toluca", "Pachuca"]
  }
};

export const TEAM_SLUGS = Object.keys(TEAM_CONFIGS);

export function getTeamBySlug(slug: string): TeamConfig | null {
  return TEAM_CONFIGS[slug] || null;
}

export function getAllTeams(): TeamConfig[] {
  return Object.values(TEAM_CONFIGS);
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