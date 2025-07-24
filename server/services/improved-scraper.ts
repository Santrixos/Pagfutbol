import { type Team, type Match, type Standing, type Player } from '../../shared/schema';

// Mock data that simulates real Liga MX data
export class ImprovedScraper {
  private static instance: ImprovedScraper;

  public static getInstance(): ImprovedScraper {
    if (!ImprovedScraper.instance) {
      ImprovedScraper.instance = new ImprovedScraper();
    }
    return ImprovedScraper.instance;
  }

  async scrapeTeams(): Promise<Team[]> {
    // Liga MX teams data that matches schema
    return [
      {
        id: 1,
        name: "Club América",
        slug: "america",
        nickname: "Las Águilas",
        primaryColor: "#FFD700",
        secondaryColor: "#003366",
        logo: null,
        stadium: "Estadio Azteca",
        city: "Ciudad de México"
      },
      {
        id: 2,
        name: "Chivas Guadalajara",
        slug: "chivas",
        nickname: "El Rebaño",
        primaryColor: "#E50022",
        secondaryColor: "#FFFFFF",
        logo: null,
        stadium: "Estadio Akron",
        city: "Guadalajara"
      },
      {
        id: 3,
        name: "Cruz Azul",
        slug: "cruz-azul",
        nickname: "La Máquina",
        primaryColor: "#1F4E79",
        secondaryColor: "#FFFFFF",
        logo: null,
        stadium: "Estadio Azteca",
        city: "Ciudad de México"
      },
      {
        id: 4,
        name: "Pumas UNAM",
        slug: "pumas",
        nickname: "Los Pumas",
        primaryColor: "#003366",
        secondaryColor: "#FFD700",
        logo: null,
        stadium: "Estadio Olímpico Universitario",
        city: "Ciudad de México"
      },
      {
        id: 5,
        name: "Tigres UANL",
        slug: "tigres",
        nickname: "Los Tigres",
        primaryColor: "#FFB300",
        secondaryColor: "#003366",
        logo: null,
        stadium: "Estadio Universitario",
        city: "San Nicolás de los Garza"
      },
      {
        id: 6,
        name: "CF Monterrey",
        slug: "monterrey",
        nickname: "Los Rayados",
        primaryColor: "#003366",
        secondaryColor: "#FFFFFF",
        logo: null,
        stadium: "Estadio BBVA",
        city: "Monterrey"
      },
      {
        id: 7,
        name: "Santos Laguna",
        slug: "santos",
        nickname: "Los Guerreros",
        primaryColor: "#00A651",
        secondaryColor: "#FFFFFF",
        logo: null,
        stadium: "Estadio Corona",
        city: "Torreón"
      }
    ];
  }

  async scrapeMatches(): Promise<Match[]> {
    const teams = await this.scrapeTeams();
    const now = new Date();
    
    // Generate realistic match data
    const matches: Match[] = [];
    
    // Recent matches
    for (let i = 0; i < 5; i++) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      let awayTeam = teams[Math.floor(Math.random() * teams.length)];
      while (awayTeam.id === homeTeam.id) {
        awayTeam = teams[Math.floor(Math.random() * teams.length)];
      }
      
      const matchDate = new Date(now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
      
      matches.push({
        id: i + 1,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeScore: Math.floor(Math.random() * 4),
        awayScore: Math.floor(Math.random() * 4),
        matchDate: matchDate,
        status: 'finished',
        venue: homeTeam.stadium || 'TBD',
        competition: 'Liga MX',
        minute: null
      });
    }

    // Upcoming matches
    for (let i = 0; i < 3; i++) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      let awayTeam = teams[Math.floor(Math.random() * teams.length)];
      while (awayTeam.id === homeTeam.id) {
        awayTeam = teams[Math.floor(Math.random() * teams.length)];
      }
      
      const matchDate = new Date(now.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000);
      
      matches.push({
        id: i + 6,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeScore: null,
        awayScore: null,
        matchDate: matchDate,
        status: 'scheduled',
        venue: homeTeam.stadium || 'TBD',
        competition: 'Liga MX',
        minute: null
      });
    }

    // Live match (if current time suggests there should be one)
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const isMatchTime = now.getHours() >= 18 && now.getHours() <= 22;
    
    if (isWeekend && isMatchTime) {
      const homeTeam = teams[0];
      const awayTeam = teams[1];
      
      matches.push({
        id: 999,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeScore: Math.floor(Math.random() * 3),
        awayScore: Math.floor(Math.random() * 3),
        matchDate: now,
        status: 'live',
        venue: homeTeam.stadium || 'TBD',
        competition: 'Liga MX',
        minute: 45 + Math.floor(Math.random() * 50)
      });
    }

    return matches;
  }

  async scrapeStandings(): Promise<Standing[]> {
    const teams = await this.scrapeTeams();
    
    return teams.map((team, index) => {
      const matchesPlayed = 10 + Math.floor(Math.random() * 5);
      const wins = Math.floor(Math.random() * matchesPlayed);
      const losses = Math.floor(Math.random() * (matchesPlayed - wins));
      const draws = matchesPlayed - wins - losses;
      const points = wins * 3 + draws;
      
      return {
        id: index + 1,
        teamId: team.id,
        position: index + 1,
        matchesPlayed,
        wins,
        draws,
        losses,
        goalsFor: wins * 2 + draws + Math.floor(Math.random() * 10),
        goalsAgainst: losses + Math.floor(Math.random() * 8),
        goalDifference: 0, // Will be calculated
        points,
        season: '2024-25'
      };
    }).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const aGD = a.goalsFor - a.goalsAgainst;
      const bGD = b.goalsFor - b.goalsAgainst;
      return bGD - aGD;
    }).map((standing, index) => ({
      ...standing,
      position: index + 1,
      goalDifference: standing.goalsFor - standing.goalsAgainst
    }));
  }

  async scrapePlayers(): Promise<Player[]> {
    const teams = await this.scrapeTeams();
    const players: Player[] = [];
    
    const playerNames = [
      "Henry Martín", "Julián Quiñones", "Alexis Vega", "Roberto Alvarado",
      "Uriel Antuna", "Ignacio Rivero", "Carlos Rodríguez", "Jesús Angulo",
      "Sebastián Córdova", "Diego Valdés", "André-Pierre Gignac", "Nahuel Guzmán",
      "Rogelio Funes Mori", "Maximiliano Meza", "Santiago Giménez", "César Huerta",
      "José Juan Macías", "Jordan Carrillo", "Fernando Gorriarán", "Diego Rossi"
    ];
    
    playerNames.forEach((name, index) => {
      const team = teams[index % teams.length];
      const goals = Math.floor(Math.random() * 15) + 1;
      
      players.push({
        id: index + 1,
        name,
        teamId: team.id,
        position: 'Delantero',
        goals,
        assists: Math.floor(Math.random() * 8),
        appearances: 10 + Math.floor(Math.random() * 8)
      });
    });
    
    return players.sort((a, b) => b.goals - a.goals);
  }

  async scrapeAll() {
    try {
      console.log('🚀 Starting Liga MX data scraping...');
      
      const [teams, matches, standings, players] = await Promise.all([
        this.scrapeTeams(),
        this.scrapeMatches(),
        this.scrapeStandings(),
        this.scrapePlayers()
      ]);
      
      console.log(`✅ Scraped ${teams.length} teams, ${matches.length} matches, ${standings.length} standings, ${players.length} players`);
      
      return {
        teams,
        matches,
        standings,
        players
      };
    } catch (error) {
      console.error('❌ Error during scraping:', error);
      throw error;
    }
  }
}

export default ImprovedScraper.getInstance();