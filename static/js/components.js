// Football App - Additional Components
// Extended functionality for different pages

// Extend FootballApp class with additional rendering methods
Object.assign(FootballApp.prototype, {
  
  async renderLiveMatches() {
    try {
      const liveMatches = await this.fetchAPI('/api/matches/live');
      const upcomingMatches = await this.fetchAPI('/api/matches/upcoming');

      return `
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 neon-text flex items-center">
              <div class="live-dot mr-3"></div>
              Partidos en Vivo
            </h1>
            <p class="text-gray-400">Sigue los partidos de Liga MX en tiempo real</p>
          </div>

          <!-- Live Matches -->
          ${liveMatches.length > 0 ? `
            <div class="card p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">En Vivo Ahora</h2>
              <div class="space-y-4">
                ${liveMatches.map(match => this.renderMatchCard(match)).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Upcoming Matches -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold mb-6">Próximos Partidos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${upcomingMatches.slice(0, 6).map(match => this.renderUpcomingMatchCard(match)).join('')}
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      return '<div class="p-8 text-center text-red-500">Error cargando partidos</div>';
    }
  },

  renderUpcomingMatchCard(match) {
    const matchDate = new Date(match.match_date);
    
    return `
      <div class="glass-card p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                 style="background: ${match.home_team_primary_color}; color: ${match.home_team_secondary_color};">
              ${match.home_team_name.charAt(0)}
            </div>
            <span class="text-sm">vs</span>
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                 style="background: ${match.away_team_primary_color}; color: ${match.away_team_secondary_color};">
              ${match.away_team_name.charAt(0)}
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium">${matchDate.toLocaleDateString()}</p>
            <p class="text-xs text-gray-400">${matchDate.toLocaleTimeString()}</p>
          </div>
        </div>
        <div class="text-center">
          <p class="font-medium">${match.home_team_nickname} vs ${match.away_team_nickname}</p>
          <p class="text-sm text-gray-400">${match.venue || 'Estadio por confirmar'}</p>
        </div>
      </div>
    `;
  },

  async renderStandings() {
    try {
      const standings = await this.fetchAPI('/api/standings');

      return `
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 neon-text">Tabla General</h1>
            <p class="text-gray-400">Clasificación actual de Liga MX</p>
          </div>

          <div class="card overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="border-b border-border">
                  <tr class="text-left">
                    <th class="p-4">#</th>
                    <th class="p-4">Equipo</th>
                    <th class="p-4 text-center">PJ</th>
                    <th class="p-4 text-center">G</th>
                    <th class="p-4 text-center">E</th>
                    <th class="p-4 text-center">P</th>
                    <th class="p-4 text-center">GF</th>
                    <th class="p-4 text-center">GC</th>
                    <th class="p-4 text-center">DIF</th>
                    <th class="p-4 text-center">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  ${standings.map((standing, index) => `
                    <tr class="border-b border-border hover:bg-muted/50 ${
                      standing.team_name === this.selectedTeam.name ? 'bg-primary/10' : ''
                    }">
                      <td class="p-4">
                        <div class="flex items-center">
                          <span class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index < 4 ? 'bg-green-600 text-white' : 
                            index < 12 ? 'bg-blue-600 text-white' : 
                            'bg-gray-600 text-white'
                          }">
                            ${standing.position}
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                               style="background: ${standing.primary_color}; color: ${standing.secondary_color};">
                            ${standing.team_name.charAt(0)}
                          </div>
                          <div>
                            <p class="font-medium">${standing.team_name}</p>
                            <p class="text-sm text-gray-400">${standing.team_nickname}</p>
                          </div>
                        </div>
                      </td>
                      <td class="p-4 text-center">${standing.matches_played}</td>
                      <td class="p-4 text-center">${standing.wins}</td>
                      <td class="p-4 text-center">${standing.draws}</td>
                      <td class="p-4 text-center">${standing.losses}</td>
                      <td class="p-4 text-center">${standing.goals_for}</td>
                      <td class="p-4 text-center">${standing.goals_against}</td>
                      <td class="p-4 text-center ${standing.goal_difference >= 0 ? 'text-green-500' : 'text-red-500'}">
                        ${standing.goal_difference > 0 ? '+' : ''}${standing.goal_difference}
                      </td>
                      <td class="p-4 text-center font-bold text-lg">${standing.points}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-6 flex flex-wrap gap-4 justify-center">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-green-600"></div>
              <span class="text-sm">Liguilla Directa</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-blue-600"></div>
              <span class="text-sm">Repesca</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-gray-600"></div>
              <span class="text-sm">Eliminado</span>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      return '<div class="p-8 text-center text-red-500">Error cargando tabla</div>';
    }
  },

  async renderPlayers() {
    try {
      const topScorers = await this.fetchAPI('/api/players/top-scorers', { limit: 20 });

      return `
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 neon-text">Goleadores</h1>
            <p class="text-gray-400">Los máximos anotadores de Liga MX</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${topScorers.map((player, index) => `
              <div class="card p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    ${index + 1}
                  </div>
                  <div class="text-right">
                    <div class="text-3xl font-bold">${player.goals}</div>
                    <div class="text-sm text-gray-400">goles</div>
                  </div>
                </div>
                
                <div class="text-center">
                  <h3 class="font-bold text-lg mb-2">${player.name}</h3>
                  <p class="text-gray-400 mb-3">${player.team_name}</p>
                  
                  <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div class="font-bold text-lg">${player.goals}</div>
                      <div class="text-xs text-gray-400">Goles</div>
                    </div>
                    <div>
                      <div class="font-bold text-lg">${player.assists || 0}</div>
                      <div class="text-xs text-gray-400">Asist.</div>
                    </div>
                    <div>
                      <div class="font-bold text-lg">${player.appearances || 0}</div>
                      <div class="text-xs text-gray-400">Juegos</div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } catch (error) {
      return '<div class="p-8 text-center text-red-500">Error cargando jugadores</div>';
    }
  },

  async renderTeamProfile() {
    const team = this.selectedTeam;
    
    return `
      <div class="p-8">
        <div class="mb-8">
          <div class="flex items-center space-x-6 mb-6">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                 style="background: ${team.primaryColor}; color: ${team.secondaryColor};">
              ${team.name.charAt(0)}
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2 neon-text">${team.name}</h1>
              <p class="text-xl text-gray-400">${team.nickname}</p>
              <p class="text-gray-500">${team.city}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Team Info -->
          <div class="lg:col-span-2">
            <div class="card p-6 mb-6">
              <h2 class="text-2xl font-bold mb-4">Información del Equipo</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 class="font-semibold mb-2">Estadio</h3>
                  <p class="text-gray-400">${team.stadium}</p>
                </div>
                <div>
                  <h3 class="font-semibold mb-2">Ciudad</h3>
                  <p class="text-gray-400">${team.city}</p>
                </div>
                <div>
                  <h3 class="font-semibold mb-2">Apodo</h3>
                  <p class="text-gray-400">${team.nickname}</p>
                </div>
                <div>
                  <h3 class="font-semibold mb-2">Colores</h3>
                  <div class="flex space-x-2">
                    <div class="w-6 h-6 rounded-full border" style="background: ${team.primaryColor}"></div>
                    <div class="w-6 h-6 rounded-full border" style="background: ${team.secondaryColor}"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Team Facts -->
            <div class="card p-6">
              <h2 class="text-2xl font-bold mb-4">Datos Curiosos</h2>
              <div class="space-y-3">
                ${team.facts.map(fact => `
                  <div class="flex items-start space-x-3">
                    <i class="fas fa-futbol text-primary mt-1"></i>
                    <p class="text-gray-300">${fact}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Stats Sidebar -->
          <div class="space-y-6">
            <div class="card p-6 text-center" style="background: linear-gradient(145deg, ${team.primaryColor}20, ${team.secondaryColor}10);">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
                   style="background: ${team.primaryColor}; color: ${team.secondaryColor};">
                <i class="fas fa-heart"></i>
              </div>
              <h3 class="font-bold text-lg mb-2">Mi Equipo</h3>
              <p class="text-sm text-gray-400 mb-4">Seleccionado como favorito</p>
              <button class="btn btn-primary">
                <i class="fas fa-share"></i>
                Compartir
              </button>
            </div>

            <!-- Quick Actions -->
            <div class="card p-6">
              <h3 class="font-bold text-lg mb-4">Acciones Rápidas</h3>
              <div class="space-y-3">
                <button data-nav-link="matches" class="btn btn-secondary w-full">
                  <i class="fas fa-calendar"></i>
                  Ver Partidos
                </button>
                <button data-nav-link="players" class="btn btn-secondary w-full">
                  <i class="fas fa-users"></i>
                  Ver Jugadores
                </button>
                <button data-nav-link="standings" class="btn btn-secondary w-full">
                  <i class="fas fa-trophy"></i>
                  Ver Posición
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async renderMatches() {
    try {
      const matches = await this.fetchAPI('/api/matches');
      const liveMatches = matches.filter(m => m.status === 'live');
      const upcomingMatches = matches.filter(m => m.status === 'upcoming');
      const finishedMatches = matches.filter(m => m.status === 'finished');

      return `
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 neon-text">Partidos</h1>
            <p class="text-gray-400">Todos los partidos de Liga MX</p>
          </div>

          <!-- Tabs -->
          <div class="flex space-x-1 mb-8 bg-muted rounded-lg p-1">
            <button onclick="this.classList.add('bg-primary', 'text-primary-foreground'); this.parentNode.querySelectorAll('button').forEach(b => b !== this && b.classList.remove('bg-primary', 'text-primary-foreground'))" 
                    class="flex-1 py-2 px-4 rounded-md transition-colors bg-primary text-primary-foreground">
              En Vivo (${liveMatches.length})
            </button>
            <button onclick="this.classList.add('bg-primary', 'text-primary-foreground'); this.parentNode.querySelectorAll('button').forEach(b => b !== this && b.classList.remove('bg-primary', 'text-primary-foreground'))" 
                    class="flex-1 py-2 px-4 rounded-md transition-colors">
              Próximos (${upcomingMatches.length})
            </button>
            <button onclick="this.classList.add('bg-primary', 'text-primary-foreground'); this.parentNode.querySelectorAll('button').forEach(b => b !== this && b.classList.remove('bg-primary', 'text-primary-foreground'))" 
                    class="flex-1 py-2 px-4 rounded-md transition-colors">
              Resultados (${finishedMatches.length})
            </button>
          </div>

          <!-- Matches Content -->
          <div class="space-y-4">
            ${matches.slice(0, 10).map(match => this.renderMatchCard(match)).join('')}
          </div>
        </div>
      `;
    } catch (error) {
      return '<div class="p-8 text-center text-red-500">Error cargando partidos</div>';
    }
  },

  renderTrivia() {
    const questions = [
      {
        question: "¿En qué año fue fundado el Club América?",
        options: ["1916", "1918", "1920", "1922"],
        correct: 0
      },
      {
        question: "¿Cuál es el estadio del Cruz Azul?",
        options: ["Azteca", "Olímpico", "Akron", "BBVA"],
        correct: 0
      },
      {
        question: "¿Cuántos títulos tiene Chivas?",
        options: ["10", "11", "12", "13"],
        correct: 2
      }
    ];

    return `
      <div class="p-8">
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2 neon-text">Trivia Futbolera</h1>
          <p class="text-gray-400">Pon a prueba tus conocimientos sobre Liga MX</p>
        </div>

        <div class="max-w-2xl mx-auto">
          <div class="card p-8">
            <div class="text-center mb-8">
              <div class="text-6xl mb-4">🏆</div>
              <h2 class="text-2xl font-bold mb-2">¡Próximamente!</h2>
              <p class="text-gray-400">Estamos preparando preguntas épicas sobre Liga MX</p>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span>Preguntas de equipos</span>
                <span class="badge badge-primary">Próximamente</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span>Historia de Liga MX</span>
                <span class="badge badge-primary">Próximamente</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span>Jugadores legendarios</span>
                <span class="badge badge-primary">Próximamente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderDonations() {
    return `
      <div class="p-8">
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2 neon-text">Donaciones</h1>
          <p class="text-gray-400">Apoya el desarrollo de la aplicación</p>
        </div>

        <div class="max-w-2xl mx-auto">
          <div class="card p-8">
            <div class="text-center mb-8">
              <div class="text-6xl mb-4">❤️</div>
              <h2 class="text-2xl font-bold mb-4">¡Gracias por tu apoyo!</h2>
              <p class="text-gray-400 mb-6">Tu donación nos ayuda a mantener y mejorar la aplicación</p>
            </div>

            <!-- Donation Form -->
            <form id="donation-form" class="space-y-6">
              <div>
                <label class="block text-sm font-medium mb-2">Cantidad</label>
                <select id="donation-amount" class="w-full p-3 bg-input border border-border rounded-lg">
                  <option value="5">$5 USD - Café ☕</option>
                  <option value="10" selected>$10 USD - Almuerzo 🍕</option>
                  <option value="25">$25 USD - Cena 🍔</option>
                  <option value="50">$50 USD - Generoso 🎉</option>
                  <option value="custom">Cantidad personalizada</option>
                </select>
              </div>

              <div id="custom-amount" style="display: none;">
                <label class="block text-sm font-medium mb-2">Cantidad personalizada (USD)</label>
                <input type="number" min="1" class="w-full p-3 bg-input border border-border rounded-lg" placeholder="0.00">
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Mensaje (opcional)</label>
                <textarea class="w-full p-3 bg-input border border-border rounded-lg" rows="3" placeholder="Deja un mensaje de apoyo..."></textarea>
              </div>

              <!-- PayPal Button Container -->
              <div id="paypal-button-container-donation" class="mt-6"></div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderBetting() {
    return `
      <div class="p-8">
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2 neon-text">Apuestas</h1>
          <p class="text-gray-400">Predicciones y apuestas deportivas</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="card p-8 text-center">
            <div class="text-6xl mb-4">🎲</div>
            <h2 class="text-2xl font-bold mb-4">Función en Desarrollo</h2>
            <p class="text-gray-400 mb-6">
              Estamos trabajando en un sistema de predicciones y apuestas amigables para Liga MX
            </p>
            
            <div class="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
              <p class="text-yellow-400 text-sm">
                ⚠️ Recordatorio: El juego responsable es importante. Esta función será solo para entretenimiento.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div class="bg-muted rounded-lg p-6">
                <div class="text-2xl mb-2">🔮</div>
                <h3 class="font-bold mb-2">Predicciones</h3>
                <p class="text-sm text-gray-400">Predice resultados de partidos</p>
              </div>
              <div class="bg-muted rounded-lg p-6">
                <div class="text-2xl mb-2">🏆</div>
                <h3 class="font-bold mb-2">Ranking</h3>
                <p class="text-sm text-gray-400">Compite con otros usuarios</p>
              </div>
              <div class="bg-muted rounded-lg p-6">
                <div class="text-2xl mb-2">🎁</div>
                <h3 class="font-bold mb-2">Premios</h3>
                <p class="text-sm text-gray-400">Gana puntos y reconocimientos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

});

// Additional utility functions
window.FootballComponents = {
  
  // Format date helper
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },

  // Format time helper
  formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Animate number counting
  animateNumber(element, target, duration = 1000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

};