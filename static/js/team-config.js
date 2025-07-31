// Team Configuration - Liga MX Teams
// Replicating exact team data from React version

const teamConfigs = [
  {
    id: 'america',
    name: 'Club América',
    nickname: 'Las Águilas',
    slug: 'america',
    primaryColor: '#FFD700',
    secondaryColor: '#000080',
    icon: 'fas fa-eagle',
    logo: null,
    stadium: 'Estadio Azteca',
    city: 'Ciudad de México',
    facts: [
      'Fundado en 1916',
      'El equipo más exitoso de México',
      '13 títulos de Liga MX',
      'Estadio Azteca, capacidad 87,000'
    ]
  },
  {
    id: 'chivas',
    name: 'Club Deportivo Guadalajara',
    nickname: 'Chivas',
    slug: 'chivas',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-goat',
    logo: null,
    stadium: 'Estadio Akron',
    city: 'Guadalajara',
    facts: [
      'Fundado en 1906',
      'Solo juega con mexicanos',
      '12 títulos de Liga MX',
      'El Rebaño Sagrado'
    ]
  },
  {
    id: 'cruz-azul',
    name: 'Cruz Azul',
    nickname: 'La Máquina',
    slug: 'cruz-azul',
    primaryColor: '#0066CC',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-cross',
    logo: null,
    stadium: 'Estadio Azteca',
    city: 'Ciudad de México',
    facts: [
      'Fundado en 1927',
      'La Máquina Celeste',
      '9 títulos de Liga MX',
      'Rompió la maldición en 2021'
    ]
  },
  {
    id: 'pumas',
    name: 'Club Universidad Nacional',
    nickname: 'Pumas',
    slug: 'pumas',
    primaryColor: '#003366',
    secondaryColor: '#FFCC00',
    icon: 'fas fa-paw',
    logo: null,
    stadium: 'Estadio Olímpico Universitario',
    city: 'Ciudad de México',
    facts: [
      'Fundado en 1954',
      'Universidad Nacional',
      '7 títulos de Liga MX',
      'Goya Universitario'
    ]
  },
  {
    id: 'tigres',
    name: 'Tigres UANL',
    nickname: 'Los Tigres',
    slug: 'tigres',
    primaryColor: '#FFD700',
    secondaryColor: '#000000',
    icon: 'fas fa-tiger-head',
    logo: null,
    stadium: 'Estadio Universitario',
    city: 'San Nicolás de los Garza',
    facts: [
      'Fundado en 1960',
      'Los Felinos',
      '8 títulos de Liga MX',
      'Campeones de Concacaf'
    ]
  },
  {
    id: 'monterrey',
    name: 'Club de Fútbol Monterrey',
    nickname: 'Rayados',
    slug: 'monterrey',
    primaryColor: '#003366',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-mountain',
    logo: null,
    stadium: 'Estadio BBVA',
    city: 'Guadalupe',
    facts: [
      'Fundado en 1945',
      'La Pandilla',
      '5 títulos de Liga MX',
      'Estadio BBVA moderno'
    ]
  },
  {
    id: 'santos',
    name: 'Santos Laguna',
    nickname: 'Los Guerreros',
    slug: 'santos',
    primaryColor: '#006600',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-shield-alt',
    logo: null,
    stadium: 'Estadio Corona',
    city: 'Torreón',
    facts: [
      'Fundado en 1983',
      'Los Guerreros',
      '6 títulos de Liga MX',
      'Cuna de talentos'
    ]
  },
  {
    id: 'leon',
    name: 'Club León',
    nickname: 'La Fiera',
    slug: 'leon',
    primaryColor: '#00AA00',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-lion',
    logo: null,
    stadium: 'Estadio León',
    city: 'León',
    facts: [
      'Fundado en 1944',
      'La Fiera',
      '8 títulos de Liga MX',
      'Equipo histórico'
    ]
  },
  {
    id: 'toluca',
    name: 'Deportivo Toluca FC',
    nickname: 'Los Diablos Rojos',
    slug: 'toluca',
    primaryColor: '#CC0000',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-fire',
    logo: null,
    stadium: 'Estadio Nemesio Díez',
    city: 'Toluca',
    facts: [
      'Fundado en 1917',
      'Los Diablos Rojos',
      '10 títulos de Liga MX',
      'La Bombonera'
    ]
  },
  {
    id: 'pachuca',
    name: 'Club de Fútbol Pachuca',
    nickname: 'Los Tuzos',
    slug: 'pachuca',
    primaryColor: '#0066CC',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-hammer',
    logo: null,
    stadium: 'Estadio Hidalgo',
    city: 'Pachuca',
    facts: [
      'Fundado en 1901',
      'Los Tuzos',
      '7 títulos de Liga MX',
      'Primer equipo mexicano'
    ]
  },
  {
    id: 'atlas',
    name: 'Atlas FC',
    nickname: 'Los Rojinegros',
    slug: 'atlas',
    primaryColor: '#CC0000',
    secondaryColor: '#000000',
    icon: 'fas fa-globe',
    logo: null,
    stadium: 'Estadio Jalisco',
    city: 'Guadalajara',
    facts: [
      'Fundado en 1916',
      'Los Rojinegros',
      '1 título de Liga MX',
      'Rompió sequía de 70 años'
    ]
  },
  {
    id: 'necaxa',
    name: 'Club Necaxa',
    nickname: 'Los Rayos',
    slug: 'necaxa',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-bolt',
    logo: null,
    stadium: 'Estadio Victoria',
    city: 'Aguascalientes',
    facts: [
      'Fundado en 1923',
      'Los Rayos',
      '3 títulos de Liga MX',
      'Equipo histórico'
    ]
  },
  {
    id: 'tijuana',
    name: 'Club Tijuana',
    nickname: 'Xolos',
    slug: 'tijuana',
    primaryColor: '#CC0000',
    secondaryColor: '#000000',
    icon: 'fas fa-dog',
    logo: null,
    stadium: 'Estadio Caliente',
    city: 'Tijuana',
    facts: [
      'Fundado en 2007',
      'Xoloitzcuintles',
      '1 título de Liga MX',
      'Equipo fronterizo'
    ]
  },
  {
    id: 'puebla',
    name: 'Club Puebla',
    nickname: 'La Franja',
    slug: 'puebla',
    primaryColor: '#003366',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-church',
    logo: null,
    stadium: 'Estadio Cuauhtémoc',
    city: 'Puebla',
    facts: [
      'Fundado en 1944',
      'La Franja',
      '2 títulos de Liga MX',
      'Estadio histórico'
    ]
  },
  {
    id: 'queretaro',
    name: 'Querétaro FC',
    nickname: 'Los Gallos Blancos',
    slug: 'queretaro',
    primaryColor: '#003366',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-feather',
    logo: null,
    stadium: 'Estadio La Corregidora',
    city: 'Querétaro',
    facts: [
      'Fundado en 1950',
      'Los Gallos Blancos',
      '1 título de Liga MX',
      'Equipo del Bajío'
    ]
  },
  {
    id: 'mazatlan',
    name: 'Mazatlán FC',
    nickname: 'Los Cañoneros',
    slug: 'mazatlan',
    primaryColor: '#663399',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-anchor',
    logo: null,
    stadium: 'Estadio de Mazatlán',
    city: 'Mazatlán',
    facts: [
      'Fundado en 2020',
      'Los Cañoneros',
      '0 títulos de Liga MX',
      'Equipo más joven'
    ]
  },
  {
    id: 'fc-juarez',
    name: 'FC Juárez',
    nickname: 'Los Bravos',
    slug: 'fc-juarez',
    primaryColor: '#006600',
    secondaryColor: '#FF0000',
    icon: 'fas fa-cactus',
    logo: null,
    stadium: 'Estadio Olímpico Benito Juárez',
    city: 'Ciudad Juárez',
    facts: [
      'Fundado en 2015',
      'Los Bravos',
      '0 títulos de Liga MX',
      'Equipo fronterizo'
    ]
  },
  {
    id: 'atletico-san-luis',
    name: 'Atlético de San Luis',
    nickname: 'Los Potosinos',
    slug: 'atletico-san-luis',
    primaryColor: '#CC0000',
    secondaryColor: '#FFFFFF',
    icon: 'fas fa-mountain-sun',
    logo: null,
    stadium: 'Estadio Alfonso Lastras',
    city: 'San Luis Potosí',
    facts: [
      'Fundado en 2013',
      'Los Potosinos',
      '0 títulos de Liga MX',
      'Equipo del altiplano'
    ]
  }
];

// Helper functions
function getTeamBySlug(slug) {
  return teamConfigs.find(team => team.slug === slug);
}

function getAllTeams() {
  return teamConfigs;
}

function getTeamColors(teamSlug) {
  const team = getTeamBySlug(teamSlug);
  return team ? {
    primary: team.primaryColor,
    secondary: team.secondaryColor
  } : null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    teamConfigs,
    getTeamBySlug,
    getAllTeams,
    getTeamColors
  };
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.TeamConfig = {
    teamConfigs,
    getTeamBySlug,
    getAllTeams,
    getTeamColors
  };
}