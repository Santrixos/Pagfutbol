import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export function FuturisticBackground() {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate initial particles
    const newParticles: ParticleProps[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    setParticles(newParticles);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Particle animation
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        y: particle.y < -10 ? window.innerHeight + 10 : particle.y - particle.speed
      })));
    };

    const interval = setInterval(animateParticles, 16);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background with red-black theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-grid-white/[0.05] bg-[size:40px_40px]" />
      </div>

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Interactive mouse glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192
        }}
        animate={{
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-30"
        animate={{
          y: [0, typeof window !== 'undefined' ? window.innerHeight : 800]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60" />
        <div className="absolute top-8 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
      </div>
      
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-purple-400 opacity-60" />
        <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-green-400 opacity-60" />
        <div className="absolute bottom-8 left-8 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-yellow-400 opacity-60" />
        <div className="absolute bottom-8 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function GlassCard({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <motion.div
      className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export function NeonButton({ children, variant = "primary", className = "", onClick, ...props }: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const variants = {
    primary: "bg-blue-500/20 border-blue-400 text-blue-300 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
    secondary: "bg-purple-500/20 border-purple-400 text-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]",
    accent: "bg-cyan-500/20 border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}