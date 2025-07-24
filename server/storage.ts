import { 
  teams, 
  matches, 
  standings, 
  players,
  type Team, 
  type Match, 
  type Standing, 
  type Player,
  type InsertTeam,
  type InsertMatch,
  type InsertStanding,
  type InsertPlayer,
  type MatchWithTeams,
  type StandingWithTeam,
  type PlayerWithTeam
} from "@shared/schema";

export interface IStorage {
  // Teams
  getTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  getTeamBySlug(slug: string): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  
  // Matches
  getMatches(): Promise<MatchWithTeams[]>;
  getLiveMatches(): Promise<MatchWithTeams[]>;
  getUpcomingMatches(): Promise<MatchWithTeams[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: number, match: Partial<Match>): Promise<Match | undefined>;
  
  // Standings
  getStandings(): Promise<StandingWithTeam[]>;
  createStanding(standing: InsertStanding): Promise<Standing>;
  updateStanding(teamId: number, standing: Partial<Standing>): Promise<Standing | undefined>;
  
  // Players
  getTopScorers(limit?: number): Promise<PlayerWithTeam[]>;
  getPlayersByTeam(teamId: number): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: number, player: Partial<Player>): Promise<Player | undefined>;
  
  // Data management
  clearAllData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private teams: Map<number, Team>;
  private matches: Map<number, Match>;
  private standings: Map<number, Standing>;
  private players: Map<number, Player>;
  private currentTeamId: number;
  private currentMatchId: number;
  private currentStandingId: number;
  private currentPlayerId: number;

  constructor() {
    this.teams = new Map();
    this.matches = new Map();
    this.standings = new Map();
    this.players = new Map();
    this.currentTeamId = 1;
    this.currentMatchId = 1;
    this.currentStandingId = 1;
    this.currentPlayerId = 1;
    
    this.initializeDefaultTeams();
  }

  private initializeDefaultTeams() {
    const ligaMXTeams: InsertTeam[] = [
      { name: "Club América", nickname: "Las Águilas", slug: "america", primaryColor: "#FFD700", secondaryColor: "#003366", stadium: "Estadio Azteca", city: "Ciudad de México", logo: "https://logoeps.com/wp-content/uploads/2013/03/club-america-vector-logo.png" },
      { name: "Chivas Guadalajara", nickname: "El Rebaño", slug: "chivas", primaryColor: "#E50022", secondaryColor: "#FFFFFF", stadium: "Estadio Akron", city: "Guadalajara", logo: "https://logoeps.com/wp-content/uploads/2013/03/chivas-vector-logo.png" },
      { name: "Cruz Azul", nickname: "La Máquina", slug: "cruz-azul", primaryColor: "#1F4E79", secondaryColor: "#FFFFFF", stadium: "Estadio Ciudad de los Deportes", city: "Ciudad de México", logo: "https://logoeps.com/wp-content/uploads/2013/03/cruz-azul-vector-logo.png" },
      { name: "Pumas UNAM", nickname: "Los Pumas", slug: "pumas", primaryColor: "#003366", secondaryColor: "#FFD700", stadium: "Estadio Olímpico Universitario", city: "Ciudad de México", logo: "https://logoeps.com/wp-content/uploads/2013/03/pumas-unam-vector-logo.png" },
      { name: "Tigres UANL", nickname: "Los Tigres", slug: "tigres", primaryColor: "#FFB300", secondaryColor: "#003366", stadium: "Estadio Universitario", city: "Monterrey", logo: "https://logoeps.com/wp-content/uploads/2013/03/tigres-uanl-vector-logo.png" },
      { name: "CF Monterrey", nickname: "Los Rayados", slug: "monterrey", primaryColor: "#003366", secondaryColor: "#FFFFFF", stadium: "Estadio BBVA", city: "Monterrey", logo: "https://logoeps.com/wp-content/uploads/2013/03/monterrey-vector-logo.png" },
      { name: "Santos Laguna", nickname: "Los Guerreros", slug: "santos", primaryColor: "#00A651", secondaryColor: "#FFFFFF", stadium: "Estadio Corona", city: "Torreón", logo: "https://logoeps.com/wp-content/uploads/2013/03/santos-laguna-vector-logo.png" },
      { name: "Club León", nickname: "La Fiera", slug: "leon", primaryColor: "#00A651", secondaryColor: "#FFD700", stadium: "Estadio León", city: "León", logo: "https://logoeps.com/wp-content/uploads/2013/03/leon-vector-logo.png" },
      { name: "FC Juárez", nickname: "Los Bravos", slug: "juarez", primaryColor: "#E50022", secondaryColor: "#000000", stadium: "Estadio Olímpico Benito Juárez", city: "Ciudad Juárez", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/FC_Ju%C3%A1rez_logo.svg/1200px-FC_Ju%C3%A1rez_logo.svg.png" },
      { name: "Atlas FC", nickname: "Los Zorros", slug: "atlas", primaryColor: "#E50022", secondaryColor: "#000000", stadium: "Estadio Jalisco", city: "Guadalajara", logo: "https://logoeps.com/wp-content/uploads/2013/03/atlas-vector-logo.png" },
      { name: "CF Pachuca", nickname: "Los Tuzos", slug: "pachuca", primaryColor: "#1F4E79", secondaryColor: "#FFFFFF", stadium: "Estadio Hidalgo", city: "Pachuca", logo: "https://logoeps.com/wp-content/uploads/2013/03/pachuca-vector-logo.png" },
      { name: "Deportivo Toluca", nickname: "Los Diablos Rojos", slug: "toluca", primaryColor: "#E50022", secondaryColor: "#FFFFFF", stadium: "Estadio Nemesio Díez", city: "Toluca", logo: "https://logoeps.com/wp-content/uploads/2013/03/toluca-vector-logo.png" },
      { name: "Mazatlán FC", nickname: "Los Cañoneros", slug: "mazatlan", primaryColor: "#8B008B", secondaryColor: "#FFD700", stadium: "Estadio El Encanto", city: "Mazatlán", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mazatl%C3%A1n_FC_logo.svg/1200px-Mazatl%C3%A1n_FC_logo.svg.png" },
      { name: "Club Puebla", nickname: "La Franja", slug: "puebla", primaryColor: "#1F4E79", secondaryColor: "#FFFFFF", stadium: "Estadio Cuauhtémoc", city: "Puebla", logo: "https://logoeps.com/wp-content/uploads/2013/03/puebla-vector-logo.png" },
      { name: "Querétaro FC", nickname: "Los Gallos Blancos", slug: "queretaro", primaryColor: "#000000", secondaryColor: "#1F4E79", stadium: "Estadio La Corregidora", city: "Querétaro", logo: "https://logoeps.com/wp-content/uploads/2013/03/queretaro-vector-logo.png" },
      { name: "Club Tijuana", nickname: "Los Xolos", slug: "tijuana", primaryColor: "#E50022", secondaryColor: "#000000", stadium: "Estadio Caliente", city: "Tijuana", logo: "https://logoeps.com/wp-content/uploads/2013/03/tijuana-vector-logo.png" },
      { name: "Necaxa", nickname: "Los Rayos", slug: "necaxa", primaryColor: "#E50022", secondaryColor: "#FFFFFF", stadium: "Estadio Victoria", city: "Aguascalientes", logo: "https://logoeps.com/wp-content/uploads/2013/03/necaxa-vector-logo.png" },
      { name: "Atlético de San Luis", nickname: "Los Potosinos", slug: "atletico-san-luis", primaryColor: "#FF0000", secondaryColor: "#FFFFFF", stadium: "Estadio Alfonso Lastras", city: "San Luis Potosí", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Atletico_San_Luis_logo.svg/1200px-Atletico_San_Luis_logo.svg.png" }
    ];

    ligaMXTeams.forEach(team => {
      this.createTeam(team);
    });
  }

  async getTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async getTeamBySlug(slug: string): Promise<Team | undefined> {
    return Array.from(this.teams.values()).find(team => team.slug === slug);
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.currentTeamId++;
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }

  async getMatches(): Promise<MatchWithTeams[]> {
    const matches = Array.from(this.matches.values());
    const matchesWithTeams: MatchWithTeams[] = [];

    for (const match of matches) {
      const homeTeam = this.teams.get(match.homeTeamId);
      const awayTeam = this.teams.get(match.awayTeamId);
      
      if (homeTeam && awayTeam) {
        matchesWithTeams.push({ ...match, homeTeam, awayTeam });
      }
    }

    return matchesWithTeams.sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime());
  }

  async getLiveMatches(): Promise<MatchWithTeams[]> {
    const allMatches = await this.getMatches();
    return allMatches.filter(match => match.status === 'live');
  }

  async getUpcomingMatches(): Promise<MatchWithTeams[]> {
    const allMatches = await this.getMatches();
    return allMatches.filter(match => match.status === 'upcoming').slice(0, 10);
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = this.currentMatchId++;
    const match: Match = { ...insertMatch, id };
    this.matches.set(id, match);
    return match;
  }

  async updateMatch(id: number, matchUpdate: Partial<Match>): Promise<Match | undefined> {
    const match = this.matches.get(id);
    if (match) {
      const updatedMatch = { ...match, ...matchUpdate };
      this.matches.set(id, updatedMatch);
      return updatedMatch;
    }
    return undefined;
  }

  async getStandings(): Promise<StandingWithTeam[]> {
    const standings = Array.from(this.standings.values());
    const standingsWithTeams: StandingWithTeam[] = [];

    for (const standing of standings) {
      const team = this.teams.get(standing.teamId);
      if (team) {
        standingsWithTeams.push({ ...standing, team });
      }
    }

    return standingsWithTeams.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);
  }

  async createStanding(insertStanding: InsertStanding): Promise<Standing> {
    const id = this.currentStandingId++;
    const standing: Standing = { ...insertStanding, id };
    this.standings.set(id, standing);
    return standing;
  }

  async updateStanding(teamId: number, standingUpdate: Partial<Standing>): Promise<Standing | undefined> {
    const standing = Array.from(this.standings.values()).find(s => s.teamId === teamId);
    if (standing) {
      const updatedStanding = { ...standing, ...standingUpdate };
      this.standings.set(standing.id, updatedStanding);
      return updatedStanding;
    }
    return undefined;
  }

  async getTopScorers(limit: number = 10): Promise<PlayerWithTeam[]> {
    const players = Array.from(this.players.values());
    const playersWithTeams: PlayerWithTeam[] = [];

    for (const player of players) {
      const team = this.teams.get(player.teamId);
      if (team) {
        playersWithTeams.push({ ...player, team });
      }
    }

    return playersWithTeams
      .sort((a, b) => b.goals - a.goals)
      .slice(0, limit);
  }

  async getPlayersByTeam(teamId: number): Promise<Player[]> {
    return Array.from(this.players.values()).filter(player => player.teamId === teamId);
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.currentPlayerId++;
    const player: Player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }

  async updatePlayer(id: number, playerUpdate: Partial<Player>): Promise<Player | undefined> {
    const player = this.players.get(id);
    if (player) {
      const updatedPlayer = { ...player, ...playerUpdate };
      this.players.set(id, updatedPlayer);
      return updatedPlayer;
    }
    return undefined;
  }

  async clearAllData(): Promise<void> {
    this.matches.clear();
    this.standings.clear();
    this.players.clear();
    this.currentMatchId = 1;
    this.currentStandingId = 1;
    this.currentPlayerId = 1;
  }
}

export const storage = new MemStorage();
