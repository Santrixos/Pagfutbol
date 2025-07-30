export interface Player {
  name: string;
  position: string;
  number: number;
  age: number;
  goals: number;
  assists: number;
  appearances: number;
}

export const TEAM_PLAYERS: Record<string, Player[]> = {
  america: [
    { name: "Rodolfo Cota", position: "Portero", number: 1, age: 35, goals: 0, assists: 1, appearances: 25 },
    { name: "Luis Malagón", position: "Portero", number: 12, age: 30, goals: 0, assists: 0, appearances: 10 },
    { name: "Israel Reyes", position: "Defensa", number: 2, age: 24, goals: 2, assists: 3, appearances: 28 },
    { name: "Sebastián Cáceres", position: "Defensa", number: 3, age: 24, goals: 1, assists: 2, appearances: 30 },
    { name: "Néstor Araujo", position: "Defensa", number: 4, age: 32, goals: 3, assists: 1, appearances: 25 },
    { name: "Ramón Juárez", position: "Defensa", number: 31, age: 26, goals: 1, assists: 0, appearances: 20 },
    { name: "Álvaro Fidalgo", position: "Mediocampo", number: 8, age: 27, goals: 8, assists: 12, appearances: 32 },
    { name: "Diego Valdés", position: "Mediocampo", number: 10, age: 30, goals: 6, assists: 8, appearances: 28 },
    { name: "Jonathan Dos Santos", position: "Mediocampo", number: 6, age: 34, goals: 2, assists: 5, appearances: 22 },
    { name: "Henry Martín", position: "Delantero", number: 21, age: 31, goals: 18, assists: 4, appearances: 30 },
    { name: "Julián Quiñones", position: "Delantero", number: 33, age: 27, goals: 12, assists: 6, appearances: 25 },
    { name: "Brian Rodríguez", position: "Delantero", number: 17, age: 24, goals: 5, assists: 7, appearances: 20 }
  ],
  chivas: [
    { name: "Raúl Rangel", position: "Portero", number: 1, age: 26, goals: 0, assists: 0, appearances: 25 },
    { name: "Miguel Jiménez", position: "Portero", number: 27, age: 20, goals: 0, assists: 0, appearances: 8 },
    { name: "Jesús Orozco", position: "Defensa", number: 4, age: 22, goals: 2, assists: 1, appearances: 30 },
    { name: "Gilberto Sepúlveda", position: "Defensa", number: 3, age: 24, goals: 1, assists: 0, appearances: 25 },
    { name: "Luis Olivas", position: "Defensa", number: 5, age: 26, goals: 0, assists: 2, appearances: 20 },
    { name: "Alan Mozo", position: "Defensa", number: 2, age: 25, goals: 1, assists: 4, appearances: 28 },
    { name: "Fernando Beltrán", position: "Mediocampo", number: 20, age: 25, goals: 3, assists: 6, appearances: 30 },
    { name: "Roberto Alvarado", position: "Mediocampo", number: 25, age: 26, goals: 8, assists: 10, appearances: 32 },
    { name: "Víctor Guzmán", position: "Mediocampo", number: 15, age: 29, goals: 4, assists: 5, appearances: 25 },
    { name: "Ricardo Marín", position: "Delantero", number: 19, age: 26, goals: 10, assists: 3, appearances: 28 },
    { name: "Cade Cowell", position: "Delantero", number: 16, age: 21, goals: 6, assists: 4, appearances: 22 },
    { name: "Armando González", position: "Delantero", number: 26, age: 20, goals: 3, assists: 2, appearances: 15 }
  ],
  "cruz-azul": [
    { name: "Kevin Mier", position: "Portero", number: 23, age: 25, goals: 0, assists: 0, appearances: 30 },
    { name: "Andrés Gudiño", position: "Portero", number: 1, age: 28, goals: 0, assists: 0, appearances: 5 },
    { name: "Willer Ditta", position: "Defensa", number: 4, age: 26, goals: 3, assists: 1, appearances: 32 },
    { name: "Gonzalo Piovi", position: "Defensa", number: 21, age: 25, goals: 1, assists: 3, appearances: 28 },
    { name: "Erik Lira", position: "Defensa", number: 6, age: 24, goals: 2, assists: 2, appearances: 30 },
    { name: "Carlos Rotondi", position: "Defensa", number: 29, age: 25, goals: 2, assists: 6, appearances: 25 },
    { name: "Lorenzo Faravelli", position: "Mediocampo", number: 8, age: 23, goals: 4, assists: 7, appearances: 30 },
    { name: "Ignacio Rivero", position: "Mediocampo", number: 10, age: 30, goals: 6, assists: 8, appearances: 28 },
    { name: "Carlos Rodríguez", position: "Mediocampo", number: 14, age: 27, goals: 5, assists: 9, appearances: 32 },
    { name: "Ángel Sepúlveda", position: "Delantero", number: 99, age: 30, goals: 15, assists: 5, appearances: 30 },
    { name: "Giorgos Giakoumakis", position: "Delantero", number: 11, age: 30, goals: 8, assists: 2, appearances: 18 },
    { name: "Alexis Gutiérrez", position: "Delantero", number: 19, age: 25, goals: 4, assists: 3, appearances: 20 }
  ],
  pumas: [
    { name: "Julio González", position: "Portero", number: 1, age: 28, goals: 0, assists: 1, appearances: 30 },
    { name: "Gil Alcalá", position: "Portero", number: 13, age: 31, goals: 0, assists: 0, appearances: 5 },
    { name: "Nathan Silva", position: "Defensa", number: 4, age: 30, goals: 2, assists: 1, appearances: 28 },
    { name: "Lisandro Magallán", position: "Defensa", number: 2, age: 31, goals: 1, assists: 0, appearances: 25 },
    { name: "José Caicedo", position: "Defensa", number: 6, age: 25, goals: 0, assists: 2, appearances: 22 },
    { name: "Pablo Bennevendo", position: "Defensa", number: 14, age: 21, goals: 1, assists: 3, appearances: 20 },
    { name: "César Huerta", position: "Mediocampo", number: 12, age: 23, goals: 7, assists: 5, appearances: 30 },
    { name: "Jorge Ruvalcaba", position: "Mediocampo", number: 15, age: 22, goals: 3, assists: 4, appearances: 25 },
    { name: "Piero Quispe", position: "Mediocampo", number: 8, age: 22, goals: 2, assists: 6, appearances: 20 },
    { name: "Guillermo Martínez", position: "Delantero", number: 9, age: 27, goals: 12, assists: 3, appearances: 28 },
    { name: "Robert Ergas", position: "Delantero", number: 24, age: 21, goals: 4, assists: 2, appearances: 18 },
    { name: "Ignacio Pussetto", position: "Delantero", number: 29, age: 28, goals: 6, assists: 4, appearances: 22 }
  ],
  tigres: [
    { name: "Nahuel Guzmán", position: "Portero", number: 1, age: 38, goals: 0, assists: 0, appearances: 25 },
    { name: "Rodolfo Salinas", position: "Portero", number: 22, age: 24, goals: 0, assists: 0, appearances: 8 },
    { name: "Samir Caetano", position: "Defensa", number: 3, age: 25, goals: 1, assists: 2, appearances: 28 },
    { name: "Joaquim Pereira", position: "Defensa", number: 4, age: 27, goals: 2, assists: 1, appearances: 30 },
    { name: "Diego Lainez", position: "Defensa", number: 20, age: 24, goals: 0, assists: 4, appearances: 25 },
    { name: "Jesús Garza", position: "Defensa", number: 27, age: 21, goals: 1, assists: 1, appearances: 20 },
    { name: "Fernando Gorriarán", position: "Mediocampo", number: 8, age: 27, goals: 6, assists: 8, appearances: 30 },
    { name: "Rafael Carioca", position: "Mediocampo", number: 5, age: 32, goals: 2, assists: 5, appearances: 28 },
    { name: "Sebastián Córdova", position: "Mediocampo", number: 10, age: 27, goals: 4, assists: 6, appearances: 25 },
    { name: "André-Pierre Gignac", position: "Delantero", number: 10, age: 38, goals: 8, assists: 3, appearances: 20 },
    { name: "Nicolás Ibáñez", position: "Delantero", number: 9, age: 29, goals: 12, assists: 2, appearances: 25 },
    { name: "Juan Vigón", position: "Delantero", number: 14, age: 29, goals: 3, assists: 4, appearances: 22 }
  ],
  monterrey: [
    { name: "Esteban Andrada", position: "Portero", number: 1, age: 33, goals: 0, assists: 0, appearances: 30 },
    { name: "Luis Cárdenas", position: "Portero", number: 25, age: 27, goals: 0, assists: 0, appearances: 5 },
    { name: "Héctor Moreno", position: "Defensa", number: 15, age: 36, goals: 2, assists: 1, appearances: 25 },
    { name: "Stefan Medina", position: "Defensa", number: 33, age: 32, goals: 1, assists: 3, appearances: 28 },
    { name: "Gerardo Arteaga", position: "Defensa", number: 3, age: 25, goals: 3, assists: 5, appearances: 30 },
    { name: "Víctor Guzmán", position: "Defensa", number: 4, age: 29, goals: 0, assists: 2, appearances: 22 },
    { name: "Sergio Canales", position: "Mediocampo", number: 10, age: 33, goals: 8, assists: 12, appearances: 28 },
    { name: "Óliver Torres", position: "Mediocampo", number: 14, age: 30, goals: 4, assists: 8, appearances: 25 },
    { name: "Jorge Rodríguez", position: "Mediocampo", number: 30, age: 26, goals: 2, assists: 4, appearances: 30 },
    { name: "Germán Berterame", position: "Delantero", number: 7, age: 29, goals: 14, assists: 4, appearances: 32 },
    { name: "Brandon Vázquez", position: "Delantero", number: 9, age: 26, goals: 10, assists: 3, appearances: 25 },
    { name: "Jesús Corona", position: "Delantero", number: 17, age: 31, goals: 5, assists: 6, appearances: 20 }
  ],
  santos: [
    { name: "Carlos Acevedo", position: "Portero", number: 1, age: 28, goals: 0, assists: 0, appearances: 30 },
    { name: "Gibran Lajud", position: "Portero", number: 22, age: 30, goals: 0, assists: 0, appearances: 5 },
    { name: "Anderson Santamaría", position: "Defensa", number: 4, age: 32, goals: 1, assists: 0, appearances: 25 },
    { name: "Dória", position: "Defensa", number: 2, age: 29, goals: 2, assists: 1, appearances: 28 },
    { name: "Ismael Govea", position: "Defensa", number: 3, age: 28, goals: 0, assists: 3, appearances: 30 },
    { name: "Salvador Mariscal", position: "Defensa", number: 26, age: 22, goals: 1, assists: 2, appearances: 20 },
    { name: "Pedro Aquino", position: "Mediocampo", number: 5, age: 29, goals: 3, assists: 4, appearances: 28 },
    { name: "Santiago Muñóz", position: "Mediocampo", number: 30, age: 22, goals: 5, assists: 3, appearances: 25 },
    { name: "Anthony Lozano", position: "Mediocampo", number: 11, age: 31, goals: 2, assists: 5, appearances: 22 },
    { name: "Franco Fagúndez", position: "Delantero", number: 10, age: 29, goals: 8, assists: 6, appearances: 30 },
    { name: "Santiago Giménez", position: "Delantero", number: 9, age: 23, goals: 12, assists: 4, appearances: 25 },
    { name: "Harold Preciado", position: "Delantero", number: 21, age: 30, goals: 9, assists: 2, appearances: 28 }
  ],
  atlas: [
    { name: "Camilo Vargas", position: "Portero", number: 1, age: 35, goals: 0, assists: 0, appearances: 30 },
    { name: "José Hernández", position: "Portero", number: 12, age: 26, goals: 0, assists: 0, appearances: 5 },
    { name: "Martín Nervo", position: "Defensa", number: 2, age: 31, goals: 2, assists: 1, appearances: 28 },
    { name: "Adrián Mora", position: "Defensa", number: 3, age: 26, goals: 1, assists: 0, appearances: 25 },
    { name: "Luis Reyes", position: "Defensa", number: 16, age: 29, goals: 0, assists: 4, appearances: 30 },
    { name: "Gaddi Aguirre", position: "Defensa", number: 5, age: 24, goals: 1, assists: 2, appearances: 22 },
    { name: "Aldo Rocha", position: "Mediocampo", number: 6, age: 30, goals: 4, assists: 6, appearances: 32 },
    { name: "José Lozano", position: "Mediocampo", number: 26, age: 23, goals: 2, assists: 3, appearances: 25 },
    { name: "Jeremy Márquez", position: "Mediocampo", number: 18, age: 25, goals: 3, assists: 5, appearances: 28 },
    { name: "Julián Quiñones", position: "Delantero", number: 33, age: 27, goals: 15, assists: 4, appearances: 30 },
    { name: "Eduardo Aguirre", position: "Delantero", number: 19, age: 27, goals: 8, assists: 2, appearances: 25 },
    { name: "Uros Djurdjevic", position: "Delantero", number: 9, age: 32, goals: 6, assists: 3, appearances: 20 }
  ],
  leon: [
    { name: "Rodolfo Cota", position: "Portero", number: 30, age: 36, goals: 0, assists: 0, appearances: 25 },
    { name: "Alfonso Blanco", position: "Portero", number: 1, age: 29, goals: 0, assists: 0, appearances: 10 },
    { name: "Paúl Bellón", position: "Defensa", number: 25, age: 22, goals: 1, assists: 2, appearances: 28 },
    { name: "Stiven Barreiro", position: "Defensa", number: 4, age: 29, goals: 2, assists: 0, appearances: 30 },
    { name: "Jaine Barreiro", position: "Defensa", number: 5, age: 27, goals: 0, assists: 1, appearances: 25 },
    { name: "Salvador Reyes", position: "Defensa", number: 26, age: 25, goals: 1, assists: 3, appearances: 22 },
    { name: "José Alvarado", position: "Mediocampo", number: 8, age: 26, goals: 3, assists: 5, appearances: 30 },
    { name: "Andrés Guardado", position: "Mediocampo", number: 18, age: 38, goals: 1, assists: 4, appearances: 20 },
    { name: "David Ramírez", position: "Mediocampo", number: 6, age: 24, goals: 2, assists: 3, appearances: 25 },
    { name: "Jhonder Cádiz", position: "Delantero", number: 29, age: 27, goals: 10, assists: 3, appearances: 28 },
    { name: "Edgar Guerra", position: "Delantero", number: 27, age: 23, goals: 6, assists: 4, appearances: 22 },
    { name: "Ettson Ayón", position: "Delantero", number: 14, age: 22, goals: 4, assists: 2, appearances: 18 }
  ],
  toluca: [
    { name: "Tiago Volpi", position: "Portero", number: 1, age: 34, goals: 0, assists: 0, appearances: 28 },
    { name: "Luis García", position: "Portero", number: 25, age: 27, goals: 0, assists: 0, appearances: 7 },
    { name: "Luan García", position: "Defensa", number: 4, age: 31, goals: 2, assists: 1, appearances: 30 },
    { name: "Valber Huerta", position: "Defensa", number: 17, age: 30, goals: 1, assists: 0, appearances: 25 },
    { name: "Brian García", position: "Defensa", number: 15, age: 26, goals: 0, assists: 2, appearances: 28 },
    { name: "Claudio Baeza", position: "Defensa", number: 5, age: 32, goals: 1, assists: 1, appearances: 22 },
    { name: "Marcel Ruiz", position: "Mediocampo", number: 14, age: 25, goals: 4, assists: 6, appearances: 30 },
    { name: "Jean Meneses", position: "Mediocampo", number: 10, age: 31, goals: 6, assists: 8, appearances: 28 },
    { name: "Alexis Vega", position: "Mediocampo", number: 11, age: 27, goals: 8, assists: 5, appearances: 25 },
    { name: "Paulinho", position: "Delantero", number: 7, age: 34, goals: 12, assists: 4, appearances: 30 },
    { name: "Jesús Piñuelas", position: "Delantero", number: 21, age: 23, goals: 5, assists: 2, appearances: 20 },
    { name: "Juan Domínguez", position: "Delantero", number: 19, age: 24, goals: 3, assists: 3, appearances: 18 }
  ],
  pachuca: [
    { name: "Carlos Moreno", position: "Portero", number: 1, age: 26, goals: 0, assists: 0, appearances: 30 },
    { name: "Oscar Ustari", position: "Portero", number: 22, age: 38, goals: 0, assists: 0, appearances: 5 },
    { name: "Gustavo Cabral", position: "Defensa", number: 2, age: 31, goals: 2, assists: 1, appearances: 28 },
    { name: "Andrés Micolta", position: "Defensa", number: 33, age: 25, goals: 1, assists: 0, appearances: 25 },
    { name: "Bryan González", position: "Defensa", number: 8, age: 24, goals: 0, assists: 3, appearances: 22 },
    { name: "Luis Rodríguez", position: "Defensa", number: 25, age: 34, goals: 1, assists: 2, appearances: 20 },
    { name: "Elías Montiel", position: "Mediocampo", number: 6, age: 28, goals: 3, assists: 5, appearances: 30 },
    { name: "Nelson Deossa", position: "Mediocampo", number: 15, age: 21, goals: 4, assists: 4, appearances: 25 },
    { name: "Oussama Idrissi", position: "Mediocampo", number: 11, age: 28, goals: 6, assists: 7, appearances: 28 },
    { name: "Salomón Rondón", position: "Delantero", number: 23, age: 35, goals: 14, assists: 3, appearances: 30 },
    { name: "Owen González", position: "Delantero", number: 26, age: 19, goals: 3, assists: 1, appearances: 15 },
    { name: "Borja Bastón", position: "Delantero", number: 9, age: 32, goals: 7, assists: 2, appearances: 22 }
  ],
  puebla: [
    { name: "Jesús Rodríguez", position: "Portero", number: 1, age: 30, goals: 0, assists: 0, appearances: 28 },
    { name: "Sebastián Olmedo", position: "Portero", number: 25, age: 24, goals: 0, assists: 0, appearances: 7 },
    { name: "Diego de Buen", position: "Defensa", number: 4, age: 27, goals: 1, assists: 2, appearances: 30 },
    { name: "Gastón Silva", position: "Defensa", number: 16, age: 30, goals: 2, assists: 0, appearances: 25 },
    { name: "Efraín Orona", position: "Defensa", number: 14, age: 29, goals: 0, assists: 1, appearances: 22 },
    { name: "Pablo González", position: "Defensa", number: 5, age: 26, goals: 1, assists: 3, appearances: 28 },
    { name: "Alberto Herrera", position: "Mediocampo", number: 8, age: 25, goals: 4, assists: 5, appearances: 30 },
    { name: "Javier Salas", position: "Mediocampo", number: 15, age: 28, goals: 2, assists: 4, appearances: 25 },
    { name: "Luis Quiñones", position: "Mediocampo", number: 33, age: 29, goals: 3, assists: 6, appearances: 28 },
    { name: "Santiago Ormeño", position: "Delantero", number: 9, age: 30, goals: 8, assists: 2, appearances: 25 },
    { name: "Emiliano Gómez", position: "Delantero", number: 19, age: 22, goals: 4, assists: 3, appearances: 20 },
    { name: "Raúl Castillo", position: "Delantero", number: 26, age: 24, goals: 2, assists: 1, appearances: 15 }
  ],
  tijuana: [
    { name: "Antonio Rodríguez", position: "Portero", number: 2, age: 34, goals: 0, assists: 0, appearances: 25 },
    { name: "Carlos González", position: "Portero", number: 30, age: 28, goals: 0, assists: 0, appearances: 10 },
    { name: "Alejandro Gómez", position: "Defensa", number: 4, age: 29, goals: 1, assists: 2, appearances: 28 },
    { name: "Unai Bilbao", position: "Defensa", number: 3, age: 32, goals: 2, assists: 0, appearances: 25 },
    { name: "Rafael Fernández", position: "Defensa", number: 15, age: 26, goals: 0, assists: 3, appearances: 22 },
    { name: "Kevin Balanta", position: "Defensa", number: 5, age: 31, goals: 1, assists: 1, appearances: 20 },
    { name: "Joe Corona", position: "Mediocampo", number: 14, age: 34, goals: 3, assists: 5, appearances: 25 },
    { name: "Domingo Blanco", position: "Mediocampo", number: 8, age: 30, goals: 2, assists: 4, appearances: 28 },
    { name: "Christian Rivera", position: "Mediocampo", number: 6, age: 28, goals: 1, assists: 3, appearances: 30 },
    { name: "Efraín Álvarez", position: "Delantero", number: 10, age: 22, goals: 6, assists: 4, appearances: 25 },
    { name: "Raúl Zúñiga", position: "Delantero", number: 9, age: 27, goals: 8, assists: 2, appearances: 22 },
    { name: "Carlos González", position: "Delantero", number: 29, age: 31, goals: 5, assists: 3, appearances: 20 }
  ],
  necaxa: [
    { name: "Ezequiel Unsain", position: "Portero", number: 1, age: 34, goals: 0, assists: 0, appearances: 28 },
    { name: "Raúl Sandoval", position: "Portero", number: 22, age: 26, goals: 0, assists: 0, appearances: 7 },
    { name: "Fabricio Formiliano", position: "Defensa", number: 23, age: 33, goals: 2, assists: 1, appearances: 25 },
    { name: "Alán Montes", position: "Defensa", number: 3, age: 26, goals: 1, assists: 2, appearances: 30 },
    { name: "Emilio Martínez", position: "Defensa", number: 4, age: 28, goals: 0, assists: 1, appearances: 22 },
    { name: "Diego Gómez", position: "Defensa", number: 16, age: 25, goals: 1, assists: 3, appearances: 20 },
    { name: "José Paradela", position: "Mediocampo", number: 10, age: 29, goals: 5, assists: 7, appearances: 28 },
    { name: "Agustín Palavecino", position: "Mediocampo", number: 26, age: 28, goals: 4, assists: 5, appearances: 25 },
    { name: "Fernando Arce", position: "Mediocampo", number: 8, age: 32, goals: 2, assists: 4, appearances: 30 },
    { name: "Diber Cambindo", position: "Delantero", number: 27, age: 26, goals: 9, assists: 3, appearances: 25 },
    { name: "Ricardo Monreal", position: "Delantero", number: 11, age: 24, goals: 6, assists: 2, appearances: 22 },
    { name: "Heriberto Jurado", position: "Delantero", number: 15, age: 23, goals: 3, assists: 4, appearances: 18 }
  ],
  queretaro: [
    { name: "Guillermo Allison", position: "Portero", number: 1, age: 31, goals: 0, assists: 0, appearances: 30 },
    { name: "Gil Alcalá", position: "Portero", number: 25, age: 32, goals: 0, assists: 0, appearances: 5 },
    { name: "Franco Russo", position: "Defensa", number: 6, age: 25, goals: 2, assists: 1, appearances: 28 },
    { name: "Miguel Barbieri", position: "Defensa", number: 4, age: 30, goals: 1, assists: 0, appearances: 25 },
    { name: "Óscar Manzanares", position: "Defensa", number: 16, age: 27, goals: 0, assists: 2, appearances: 22 },
    { name: "Kevin Escamilla", position: "Defensa", number: 205, age: 22, goals: 1, assists: 1, appearances: 20 },
    { name: "Federico Lértora", position: "Mediocampo", number: 5, age: 32, goals: 3, assists: 4, appearances: 30 },
    { name: "Samuel Sosa", position: "Mediocampo", number: 8, age: 26, goals: 2, assists: 5, appearances: 25 },
    { name: "Pablo Barrera", position: "Mediocampo", number: 7, age: 36, goals: 1, assists: 3, appearances: 18 },
    { name: "Ayrton Preciado", position: "Delantero", number: 11, age: 30, goals: 7, assists: 2, appearances: 28 },
    { name: "Jaime Gómez", position: "Delantero", number: 19, age: 24, goals: 4, assists: 3, appearances: 22 },
    { name: "Francisco Venegas", position: "Delantero", number: 27, age: 26, goals: 2, assists: 1, appearances: 15 }
  ],
  mazatlan: [
    { name: "Hugo González", position: "Portero", number: 1, age: 33, goals: 0, assists: 0, appearances: 28 },
    { name: "Ricardo Gutiérrez", position: "Portero", number: 30, age: 25, goals: 0, assists: 0, appearances: 7 },
    { name: "Facundo Almada", position: "Defensa", number: 3, age: 25, goals: 1, assists: 2, appearances: 30 },
    { name: "Ventura Alvarado", position: "Defensa", number: 4, age: 32, goals: 2, assists: 0, appearances: 25 },
    { name: "Bryan Colula", position: "Defensa", number: 15, age: 28, goals: 0, assists: 3, appearances: 22 },
    { name: "Jair Díaz", position: "Defensa", number: 16, age: 27, goals: 1, assists: 1, appearances: 20 },
    { name: "Yoel Bárcenas", position: "Mediocampo", number: 10, age: 30, goals: 4, assists: 6, appearances: 28 },
    { name: "Alan Torres", position: "Mediocampo", number: 6, age: 26, goals: 2, assists: 4, appearances: 25 },
    { name: "Roberto Meraz", position: "Mediocampo", number: 14, age: 24, goals: 3, assists: 2, appearances: 22 },
    { name: "Josué Colmán", position: "Delantero", number: 11, age: 27, goals: 8, assists: 3, appearances: 30 },
    { name: "Gustavo del Prete", position: "Delantero", number: 19, age: 31, goals: 6, assists: 2, appearances: 25 },
    { name: "Brian Rubio", position: "Delantero", number: 18, age: 26, goals: 4, assists: 4, appearances: 20 }
  ],
  juarez: [
    { name: "Sebastián Jurado", position: "Portero", number: 1, age: 27, goals: 0, assists: 0, appearances: 30 },
    { name: "Benny Díaz", position: "Portero", number: 25, age: 29, goals: 0, assists: 0, appearances: 5 },
    { name: "Moisés Mosquera", position: "Defensa", number: 3, age: 26, goals: 1, assists: 2, appearances: 28 },
    { name: "Carlos Salcedo", position: "Defensa", number: 5, age: 31, goals: 2, assists: 0, appearances: 22 },
    { name: "Ralph Orquin", position: "Defensa", number: 34, age: 24, goals: 0, assists: 1, appearances: 25 },
    { name: "Edson Fernando", position: "Defensa", number: 15, age: 27, goals: 1, assists: 3, appearances: 20 },
    { name: "Diego Campillo", position: "Mediocampo", number: 14, age: 24, goals: 3, assists: 4, appearances: 30 },
    { name: "Jairo Torres", position: "Mediocampo", number: 8, age: 29, goals: 2, assists: 5, appearances: 25 },
    { name: "Ángel Zaldívar", position: "Mediocampo", number: 26, age: 30, goals: 4, assists: 3, appearances: 28 },
    { name: "Avilés Hurtado", position: "Delantero", number: 11, age: 33, goals: 7, assists: 4, appearances: 25 },
    { name: "Denzell García", position: "Delantero", number: 19, age: 22, goals: 5, assists: 2, appearances: 20 },
    { name: "Diego Chávez", position: "Delantero", number: 29, age: 28, goals: 3, assists: 3, appearances: 18 }
  ],
  "atletico-san-luis": [
    { name: "Andrés Sánchez", position: "Portero", number: 1, age: 33, goals: 0, assists: 0, appearances: 28 },
    { name: "Marcelo Barovero", position: "Portero", number: 22, age: 40, goals: 0, assists: 0, appearances: 7 },
    { name: "Rodrigo Dourado", position: "Defensa", number: 13, age: 31, goals: 2, assists: 1, appearances: 30 },
    { name: "Julio Domínguez", position: "Defensa", number: 4, age: 37, goals: 1, assists: 0, appearances: 25 },
    { name: "Ricardo Chávez", position: "Defensa", number: 17, age: 30, goals: 0, assists: 2, appearances: 22 },
    { name: "Aldo Cruz", position: "Defensa", number: 12, age: 24, goals: 1, assists: 1, appearances: 20 },
    { name: "Javier Güémez", position: "Mediocampo", number: 5, age: 33, goals: 3, assists: 4, appearances: 28 },
    { name: "Juan Manuel Sanabria", position: "Mediocampo", number: 10, age: 29, goals: 4, assists: 6, appearances: 25 },
    { name: "Vitinho", position: "Mediocampo", number: 11, age: 30, goals: 2, assists: 5, appearances: 22 },
    { name: "Léo Bonatini", position: "Delantero", number: 9, age: 30, goals: 9, assists: 3, appearances: 25 },
    { name: "Franck Boli", position: "Delantero", number: 25, age: 31, goals: 6, assists: 2, appearances: 20 },
    { name: "Benjamín Galdames", position: "Delantero", number: 8, age: 26, goals: 4, assists: 4, appearances: 18 }
  ]
};

export function getPlayersByTeam(teamSlug: string): Player[] {
  return TEAM_PLAYERS[teamSlug] || [];
}

export function getTopScorers(): Player[] {
  const allPlayers = Object.values(TEAM_PLAYERS).flat();
  return allPlayers
    .filter(player => player.goals > 0)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);
}

export function getTopAssists(): Player[] {
  const allPlayers = Object.values(TEAM_PLAYERS).flat();
  return allPlayers
    .filter(player => player.assists > 0)
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 10);
}