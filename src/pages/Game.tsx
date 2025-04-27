
import React, { useState } from 'react';
import Header from '@/components/Header';
import MemoryGame from '@/components/MemoryGame';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-blue via-white to-celebration-pink">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-pacifico text-celebration-purple mb-2">
              Justina's Wedding Memory Game
            </h1>
            <p className="text-lg font-montserrat text-gray-600">
              Match all the pairs to complete the game!
            </p>
          </div>
          
          <MemoryGame />
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/')}
              variant="outline" 
              className="border-celebration-purple text-celebration-purple hover:bg-celebration-purple/10"
            >
              Back to Celebration
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="bg-white/20 backdrop-blur-sm py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-800">
          <p className="font-montserrat">Made with 💖 for Justina by Your bro. Goodness</p>
          <p className="font-montserrat text-sm mt-1">Powered by GRIDVEM</p>
        </div>
      </footer>
    </div>
  );
};

export default Game;
