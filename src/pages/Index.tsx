
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from '@/components/Header';
import MemoryGame from '@/components/MemoryGame';
import Confetti from '@/components/Confetti';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show confetti on initial load
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePlayGame = () => {
    setShowGame(true);
  };

  const handleBackToMessage = () => {
    setShowGame(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-blue via-celebration-pink to-celebration-purple">
      {showConfetti && <Confetti />}
      
      <Header onPlayGame={handlePlayGame} />
      
      <div className="container mx-auto px-4 py-8">
        {showGame ? (
          <div className="bg-white rounded-lg shadow-xl p-4 mb-8 animate-fade-in">
            <Button 
              onClick={handleBackToMessage}
              className="mb-4 bg-celebration-purple hover:bg-purple-600 text-white"
            >
              Back to Message
            </Button>
            <MemoryGame />
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center py-10">
              <h1 className="text-4xl md:text-6xl font-pacifico text-white mb-4 animate-pulse-scale">
                Congratulations Justina!
              </h1>
              <p className="text-xl md:text-2xl font-montserrat text-white/90 mb-8">
                On Your Joyful Marriage
              </p>
              <div className="flex justify-center">
                <Heart className="text-red-500 h-16 w-16 animate-float" fill="#f87171" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-pacifico text-celebration-purple mb-4">A Special Message For You</h2>
                  <p className="text-lg font-montserrat mb-4">
                    Dear Justina,
                  </p>
                  <p className="font-montserrat mb-3">
                    Although I couldn't make it to your special day, I wanted to send you my warmest wishes and congratulations on your marriage!
                  </p>
                  <p className="font-montserrat mb-3">
                    May your union be blessed with endless love, laughter, and beautiful moments that you'll cherish forever. I hope this little gift brings a smile to your face!
                  </p>
                  <p className="font-montserrat mb-3">
                    Wishing you all the happiness in the world as you begin this wonderful journey together.
                  </p>
                  <p className="font-montserrat mt-4 font-medium">
                    With love and best wishes,
                  </p>
                  <p className="font-pacifico text-xl text-celebration-purple mt-1">
                    Your bro. Goodness
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6 h-full flex flex-col">
                  <h2 className="text-2xl font-pacifico text-celebration-purple mb-4">Celebration Games!</h2>
                  <p className="text-lg font-montserrat mb-6">
                    I've created some fun marriage-themed games just for you! Enjoy these special games to celebrate your new journey.
                  </p>
                  <div className="grid grid-cols-1 gap-3 mt-auto">
                    <Button 
                      onClick={handlePlayGame}
                      className="w-full bg-gradient-to-r from-celebration-purple to-celebration-pink hover:opacity-90 text-white font-medium text-lg py-6"
                    >
                      Play Memory Game
                    </Button>
                    <Button 
                      onClick={() => navigate('/love-quiz')}
                      className="w-full bg-gradient-to-r from-celebration-gold to-celebration-pink hover:opacity-90 text-white font-medium text-lg py-6"
                    >
                      Marriage Quiz
                    </Button>
                    <Button 
                      onClick={() => navigate('/word-scramble')}
                      className="w-full bg-gradient-to-r from-celebration-blue to-celebration-purple hover:opacity-90 text-white font-medium text-lg py-6"
                    >
                      Wedding Word Scramble
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 mt-8">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-pacifico text-celebration-gold mb-4">May Your Marriage Be Filled With...</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-celebration-pink/20 p-4 rounded-lg">
                    <p className="font-montserrat font-bold">Love</p>
                    <p className="font-montserrat text-sm">That grows stronger every day</p>
                  </div>
                  <div className="bg-celebration-purple/20 p-4 rounded-lg">
                    <p className="font-montserrat font-bold">Laughter</p>
                    <p className="font-montserrat text-sm">Even in challenging times</p>
                  </div>
                  <div className="bg-celebration-blue/20 p-4 rounded-lg">
                    <p className="font-montserrat font-bold">Understanding</p>
                    <p className="font-montserrat text-sm">And deep compassion</p>
                  </div>
                  <div className="bg-celebration-gold/20 p-4 rounded-lg">
                    <p className="font-montserrat font-bold">Adventure</p>
                    <p className="font-montserrat text-sm">As you journey through life</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <footer className="bg-white/20 backdrop-blur-sm py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="font-montserrat">Made with 💖 for Justina by Your bro. Goodness</p>
          <p className="font-montserrat text-sm mt-1">Powered by GRIDVEM</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
