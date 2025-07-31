// Football App - Main Application JavaScript
// Replicating exact functionality from React version

class FootballApp {
  constructor() {
    this.selectedTeam = null;
    this.language = 'es';
    this.currentPage = 'team-selector';
    this.apiCache = new Map();
    this.autoRefresh = true;
    this.refreshIntervals = [];
    
    this.init();
  }

  init() {
    console.log('🚀 Initializing Football App...');
    this.setupEventListeners();
    this.loadTeamSelector();
    this.setupParticleBackground();
  }

  setupEventListeners() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-mobile-menu-toggle]')) {
        this.toggleMobileMenu();
      }
      
      if (e.target.matches('[data-mobile-overlay]')) {
        this.closeMobileMenu();
      }
    });

    // Navigation links
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-nav-link]')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-nav-link');
        this.navigateTo(page);
      }
    });

    // Team selection
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-team-select]')) {
        const teamSlug = e.target.getAttribute('data-team-select');
        this.selectTeam(teamSlug);
      }
    });

    // Language selection
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-language-select]')) {
        this.language = e.target.value;
        this.updateLanguage();
      }
    });

    // Auto-refresh toggle
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-auto-refresh]')) {
        this.autoRefresh = e.target.checked;
        this.toggleAutoRefresh();
      }
    });
  }

  loadTeamSelector() {
    const teamSelectorHtml = `
      <div class="min-h-screen flex items-center justify-center relative">
        <div class="futuristic-bg"></div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <!-- Header -->
          <div class="text-center mb-16">
            <h1 class="text-6xl font-black mb-4 neon-text">
              THE STYLE OF FOOTBALL
            </h1>
            <p class="text-4xl font-bold text-red-600 mb-8">MX</p>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto">
              Selecciona tu equipo favorito y vive la experiencia completa de la Liga MX con datos en tiempo real
            </p>
          </div>

          <!-- Language Selector -->
          <div class="flex justify-center mb-12">
            <select data-language-select class="bg-card border border-border rounded-lg px-4 py-2 text-foreground">
              <option value="es">🇲🇽 Español</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>

          <!-- Teams Grid -->
          <div id="teams-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <!-- Teams will be loaded here -->
          </div>
        </div>
      </div>
    `;

    document.getElementById('team-selector').innerHTML = teamSelectorHtml;
    this.loadTeams();
  }

  async loadTeams() {
    try {
      const teams = await this.fetchAPI('/api/teams');
      const teamsGrid = document.getElementById('teams-grid');
      
      teamsGrid.innerHTML = teams.map(team => `
        <div class="team-card cursor-pointer" 
             data-team-select="${team.slug}"
             style="background: linear-gradient(145deg, ${team.primary_color}20, ${team.secondary_color}10);">
          <div class="p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
                 style="background: ${team.primary_color}; color: ${team.secondary_color};">
              ${team.name.charAt(0)}
            </div>
            <h3 class="font-bold text-lg mb-2">${team.name}</h3>
            <p class="text-sm opacity-75">${team.nickname}</p>
            <p class="text-xs mt-2 opacity-60">${team.city}</p>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading teams:', error);
      this.showToast('Error cargando equipos', 'error');
    }
  }

  selectTeam(teamSlug) {
    console.log('🏆 Team selected:', teamSlug);
    
    const teamConfig = TeamConfig.getTeamBySlug(teamSlug);
    if (!teamConfig) {
      this.showToast('Equipo no encontrado', 'error');
      return;
    }

    this.selectedTeam = teamConfig;
    
    // Apply team colors to CSS variables
    document.documentElement.style.setProperty('--team-primary', teamConfig.primaryColor);
    document.documentElement.style.setProperty('--team-secondary', teamConfig.secondaryColor);
    document.documentElement.style.setProperty('--team-primary-hex', teamConfig.primaryColor);
    document.documentElement.style.setProperty('--team-secondary-hex', teamConfig.secondaryColor);

    // Hide team selector and show main app
    document.getElementById('team-selector').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';

    this.loadNavigation();
    this.navigateTo('dashboard');
  }

  loadNavigation() {
    const navigationHtml = `
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b border-border">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                 style="background: ${this.selectedTeam.primaryColor}; color: ${this.selectedTeam.secondaryColor};">
              ${this.selectedTeam.name.charAt(0)}
            </div>
            <div>
              <h2 class="font-bold text-lg">${this.selectedTeam.name}</h2>
              <p class="text-sm opacity-75">${this.selectedTeam.nickname}</p>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 p-4 space-y-2">
          <a href="#" data-nav-link="dashboard" class="nav-link active">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" data-nav-link="live" class="nav-link">
            <i class="fas fa-broadcast-tower"></i>
            <span>En Vivo</span>
          </a>
          <a href="#" data-nav-link="standings" class="nav-link">
            <i class="fas fa-list-ol"></i>
            <span>Tabla General</span>
          </a>
          <a href="#" data-nav-link="matches" class="nav-link">
            <i class="fas fa-calendar"></i>
            <span>Partidos</span>
          </a>
          <a href="#" data-nav-link="team-profile" class="nav-link">
            <i class="fas fa-users"></i>
            <span>Mi Equipo</span>
          </a>
          <a href="#" data-nav-link="players" class="nav-link">
            <i class="fas fa-futbol"></i>
            <span>Jugadores</span>
          </a>
          <a href="#" data-nav-link="trivia" class="nav-link">
            <i class="fas fa-question-circle"></i>
            <span>Trivia</span>
          </a>
          <a href="#" data-nav-link="donations" class="nav-link">
            <i class="fas fa-heart"></i>
            <span>Donaciones</span>
          </a>
          <a href="#" data-nav-link="betting" class="nav-link">
            <i class="fas fa-dice"></i>
            <span>Apuestas</span>
          </a>
        </nav>

        <!-- Settings -->
        <div class="p-4 border-t border-border">
          <div class="space-y-3">
            <label class="flex items-center space-x-2">
              <input type="checkbox" data-auto-refresh checked class="rounded">
              <span class="text-sm">Auto-actualizar</span>
            </label>
            <button class="btn btn-secondary w-full" onclick="location.reload()">
              <i class="fas fa-redo"></i>
              <span>Cambiar Equipo</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('sidebar').innerHTML = navigationHtml;
  }

  navigateTo(page) {
    console.log('📍 Navigating to:', page);
    
    this.currentPage = page;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav-link') === page) {
        link.classList.add('active');
      }
    });

    // Load page content
    this.loadPageContent(page);
  }

  async loadPageContent(page) {
    const mainContent = document.getElementById('main-content');
    
    switch (page) {
      case 'dashboard':
        mainContent.innerHTML = await this.renderDashboard();
        this.startAutoRefresh();
        break;
      case 'live':
        mainContent.innerHTML = await this.renderLiveMatches();
        this.startAutoRefresh();
        break;
      case 'standings':
        mainContent.innerHTML = await this.renderStandings();
        break;
      case 'matches':
        mainContent.innerHTML = await this.renderMatches();
        break;
      case 'team-profile':
        mainContent.innerHTML = await this.renderTeamProfile();
        break;
      case 'players':
        mainContent.innerHTML = await this.renderPlayers();
        break;
      case 'trivia':
        mainContent.innerHTML = await this.renderTrivia();
        break;
      case 'donations':
        mainContent.innerHTML = await this.renderDonations();
        break;
      case 'betting':
        mainContent.innerHTML = await this.renderBetting();
        break;
      default:
        mainContent.innerHTML = '<div class="p-8 text-center">Página no encontrada</div>';
    }
  }

  async renderDashboard() {
    try {
      const [liveMatches, standings, topScorers] = await Promise.all([
        this.fetchAPI('/api/matches/live'),
        this.fetchAPI('/api/standings'),
        this.fetchAPI('/api/players/top-scorers', { limit: 5 })
      ]);

      return `
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 neon-text">Dashboard</h1>
            <p class="text-gray-400">Resumen de Liga MX en tiempo real</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Live Matches -->
            <div class="lg:col-span-2">
              <div class="card p-6">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-2xl font-bold flex items-center">
                    <div class="live-dot mr-2"></div>
                    Partidos en Vivo
                  </h2>
                  <button onclick="footballApp.refreshData()" class="btn btn-secondary">
                    <i class="fas fa-sync-alt"></i>
                  </button>
                </div>
                
                ${liveMatches.length > 0 ? 
                  liveMatches.map(match => this.renderMatchCard(match)).join('') :
                  '<p class="text-center text-gray-400 py-8">No hay partidos en vivo</p>'
                }
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Top Scorers -->
              <div class="card p-6">
                <h3 class="text-xl font-bold mb-4">Goleadores</h3>
                <div class="space-y-3">
                  ${topScorers.slice(0, 5).map((player, index) => `
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        ${index + 1}
                      </div>
                      <div class="flex-1">
                        <p class="font-medium">${player.name}</p>
                        <p class="text-sm text-gray-400">${player.team_name}</p>
                      </div>
                      <div class="text-xl font-bold">${player.goals}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Standings Preview -->
              <div class="card p-6">
                <h3 class="text-xl font-bold mb-4">Tabla General</h3>
                <div class="space-y-2">
                  ${standings.slice(0, 5).map(standing => `
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <span class="w-6 text-center text-sm">${standing.position}</span>
                        <span class="text-sm">${standing.team_name}</span>
                      </div>
                      <span class="font-bold">${standing.points}</span>
                    </div>
                  `).join('')}
                </div>
                <button data-nav-link="standings" class="btn btn-primary w-full mt-4">
                  Ver Tabla Completa
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering dashboard:', error);
      return '<div class="p-8 text-center text-red-500">Error cargando dashboard</div>';
    }
  }

  renderMatchCard(match) {
    const isLive = match.status === 'live';
    const homeScore = match.home_score || 0;
    const awayScore = match.away_score || 0;

    return `
      <div class="glass-card p-4 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Home Team -->
            <div class="text-center">
              <div class="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold"
                   style="background: ${match.home_team_primary_color}; color: ${match.home_team_secondary_color};">
                ${match.home_team_name.charAt(0)}
              </div>
              <p class="text-sm font-medium">${match.home_team_nickname}</p>
            </div>

            <!-- Score -->
            <div class="text-center px-6">
              <div class="text-3xl font-bold mb-1">
                ${homeScore} - ${awayScore}
              </div>
              ${isLive ? 
                `<div class="live-indicator">
                  <div class="live-dot"></div>
                  <span class="text-sm font-medium">EN VIVO ${match.minute || ''}'</span>
                </div>` :
                `<div class="text-sm text-gray-400">${match.status.toUpperCase()}</div>`
              }
            </div>

            <!-- Away Team -->
            <div class="text-center">
              <div class="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold"
                   style="background: ${match.away_team_primary_color}; color: ${match.away_team_secondary_color};">
                ${match.away_team_name.charAt(0)}
              </div>
              <p class="text-sm font-medium">${match.away_team_nickname}</p>
            </div>
          </div>

          <div class="text-right">
            <p class="text-sm text-gray-400">${match.venue || 'Estadio'}</p>
            <p class="text-xs text-gray-500">${new Date(match.match_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `;
  }

  async fetchAPI(endpoint, params = {}) {
    const cacheKey = endpoint + JSON.stringify(params);
    
    // Check cache first (cache for 30 seconds)
    if (this.apiCache.has(cacheKey)) {
      const cached = this.apiCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 30000) {
        return cached.data;
      }
    }

    try {
      const url = new URL(endpoint, window.location.origin);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the result
      this.apiCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  startAutoRefresh() {
    this.stopAutoRefresh();
    
    if (this.autoRefresh && ['dashboard', 'live'].includes(this.currentPage)) {
      const interval = setInterval(() => {
        this.refreshData();
      }, 30000); // Refresh every 30 seconds
      
      this.refreshIntervals.push(interval);
    }
  }

  stopAutoRefresh() {
    this.refreshIntervals.forEach(interval => clearInterval(interval));
    this.refreshIntervals = [];
  }

  toggleAutoRefresh() {
    if (this.autoRefresh) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  async refreshData() {
    console.log('🔄 Refreshing data...');
    this.apiCache.clear();
    await this.loadPageContent(this.currentPage);
  }

  toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
  }

  closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  }

  setupParticleBackground() {
    const bg = document.querySelector('.futuristic-bg');
    if (!bg) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      bg.appendChild(particle);
    }
  }

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type === 'error' ? 'bg-destructive text-destructive-foreground' : 'bg-card text-card-foreground'}`;
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }

  updateLanguage() {
    // Update UI language based on selected language
    console.log('🌐 Language changed to:', this.language);
    // This would update all text elements based on language
  }
}

// Initialize the app
let footballApp;
document.addEventListener('DOMContentLoaded', () => {
  footballApp = new FootballApp();
});