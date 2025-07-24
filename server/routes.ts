import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scraper } from "./services/scraper";
import { multiScraper } from "./services/multi-scraper";
import { 
  insertMatchSchema, 
  insertStandingSchema, 
  insertPlayerSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Teams endpoints
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getTeams();
      res.json(teams);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch teams", error: error.message });
    }
  });

  app.get("/api/teams/:slug", async (req, res) => {
    try {
      const team = await storage.getTeamBySlug(req.params.slug);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      res.json(team);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch team", error: error.message });
    }
  });

  // Matches endpoints
  app.get("/api/matches", async (req, res) => {
    try {
      const matches = await storage.getMatches();
      res.json(matches);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch matches", error: error.message });
    }
  });

  app.get("/api/matches/live", async (req, res) => {
    try {
      const liveMatches = await storage.getLiveMatches();
      res.json(liveMatches);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch live matches", error: error.message });
    }
  });

  app.get("/api/matches/upcoming", async (req, res) => {
    try {
      const upcomingMatches = await storage.getUpcomingMatches();
      res.json(upcomingMatches);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch upcoming matches", error: error.message });
    }
  });

  // Standings endpoint
  app.get("/api/standings", async (req, res) => {
    try {
      const standings = await storage.getStandings();
      res.json(standings);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch standings", error: error.message });
    }
  });

  // Players endpoints
  app.get("/api/players/top-scorers", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const topScorers = await storage.getTopScorers(limit);
      res.json(topScorers);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch top scorers", error: error.message });
    }
  });

  // Scraping endpoint with multi-source support
  app.post("/api/scrape", async (req, res) => {
    try {
      console.log("Starting multi-source data scraping...");
      const scrapedData = await multiScraper.scrapeFromMultipleSources();
      
      // Clear existing data
      await storage.clearAllData();
      
      // Process scraped matches
      const teams = await storage.getTeams();
      const teamMap = new Map(teams.map(team => [team.name.toLowerCase(), team]));
      
      for (const matchData of scrapedData.matches) {
        if (matchData.homeTeamName && matchData.awayTeamName) {
          const homeTeam = teamMap.get(matchData.homeTeamName.toLowerCase()) ||
                           Array.from(teamMap.values()).find(team => 
                             team.name.toLowerCase().includes(matchData.homeTeamName!.toLowerCase()) ||
                             team.nickname.toLowerCase().includes(matchData.homeTeamName!.toLowerCase())
                           );
          
          const awayTeam = teamMap.get(matchData.awayTeamName.toLowerCase()) ||
                           Array.from(teamMap.values()).find(team => 
                             team.name.toLowerCase().includes(matchData.awayTeamName!.toLowerCase()) ||
                             team.nickname.toLowerCase().includes(matchData.awayTeamName!.toLowerCase())
                           );

          if (homeTeam && awayTeam) {
            try {
              const matchToInsert = insertMatchSchema.parse({
                homeTeamId: homeTeam.id,
                awayTeamId: awayTeam.id,
                homeScore: matchData.homeScore || null,
                awayScore: matchData.awayScore || null,
                status: matchData.status || 'upcoming',
                matchDate: matchData.matchDate || new Date(),
                venue: matchData.venue || homeTeam.stadium || 'TBD',
                minute: matchData.minute || null,
                competition: 'Liga MX'
              });
              
              await storage.createMatch(matchToInsert);
            } catch (validationError) {
              console.error('Match validation error:', validationError);
            }
          }
        }
      }

      // Process scraped standings
      for (const standingData of scrapedData.standings) {
        if (standingData.teamName) {
          const team = teamMap.get(standingData.teamName.toLowerCase()) ||
                       Array.from(teamMap.values()).find(t => 
                         t.name.toLowerCase().includes(standingData.teamName!.toLowerCase()) ||
                         t.nickname.toLowerCase().includes(standingData.teamName!.toLowerCase())
                       );

          if (team) {
            try {
              const standingToInsert = insertStandingSchema.parse({
                teamId: team.id,
                position: standingData.position || 1,
                matchesPlayed: standingData.matchesPlayed || 0,
                wins: standingData.wins || 0,
                draws: standingData.draws || 0,
                losses: standingData.losses || 0,
                goalsFor: standingData.goalsFor || 0,
                goalsAgainst: standingData.goalsAgainst || 0,
                goalDifference: (standingData.goalsFor || 0) - (standingData.goalsAgainst || 0),
                points: standingData.points || 0,
                season: '2024-25'
              });
              
              await storage.createStanding(standingToInsert);
            } catch (validationError) {
              console.error('Standing validation error:', validationError);
            }
          }
        }
      }

      // Process scraped players
      for (const playerData of scrapedData.players) {
        if (playerData.name && playerData.teamName) {
          const team = teamMap.get(playerData.teamName.toLowerCase()) ||
                       Array.from(teamMap.values()).find(t => 
                         t.name.toLowerCase().includes(playerData.teamName!.toLowerCase()) ||
                         t.nickname.toLowerCase().includes(playerData.teamName!.toLowerCase())
                       );

          if (team) {
            try {
              const playerToInsert = insertPlayerSchema.parse({
                name: playerData.name,
                teamId: team.id,
                position: playerData.position || 'Forward',
                goals: playerData.goals || 0,
                assists: playerData.assists || 0,
                appearances: playerData.appearances || 0
              });
              
              await storage.createPlayer(playerToInsert);
            } catch (validationError) {
              console.error('Player validation error:', validationError);
            }
          }
        }
      }

      console.log("Data scraping completed successfully");
      res.json({ 
        message: "Data scraped and updated successfully",
        scraped: {
          matches: scrapedData.matches.length,
          standings: scrapedData.standings.length,
          players: scrapedData.players.length
        }
      });
    } catch (error) {
      console.error("Scraping failed:", error);
      res.status(500).json({ 
        message: "Failed to scrape data", 
        error: (error as any).message 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  // Auto-scrape data every 30 minutes
  setInterval(async () => {
    try {
      console.log("Auto-scraping data...");
      await scraper.scrapeGoogleSports();
      console.log("Auto-scraping completed");
    } catch (error) {
      console.error("Auto-scraping failed:", error);
    }
  }, 30 * 60 * 1000); // 30 minutes

  return httpServer;
}
