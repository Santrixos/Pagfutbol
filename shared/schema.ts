import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nickname: text("nickname").notNull(),
  slug: text("slug").notNull().unique(),
  primaryColor: text("primary_color").notNull(),
  secondaryColor: text("secondary_color").notNull(),
  logo: text("logo"),
  stadium: text("stadium"),
  city: text("city"),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id").notNull(),
  awayTeamId: integer("away_team_id").notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  status: text("status").notNull(), // 'upcoming', 'live', 'finished'
  matchDate: timestamp("match_date").notNull(),
  venue: text("venue"),
  minute: integer("minute"),
  competition: text("competition").default("Liga MX"),
});

export const standings = pgTable("standings", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull(),
  position: integer("position").notNull(),
  matchesPlayed: integer("matches_played").notNull().default(0),
  wins: integer("wins").notNull().default(0),
  draws: integer("draws").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  goalsFor: integer("goals_for").notNull().default(0),
  goalsAgainst: integer("goals_against").notNull().default(0),
  goalDifference: integer("goal_difference").notNull().default(0),
  points: integer("points").notNull().default(0),
  season: text("season").notNull().default("2024-25"),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teamId: integer("team_id").notNull(),
  position: text("position"),
  goals: integer("goals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  appearances: integer("appearances").notNull().default(0),
});

export const insertTeamSchema = createInsertSchema(teams).pick({
  name: true,
  nickname: true,
  slug: true,
  primaryColor: true,
  secondaryColor: true,
  logo: true,
  stadium: true,
  city: true,
});

export const insertMatchSchema = createInsertSchema(matches).pick({
  homeTeamId: true,
  awayTeamId: true,
  homeScore: true,
  awayScore: true,
  status: true,
  matchDate: true,
  venue: true,
  minute: true,
  competition: true,
});

export const insertStandingSchema = createInsertSchema(standings).pick({
  teamId: true,
  position: true,
  matchesPlayed: true,
  wins: true,
  draws: true,
  losses: true,
  goalsFor: true,
  goalsAgainst: true,
  goalDifference: true,
  points: true,
  season: true,
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  name: true,
  teamId: true,
  position: true,
  goals: true,
  assists: true,
  appearances: true,
});

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertStanding = z.infer<typeof insertStandingSchema>;
export type Standing = typeof standings.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

export interface MatchWithTeams extends Match {
  homeTeam: Team;
  awayTeam: Team;
}

export interface StandingWithTeam extends Standing {
  team: Team;
}

export interface PlayerWithTeam extends Player {
  team: Team;
}
