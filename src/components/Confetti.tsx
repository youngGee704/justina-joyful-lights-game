
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
}

interface ConfettiProps {
  count?: number;
}

const colors = ['#FFC0CB', '#D8BFD8', '#FFD700', '#ADD8E6', '#FFFFFF'];

const Confetti: React.FC<ConfettiProps> = ({ count = 100 }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 0.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3
      });
    }
    setConfetti(pieces);
  }, [count]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}rem`,
            height: `${piece.size}rem`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
