
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Cake, Gift, Trophy, Star, PartyPopper, Award, Bell } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Confetti from './Confetti';

interface CardItem {
  id: number;
  type: string;
  icon: React.ReactNode;
  isFlipped: boolean;
  isMatched: boolean;
}

const generateCards = () => {
  const icons = [
    { type: 'heart', icon: <Heart size={40} className="text-pink-500" /> },
    { type: 'cake', icon: <Cake size={40} className="text-purple-500" /> },
    { type: 'gift', icon: <Gift size={40} className="text-blue-500" /> },
    { type: 'trophy', icon: <Trophy size={40} className="text-yellow-500" /> },
    { type: 'star', icon: <Star size={40} className="text-amber-500" /> },
    { type: 'party', icon: <PartyPopper size={40} className="text-green-500" /> },
    { type: 'award', icon: <Award size={40} className="text-red-500" /> },
    { type: 'bell', icon: <Bell size={40} className="text-indigo-500" /> },
  ];

  const pairs = [...icons, ...icons];
  
  return pairs.map((item, index) => ({
    id: index,
    type: item.type,
    icon: item.icon,
    isFlipped: false,
    isMatched: false,
  })).sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>(generateCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    if (matchedPairs === 8) {
      setGameOver(true);
      setShowConfetti(true);
      setTimeout(() => {
        toast({
          title: "Congratulations!",
          description: `You completed the game in ${moves} moves!`,
        });
      }, 500);
    }
  }, [matchedPairs, moves]);

  const handleCardClick = (id: number) => {
    // If already flipped or matched, do nothing
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id].isFlipped = true;
    setCards(updatedCards);
    setFlippedCards([...flippedCards, id]);

    // Check for a match when two cards are flipped
    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const firstCardId = flippedCards[0];
      const secondCardId = id;
      
      if (cards[firstCardId].type === cards[secondCardId].type) {
        // It's a match!
        updatedCards[firstCardId].isMatched = true;
        updatedCards[secondCardId].isMatched = true;
        setCards(updatedCards);
        setFlippedCards([]);
        setMatchedPairs(matchedPairs + 1);
      } else {
        // It's not a match, flip back after delay
        setTimeout(() => {
          updatedCards[firstCardId].isFlipped = false;
          updatedCards[secondCardId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameOver(false);
    setShowConfetti(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showConfetti && <Confetti />}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-montserrat">
          <span className="font-bold text-celebration-purple">Moves:</span> {moves}
        </div>
        <div className="text-lg font-montserrat">
          <span className="font-bold text-celebration-purple">Pairs:</span> {matchedPairs}/8
        </div>
        <Button onClick={resetGame} className="bg-celebration-purple hover:bg-purple-600 text-white">
          Reset Game
        </Button>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-4 gap-3 perspective-1000">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className={`cursor-pointer h-24 md:h-32 transition-transform duration-500 transform-style-preserve-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <Card className={`h-full w-full flex items-center justify-center absolute inset-0 ${card.isMatched ? 'opacity-60' : ''}`}>
              {card.isFlipped ? (
                <div className="flex items-center justify-center h-full">
                  {card.icon}
                </div>
              ) : (
                <div className="bg-gradient-to-r from-celebration-pink to-celebration-purple h-full w-full flex items-center justify-center">
                  <span className="text-3xl font-pacifico text-white">J</span>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-pacifico text-celebration-purple mb-4">Congratulations!</h2>
          <p className="text-lg font-montserrat mb-4">
            You completed the game in <span className="font-bold">{moves}</span> moves!
          </p>
          <Button onClick={resetGame} className="bg-celebration-gold hover:bg-yellow-500 text-white">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
