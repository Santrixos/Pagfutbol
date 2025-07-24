import puppeteer, { type Browser, type Page } from 'puppeteer';
import { type Team, type Match, type Standing, type Player } from '@shared/schema';

export interface ScrapedMatchData {
  homeTeamName?: string;
  awayTeamName?: string;
  homeScore?: number | null;
  awayScore?: number | null;
  status?: string;
  matchDate?: Date;
  venue?: string;
  minute?: number | null;
  competition?: string;
}

export interface ScrapedStandingData {
  teamName?: string;
  position?: number;
  matchesPlayed?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  points?: number;
  season?: string;
}

export interface ScrapedPlayerData {
  name?: string;
  teamName?: string;
  position?: string;
  goals?: number;
  assists?: number;
  appearances?: number;
}

export interface ScrapedData {
  matches: ScrapedMatchData[];
  standings: ScrapedStandingData[];
  players: ScrapedPlayerData[];
}

export class FootballScraper {
  private browser: Browser | null = null;

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
      });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scrapeGoogleSports(): Promise<ScrapedData> {
    await this.initialize();
    const page = await this.browser!.newPage();
    
    try {
      // Set user agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to Google Sports Liga MX page
      await page.goto('https://www.google.com/search?q=liga+mx+standings+2024', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const matches = await this.scrapeMatches(page);
      const standings = await this.scrapeStandings(page);
      const players = await this.scrapePlayers(page);

      return { matches, standings, players };
    } catch (error: any) {
      console.error('Scraping error:', error);
      throw new Error(`Failed to scrape data: ${error?.message || 'Unknown error'}`);
    } finally {
      await page.close();
    }
  }

  private async scrapeMatches(page: Page): Promise<ScrapedMatchData[]> {
    try {
      // Navigate to Liga MX fixtures
      await page.goto('https://www.google.com/search?q=liga+mx+fixtures+2024', {
        waitUntil: 'networkidle2'
      });

      const matches = await page.evaluate(() => {
        const matchElements = Array.from(document.querySelectorAll('[data-ved] .match, .imso_mh__lv-m, .imso_mh__lv-m-t'));
        
        return matchElements.slice(0, 20).map(element => {
          try {
            const homeTeam = element.querySelector('.imso_mh__first-tn-ed, .imso_mh__tm-nm')?.textContent?.trim();
            const awayTeam = element.querySelector('.imso_mh__second-tn-ed, .imso_mh__tm-nm:last-child')?.textContent?.trim();
            const scoreElement = element.querySelector('.imso_mh__l-tm-sc, .imso_mh__r-tm-sc');
            const timeElement = element.querySelector('.imso_mh__dt-lv, .imso_mh__ms');
            const statusElement = element.querySelector('.imso_mh__ft-mtch, .imso_mh__ms');

            let homeScore = null;
            let awayScore = null;
            let status = 'upcoming';
            let minute = null;

            if (scoreElement) {
              const scores = scoreElement.textContent?.match(/\d+/g);
              if (scores && scores.length >= 2) {
                homeScore = parseInt(scores[0]);
                awayScore = parseInt(scores[1]);
                status = 'finished';
              }
            }

            if (statusElement?.textContent?.includes('LIVE') || statusElement?.textContent?.includes("'")) {
              status = 'live';
              const minuteMatch = statusElement.textContent?.match(/(\d+)'/);
              if (minuteMatch) {
                minute = parseInt(minuteMatch[1]);
              }
            }

            const dateTime = timeElement?.textContent?.trim();
            let matchDate = new Date();
            
            if (dateTime) {
              // Parse various time formats from Google
              if (dateTime.includes('Today')) {
                const timeMatch = dateTime.match(/(\d{1,2}):(\d{2})/);
                if (timeMatch) {
                  matchDate.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2]));
                }
              } else if (dateTime.includes('Tomorrow')) {
                matchDate.setDate(matchDate.getDate() + 1);
                const timeMatch = dateTime.match(/(\d{1,2}):(\d{2})/);
                if (timeMatch) {
                  matchDate.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2]));
                }
              }
            }

            return {
              homeTeamName: homeTeam,
              awayTeamName: awayTeam,
              homeScore,
              awayScore,
              status,
              matchDate,
              minute,
              venue: 'TBD',
              competition: 'Liga MX'
            };
          } catch (err) {
            return null;
          }
        }).filter(match => match && match.homeTeamName && match.awayTeamName);
      });

      return matches;
    } catch (error) {
      console.error('Error scraping matches:', error);
      return [];
    }
  }

  private async scrapeStandings(page: Page): Promise<ScrapedStandingData[]> {
    try {
      await page.goto('https://www.google.com/search?q=liga+mx+table+standings+2024', {
        waitUntil: 'networkidle2'
      });

      const standings = await page.evaluate(() => {
        const tableRows = Array.from(document.querySelectorAll('table tr, .imso_mh__table tr, [role="row"]'));
        
        return tableRows.slice(1, 19).map((row, index) => {
          try {
            const cells = Array.from(row.querySelectorAll('td, [role="cell"]'));
            if (cells.length < 5) return null;

            const teamName = cells[0]?.textContent?.trim() || cells[1]?.textContent?.trim();
            const points = parseInt(cells[cells.length - 1]?.textContent?.trim() || '0');
            const matchesPlayed = parseInt(cells[1]?.textContent?.trim() || cells[2]?.textContent?.trim() || '0');
            const wins = parseInt(cells[2]?.textContent?.trim() || cells[3]?.textContent?.trim() || '0');
            const draws = parseInt(cells[3]?.textContent?.trim() || cells[4]?.textContent?.trim() || '0');
            const losses = parseInt(cells[4]?.textContent?.trim() || cells[5]?.textContent?.trim() || '0');

            return {
              teamName,
              position: index + 1,
              matchesPlayed,
              wins,
              draws,
              losses,
              points,
              season: '2024-25'
            };
          } catch (err) {
            return null;
          }
        }).filter(standing => standing && standing.teamName);
      });

      return standings;
    } catch (error) {
      console.error('Error scraping standings:', error);
      return [];
    }
  }

  private async scrapePlayers(page: Page): Promise<ScrapedPlayerData[]> {
    try {
      await page.goto('https://www.google.com/search?q=liga+mx+top+scorers+2024', {
        waitUntil: 'networkidle2'
      });

      const players = await page.evaluate(() => {
        const playerElements = Array.from(document.querySelectorAll('.player-row, .imso_mh__player, [data-player]'));
        
        return playerElements.slice(0, 20).map(element => {
          try {
            const name = element.querySelector('.player-name, .imso_mh__player-nm')?.textContent?.trim();
            const team = element.querySelector('.team-name, .imso_mh__team-nm')?.textContent?.trim();
            const goalsText = element.querySelector('.goals, .imso_mh__goals')?.textContent?.trim();
            const goals = goalsText ? parseInt(goalsText.match(/\d+/)?.[0] || '0') : 0;

            if (!name) return null;

            return {
              name,
              teamName: team,
              goals,
              position: 'Forward', // Default position
              assists: 0,
              appearances: 0
            };
          } catch (err) {
            return null;
          }
        }).filter(player => player && player.name);
      });

      return players;
    } catch (error) {
      console.error('Error scraping players:', error);
      return [];
    }
  }
}

export const scraper = new FootballScraper();
