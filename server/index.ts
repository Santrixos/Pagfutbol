import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import improvedScraper from "./services/improved-scraper";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

async function initializeData() {
  try {
    console.log("🔄 Checking if initial data exists...");
    const existingTeams = await storage.getTeams();
    
    if (existingTeams.length === 0) {
      console.log("📊 Initializing Liga MX data...");
      const data = await improvedScraper.scrapeAll();
      
      // Store scraped data
      for (const team of data.teams) {
        await storage.createTeam(team);
      }
      
      for (const match of data.matches) {
        await storage.createMatch(match);
      }
      
      for (const standing of data.standings) {
        await storage.createStanding(standing);
      }
      
      for (const player of data.players) {
        await storage.createPlayer(player);
      }
      
      console.log(`✅ Initialized ${data.teams.length} teams, ${data.matches.length} matches, ${data.standings.length} standings, ${data.players.length} players`);
    } else {
      console.log(`✅ Data already exists (${existingTeams.length} teams found)`);
    }
  } catch (error) {
    console.error("❌ Failed to initialize data:", error);
  }
}

(async () => {
  const server = await registerRoutes(app);

  // Initialize data after routes are registered
  await initializeData();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
