// Dynamic team facts and trivia data
export interface TeamFact {
  id: string;
  category: 'history' | 'stadium' | 'players' | 'culture' | 'achievements' | 'curiosity';
  text: {
    es: string;
    en: string;
    fr: string;
  };
  icon: string;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface TeamTrivia {
  teamSlug: string;
  foundation: {
    year: number;
    story: {
      es: string;
      en: string;
      fr: string;
    };
  };
  stadium: {
    name: string;
    capacity: number;
    yearBuilt: number;
    nickname: {
      es: string;
      en: string;
      fr: string;
    };
  };
  achievements: {
    ligaTitles: number;
    copaTitles: number;
    internationalTitles: number;
    lastTitle: number;
  };
  legends: Array<{
    name: string;
    position: string;
    years: string;
    achievements: {
      es: string;
      en: string;
      fr: string;
    };
  }>;
  rivalries: Array<{
    team: string;
    intensity: 'medium' | 'high' | 'clasico';
    name: {
      es: string;
      en: string;
      fr: string;
    };
  }>;
  curiosities: TeamFact[];
}

export const TEAM_TRIVIA: Record<string, TeamTrivia> = {
  america: {
    teamSlug: "america",
    foundation: {
      year: 1916,
      story: {
        es: "Fundado por estudiantes del Colegio Mascarones, originalmente se llamó Club de Fútbol América",
        en: "Founded by students from Colegio Mascarones, originally called Club de Fútbol América",
        fr: "Fondé par des étudiants du Colegio Mascarones, initialement appelé Club de Fútbol América",
      },
    },
    stadium: {
      name: "Estadio Azteca",
      capacity: 87523,
      yearBuilt: 1966,
      nickname: {
        es: "El Coloso de Santa Úrsula",
        en: "The Colossus of Santa Úrsula",
        fr: "Le Colosse de Santa Úrsula",
      },
    },
    achievements: {
      ligaTitles: 15,
      copaTitles: 6,
      internationalTitles: 7,
      lastTitle: 2024,
    },
    legends: [
      {
        name: "Cuauhtémoc Blanco",
        position: "Mediocampista Ofensivo",
        years: "1992-1998, 2004-2007",
        achievements: {
          es: "3 títulos de liga, ídolo absoluto del club",
          en: "3 league titles, absolute club idol",
          fr: "3 titres de championnat, idole absolue du club",
        },
      },
      {
        name: "Carlos Reinoso",
        position: "Mediocampista",
        years: "1970-1982",
        achievements: {
          es: "6 títulos de liga, considerado el mejor extranjero en la historia del club",
          en: "6 league titles, considered the best foreigner in club history",
          fr: "6 titres de championnat, considéré comme le meilleur étranger de l'histoire du club",
        },
      },
    ],
    rivalries: [
      {
        team: "chivas",
        intensity: "clasico",
        name: {
          es: "El Clásico Nacional",
          en: "The National Classic",
          fr: "Le Classique National",
        },
      },
      {
        team: "pumas",
        intensity: "high",
        name: {
          es: "El Clásico Capitalino",
          en: "The Capital Classic",
          fr: "Le Classique de la Capitale",
        },
      },
    ],
    curiosities: [
      {
        id: "america_1",
        category: "history",
        text: {
          es: "Las Águilas han jugado más finales que cualquier otro equipo en la historia de México",
          en: "Las Águilas have played more finals than any other team in Mexican history",
          fr: "Las Águilas ont joué plus de finales que toute autre équipe de l'histoire mexicaine",
        },
        icon: "🏆",
        rarity: "rare",
      },
      {
        id: "america_2",
        category: "stadium",
        text: {
          es: "El Estadio Azteca fue sede de dos Copas del Mundo y es el único estadio en albergar dos finales mundialistas",
          en: "Estadio Azteca hosted two World Cups and is the only stadium to host two World Cup finals",
          fr: "L'Estadio Azteca a accueilli deux Coupes du Monde et est le seul stade à avoir accueilli deux finales de Coupe du Monde",
        },
        icon: "🌍",
        rarity: "legendary",
      },
      {
        id: "america_3",
        category: "culture",
        text: {
          es: "América es conocido como 'El Más Odiado' porque tradicionalmente ha sido el equipo más exitoso",
          en: "América is known as 'The Most Hated' because it has traditionally been the most successful team",
          fr: "América est connu comme 'Le Plus Détesté' car il a traditionnellement été l'équipe la plus titrée",
        },
        icon: "😈",
        rarity: "common",
      },
    ],
  },
  chivas: {
    teamSlug: "chivas",
    foundation: {
      year: 1906,
      story: {
        es: "Fundado por Edgar Everaert, mantiene la tradición de solo contratar jugadores mexicanos",
        en: "Founded by Edgar Everaert, maintains the tradition of only hiring Mexican players",
        fr: "Fondé par Edgar Everaert, maintient la tradition de n'embaucher que des joueurs mexicains",
      },
    },
    stadium: {
      name: "Estadio Akron",
      capacity: 49850,
      yearBuilt: 2010,
      nickname: {
        es: "La Casa del Rebaño",
        en: "The House of the Herd",
        fr: "La Maison du Troupeau",
      },
    },
    achievements: {
      ligaTitles: 12,
      copaTitles: 4,
      internationalTitles: 2,
      lastTitle: 2017,
    },
    legends: [
      {
        name: "Omar Bravo",
        position: "Delantero",
        years: "2003-2008, 2014-2019",
        achievements: {
          es: "Máximo goleador histórico del club con 122 goles",
          en: "All-time leading scorer with 122 goals",
          fr: "Meilleur buteur de tous les temps avec 122 buts",
        },
      },
      {
        name: "Salvador Reyes",
        position: "Defensa",
        years: "1948-1964",
        achievements: {
          es: "Leyenda del club, jugó 16 temporadas consecutivas",
          en: "Club legend, played 16 consecutive seasons",
          fr: "Légende du club, a joué 16 saisons consécutives",
        },
      },
    ],
    rivalries: [
      {
        team: "america",
        intensity: "clasico",
        name: {
          es: "El Clásico Nacional",
          en: "The National Classic",
          fr: "Le Classique National",
        },
      },
      {
        team: "atlas",
        intensity: "high",
        name: {
          es: "El Clásico Tapatío",
          en: "The Tapatío Classic",
          fr: "Le Classique Tapatío",
        },
      },
    ],
    curiosities: [
      {
        id: "chivas_1",
        category: "culture",
        text: {
          es: "Es el único equipo grande del mundo que solo contrata jugadores de su nacionalidad",
          en: "It's the only major team in the world that only hires players from its nationality",
          fr: "C'est la seule grande équipe au monde qui n'embauche que des joueurs de sa nationalité",
        },
        icon: "🇲🇽",
        rarity: "legendary",
      },
      {
        id: "chivas_2",
        category: "achievements",
        text: {
          es: "Chivas es el único equipo mexicano en ganar la Copa Libertadores de América",
          en: "Chivas is the only Mexican team to win the Copa Libertadores",
          fr: "Chivas est la seule équipe mexicaine à avoir remporté la Copa Libertadores",
        },
        icon: "🏆",
        rarity: "rare",
      },
      {
        id: "chivas_3",
        category: "history",
        text: {
          es: "El nombre 'Chivas' viene de la tradición de usar cabras como mascota desde 1948",
          en: "The name 'Chivas' comes from the tradition of using goats as mascots since 1948",
          fr: "Le nom 'Chivas' vient de la tradition d'utiliser des chèvres comme mascottes depuis 1948",
        },
        icon: "🐐",
        rarity: "common",
      },
    ],
  },
  "cruz-azul": {
    teamSlug: "cruz-azul",
    foundation: {
      year: 1927,
      story: {
        es: "Fundado por trabajadores de la empresa cementera Cemento Cruz Azul en Hidalgo",
        en: "Founded by workers from the cement company Cemento Cruz Azul in Hidalgo",
        fr: "Fondé par des travailleurs de la cimenterie Cemento Cruz Azul à Hidalgo",
      },
    },
    stadium: {
      name: "Estadio Ciudad de los Deportes",
      capacity: 35161,
      yearBuilt: 1946,
      nickname: {
        es: "La Noria",
        en: "La Noria",
        fr: "La Noria",
      },
    },
    achievements: {
      ligaTitles: 9,
      copaTitles: 5,
      internationalTitles: 6,
      lastTitle: 2021,
    },
    legends: [
      {
        name: "Carlos Hermosillo",
        position: "Delantero",
        years: "1982-1991",
        achievements: {
          es: "Máximo goleador histórico con 294 goles en México",
          en: "All-time leading scorer with 294 goals in Mexico",
          fr: "Meilleur buteur de tous les temps avec 294 buts au Mexique",
        },
      },
    ],
    rivalries: [
      {
        team: "america",
        intensity: "high",
        name: {
          es: "Clásico Joven",
          en: "Young Classic",
          fr: "Classique Jeune",
        },
      },
    ],
    curiosities: [
      {
        id: "cruz_azul_1",
        category: "curiosity",
        text: {
          es: "Cruz Azul es famoso por perder finales de manera dramática, fenómeno conocido como 'Cruzazuleada'",
          en: "Cruz Azul is famous for losing finals dramatically, a phenomenon known as 'Cruzazuleada'",
          fr: "Cruz Azul est célèbre pour perdre des finales de manière dramatique, un phénomène connu sous le nom de 'Cruzazuleada'",
        },
        icon: "💔",
        rarity: "legendary",
      },
    ],
  },
  pumas: {
    teamSlug: "pumas",
    foundation: {
      year: 1954,
      story: {
        es: "Surgió de la Universidad Nacional Autónoma de México como equipo estudiantil",
        en: "Emerged from the National Autonomous University of Mexico as a student team",
        fr: "Issu de l'Université nationale autonome du Mexique en tant qu'équipe étudiante",
      },
    },
    stadium: {
      name: "Estadio Olímpico Universitario",
      capacity: 72449,
      yearBuilt: 1952,
      nickname: {
        es: "Ciudad Universitaria",
        en: "University City",
        fr: "Cité Universitaire",
      },
    },
    achievements: {
      ligaTitles: 7,
      copaTitles: 3,
      internationalTitles: 3,
      lastTitle: 2011,
    },
    legends: [
      {
        name: "Hugo Sánchez",
        position: "Delantero",
        years: "1976-1981",
        achievements: {
          es: "Considerado el mejor futbolista mexicano de todos los tiempos",
          en: "Considered the greatest Mexican footballer of all time",
          fr: "Considéré comme le plus grand footballeur mexicain de tous les temps",
        },
      },
    ],
    rivalries: [
      {
        team: "america",
        intensity: "high",
        name: {
          es: "El Clásico Capitalino",
          en: "The Capital Classic",
          fr: "Le Classique de la Capitale",
        },
      },
    ],
    curiosities: [
      {
        id: "pumas_1",
        category: "players",
        text: {
          es: "Pumas es la cantera que más jugadores ha aportado a la Selección Mexicana",
          en: "Pumas is the academy that has contributed most players to the Mexican National Team",
          fr: "Pumas est l'académie qui a contribué le plus de joueurs à l'équipe nationale mexicaine",
        },
        icon: "🎓",
        rarity: "rare",
      },
    ],
  },
  tigres: {
    teamSlug: "tigres",
    foundation: {
      year: 1960,
      story: {
        es: "Fundado por estudiantes de la Universidad Autónoma de Nuevo León",
        en: "Founded by students from the Autonomous University of Nuevo León",
        fr: "Fondé par des étudiants de l'Université autonome de Nuevo León",
      },
    },
    stadium: {
      name: "Estadio Universitario",
      capacity: 41615,
      yearBuilt: 1967,
      nickname: {
        es: "El Volcán",
        en: "The Volcano",
        fr: "Le Volcan",
      },
    },
    achievements: {
      ligaTitles: 8,
      copaTitles: 3,
      internationalTitles: 1,
      lastTitle: 2023,
    },
    legends: [
      {
        name: "André-Pierre Gignac",
        position: "Delantero",
        years: "2015-presente",
        achievements: {
          es: "Máximo goleador extranjero en la historia de Liga MX",
          en: "Top foreign scorer in Liga MX history",
          fr: "Meilleur buteur étranger de l'histoire de la Liga MX",
        },
      },
    ],
    rivalries: [
      {
        team: "monterrey",
        intensity: "clasico",
        name: {
          es: "El Clásico Regiomontano",
          en: "The Regiomontano Classic",
          fr: "Le Classique Regiomontano",
        },
      },
    ],
    curiosities: [
      {
        id: "tigres_1",
        category: "achievements",
        text: {
          es: "Tigres llegó a la final del Mundial de Clubes en 2020, siendo el primer equipo de CONCACAF en lograrlo",
          en: "Tigres reached the Club World Cup final in 2020, being the first CONCACAF team to achieve it",
          fr: "Tigres a atteint la finale de la Coupe du Monde des Clubs en 2020, étant la première équipe de CONCACAF à y parvenir",
        },
        icon: "🌍",
        rarity: "legendary",
      },
    ],
  },
  monterrey: {
    teamSlug: "monterrey",
    foundation: {
      year: 1945,
      story: {
        es: "Fundado por empresarios regiomontanos con el sueño de tener un gran equipo en el norte",
        en: "Founded by regiomontano businessmen with the dream of having a great team in the north",
        fr: "Fondé par des hommes d'affaires regiomontanos avec le rêve d'avoir une grande équipe dans le nord",
      },
    },
    stadium: {
      name: "Estadio BBVA",
      capacity: 53500,
      yearBuilt: 2015,
      nickname: {
        es: "El Gigante de Acero",
        en: "The Steel Giant",
        fr: "Le Géant d'Acier",
      },
    },
    achievements: {
      ligaTitles: 5,
      copaTitles: 3,
      internationalTitles: 5,
      lastTitle: 2022,
    },
    legends: [
      {
        name: "Humberto Suazo",
        position: "Delantero",
        years: "2007-2015",
        achievements: {
          es: "Máximo goleador histórico del club con 121 goles",
          en: "All-time leading scorer with 121 goals",
          fr: "Meilleur buteur de tous les temps avec 121 buts",
        },
      },
    ],
    rivalries: [
      {
        team: "tigres",
        intensity: "clasico",
        name: {
          es: "El Clásico Regiomontano",
          en: "The Regiomontano Classic",
          fr: "Le Classique Regiomontano",
        },
      },
    ],
    curiosities: [
      {
        id: "monterrey_1",
        category: "stadium",
        text: {
          es: "El Estadio BBVA es considerado uno de los más modernos y tecnológicos del mundo",
          en: "Estadio BBVA is considered one of the most modern and technological in the world",
          fr: "L'Estadio BBVA est considéré comme l'un des plus modernes et technologiques au monde",
        },
        icon: "🏗️",
        rarity: "rare",
      },
    ],
  },
};

// Function to get random facts for a team
export function getRandomTeamFacts(teamSlug: string, count: number = 3): TeamFact[] {
  const teamData = TEAM_TRIVIA[teamSlug];
  if (!teamData) return [];
  
  const allFacts = teamData.curiosities;
  const shuffled = [...allFacts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get team trivia by slug
export function getTeamTrivia(teamSlug: string): TeamTrivia | null {
  return TEAM_TRIVIA[teamSlug] || null;
}