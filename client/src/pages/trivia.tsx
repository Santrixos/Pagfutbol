import { useState } from "react";
import { motion } from "framer-motion";
import { type TeamConfig, getAllTeams } from "@/lib/team-config";
import { getPlayersByTeam } from "@/lib/team-players";
import { type Language } from "@/lib/i18n";
import { FuturisticBackground, GlassCard, NeonButton } from "@/components/futuristic-background";

interface TriviaProps {
  selectedTeam: TeamConfig;
  language: Language;
}

interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function Trivia({ selectedTeam, language }: TriviaProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const allTeams = getAllTeams();
  const teamPlayers = getPlayersByTeam(selectedTeam.slug);

  // Comprehensive trivia questions for Liga MX
  const generateQuestions = (): TriviaQuestion[] => {
    const easyQuestions: TriviaQuestion[] = [
      {
        question: `¿En qué año fue fundado ${selectedTeam.name}?`,
        options: [
          (selectedTeam.founded - 10).toString(),
          selectedTeam.founded.toString(),
          (selectedTeam.founded + 5).toString(),
          (selectedTeam.founded + 15).toString()
        ],
        correct: 1,
        explanation: `${selectedTeam.name} fue fundado en ${selectedTeam.founded}.`,
        difficulty: 'easy'
      },
      {
        question: `¿Cuál es el apodo de ${selectedTeam.name}?`,
        options: [
          "Los Leones",
          selectedTeam.nickname,
          "Los Tigres", 
          "Las Águilas"
        ],
        correct: 1,
        explanation: `El apodo de ${selectedTeam.name} es ${selectedTeam.nickname}.`,
        difficulty: 'easy'
      },
      {
        question: `¿En qué ciudad juega ${selectedTeam.name}?`,
        options: [
          "Guadalajara",
          selectedTeam.city,
          "Monterrey",
          "Puebla"
        ],
        correct: 1,
        explanation: `${selectedTeam.name} juega en ${selectedTeam.city}.`,
        difficulty: 'easy'
      },
      {
        question: `¿Cuál es el estadio de ${selectedTeam.name}?`,
        options: [
          "Estadio Azteca",
          selectedTeam.stadium,
          "Estadio Akron",
          "Estadio BBVA"
        ],
        correct: 1,
        explanation: `${selectedTeam.name} juega en el ${selectedTeam.stadium}.`,
        difficulty: 'easy'
      }
    ];

    const mediumQuestions: TriviaQuestion[] = [
      {
        question: `¿Cuál es la capacidad del ${selectedTeam.stadium}?`,
        options: [
          (selectedTeam.capacity - 5000).toLocaleString(),
          selectedTeam.capacity.toLocaleString(),
          (selectedTeam.capacity + 10000).toLocaleString(),
          (selectedTeam.capacity + 20000).toLocaleString()
        ],
        correct: 1,
        explanation: `El ${selectedTeam.stadium} tiene una capacidad de ${selectedTeam.capacity.toLocaleString()} espectadores.`,
        difficulty: 'medium'
      },
      {
        question: `¿Cuántos títulos de liga ha ganado ${selectedTeam.name}?`,
        options: [
          selectedTeam.achievements[0]?.split(' ')[0] || "0",
          "15",
          "20",
          "25"
        ],
        correct: 0,
        explanation: `${selectedTeam.name} ha ganado ${selectedTeam.achievements[0] || "varios títulos"}.`,
        difficulty: 'medium'
      },
      {
        question: `¿Quién es el máximo goleador actual de ${selectedTeam.name}?`,
        options: teamPlayers.length > 0 ? [
          teamPlayers.sort((a, b) => b.goals - a.goals)[0]?.name || "Jugador 1",
          teamPlayers[1]?.name || "Jugador 2",
          teamPlayers[2]?.name || "Jugador 3",
          teamPlayers[3]?.name || "Jugador 4"
        ] : ["Jugador A", "Jugador B", "Jugador C", "Jugador D"],
        correct: 0,
        explanation: `El máximo goleador actual es ${teamPlayers.sort((a, b) => b.goals - a.goals)[0]?.name || "uno de los delanteros del equipo"}.`,
        difficulty: 'medium'
      }
    ];

    const hardQuestions: TriviaQuestion[] = [
      {
        question: `¿Cuál es uno de los principales rivales de ${selectedTeam.name}?`,
        options: [
          selectedTeam.rivals[0] || "América",
          "Barcelona",
          "Real Madrid",
          "Manchester United"
        ],
        correct: 0,
        explanation: `Uno de los principales rivales de ${selectedTeam.name} es ${selectedTeam.rivals[0] || "un equipo tradicional de Liga MX"}.`,
        difficulty: 'hard'
      },
      {
        question: `¿Cuál de estos datos es cierto sobre ${selectedTeam.name}?`,
        options: [
          selectedTeam.facts[0] || "Es un equipo histórico",
          "Nunca ha descendido de categoría",
          "Fue fundado en Estados Unidos",
          "Solo juega partidos internacionales"
        ],
        correct: 0,
        explanation: selectedTeam.facts[0] || `Este es un dato histórico importante sobre ${selectedTeam.name}.`,
        difficulty: 'hard'
      }
    ];

    // Mix questions based on difficulty
    let questions: TriviaQuestion[] = [];
    switch (difficulty) {
      case 'easy':
        questions = easyQuestions.slice(0, 5);
        break;
      case 'medium':
        questions = [...easyQuestions.slice(0, 2), ...mediumQuestions.slice(0, 3)];
        break;
      case 'hard':
        questions = [...easyQuestions.slice(0, 1), ...mediumQuestions.slice(0, 2), ...hardQuestions.slice(0, 2)];
        break;
    }

    // Add general Liga MX questions
    const generalQuestions: TriviaQuestion[] = [
      {
        question: "¿Cuántos equipos participan actualmente en Liga MX?",
        options: ["16", "18", "20", "22"],
        correct: 1,
        explanation: "Liga MX está compuesta por 18 equipos en la máxima categoría.",
        difficulty: 'easy'
      },
      {
        question: "¿Cuál es el equipo con más títulos en Liga MX?",
        options: ["América", "Chivas", "Cruz Azul", "Pumas"],
        correct: 0,
        explanation: "Club América es el equipo con más títulos de liga en México.",
        difficulty: 'medium'
      }
    ];

    return [...questions, ...generalQuestions.slice(0, 2)];
  };

  const [questions] = useState(() => generateQuestions());

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStarted(false);
  };

  const startGame = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FuturisticBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <GlassCard className="max-w-4xl mx-auto text-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4 text-2xl"
                  style={{ backgroundColor: selectedTeam.primaryColor }}
                >
                  {selectedTeam.icon}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Trivia de {selectedTeam.name}
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8">
                Pon a prueba tus conocimientos sobre {selectedTeam.nickname} y Liga MX
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => startGame('easy')}
                >
                  <GlassCard className="p-6 border-2 border-green-400/50 hover:border-green-400">
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Fácil</h3>
                    <p className="text-gray-300">Preguntas básicas sobre el equipo</p>
                    <div className="mt-4 text-green-400 text-3xl">⭐</div>
                  </GlassCard>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => startGame('medium')}
                >
                  <GlassCard className="p-6 border-2 border-yellow-400/50 hover:border-yellow-400">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">Medio</h3>
                    <p className="text-gray-300">Datos y estadísticas del equipo</p>
                    <div className="mt-4 text-yellow-400 text-3xl">⭐⭐</div>
                  </GlassCard>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => startGame('hard')}
                >
                  <GlassCard className="p-6 border-2 border-red-400/50 hover:border-red-400">
                    <h3 className="text-2xl font-bold text-red-400 mb-2">Difícil</h3>
                    <p className="text-gray-300">Para verdaderos expertos</p>
                    <div className="mt-4 text-red-400 text-3xl">⭐⭐⭐</div>
                  </GlassCard>
                </motion.div>
              </div>

              <p className="text-sm text-gray-400">
                Selecciona tu nivel de dificultad para comenzar
              </p>
            </motion.div>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const getDifficultyColor = () => {
      switch (difficulty) {
        case 'easy': return 'text-green-400';
        case 'medium': return 'text-yellow-400';
        case 'hard': return 'text-red-400';
      }
    };

    return (
      <div className="min-h-screen relative overflow-hidden">
        <FuturisticBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <GlassCard className="max-w-2xl mx-auto text-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                ¡Trivia Completada!
              </h1>
              
              <div className="text-6xl mb-4">
                {percentage >= 90 ? "🏆" : percentage >= 70 ? "🥈" : percentage >= 50 ? "🥉" : "📚"}
              </div>
              
              <p className="text-2xl text-gray-300 mb-2">
                Puntuación: {score}/{questions.length}
              </p>
              
              <p className="text-xl text-gray-400 mb-2">
                {percentage}% correcto
              </p>
              
              <p className={`text-lg mb-8 ${getDifficultyColor()}`}>
                Dificultad: {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Medio' : 'Difícil'}
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 justify-center">
                  <NeonButton
                    onClick={resetGame}
                    className="px-8 py-3"
                  >
                    Jugar de Nuevo
                  </NeonButton>
                </div>

                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    ¿Sabías que...?
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {selectedTeam.facts[Math.floor(Math.random() * selectedTeam.facts.length)]}
                  </p>
                </div>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      <div className="relative z-10 p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <div className="flex items-center space-x-4">
                  <span className={`font-semibold ${
                    difficulty === 'easy' ? 'text-green-400' : 
                    difficulty === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Medio' : 'Difícil'}
                  </span>
                  <span className="text-white font-semibold">
                    Puntuación: {score}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-red-500 to-white h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => selectedAnswer === null && handleAnswer(index)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-lg font-semibold ${
                      selectedAnswer === null
                        ? "border-gray-600 bg-gray-800/50 hover:border-red-400 hover:bg-red-400/10 text-white"
                        : selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? "border-green-400 bg-green-400/20 text-green-400"
                          : "border-red-400 bg-red-400/20 text-red-400"
                        : index === questions[currentQuestion].correct
                        ? "border-green-400 bg-green-400/20 text-green-400"
                        : "border-gray-600 bg-gray-800/30 text-gray-400"
                    }`}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-blue-900/30 border border-blue-400"
                >
                  <p className="text-blue-200">
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}