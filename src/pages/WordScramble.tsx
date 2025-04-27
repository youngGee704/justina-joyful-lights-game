
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import Header from '@/components/Header';
import Confetti from '@/components/Confetti';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface WordPuzzle {
  scrambled: string;
  correct: string;
  hint: string;
  category: string;
}

const wordList: WordPuzzle[] = [
  { scrambled: "EOVL", correct: "LOVE", hint: "The foundation of marriage", category: "Emotions" },
  { scrambled: "WROEV", correct: "VOWER", hint: "A solemn promise", category: "Ceremony" },
  { scrambled: "PLEOCU", correct: "COUPLE", hint: "Two people in a relationship", category: "Relationship" },
  { scrambled: "GINR", correct: "RING", hint: "A circular symbol of commitment", category: "Jewelry" },
  { scrambled: "DINGWED", correct: "WEDDING", hint: "The celebration of marriage", category: "Event" },
  { scrambled: "PRATHSERNI", correct: "PARTNERSHIP", hint: "Working together in life", category: "Relationship" },
  { scrambled: "TEHRO", correct: "OTHER", hint: "Your significant _____", category: "Relationship" },
  { scrambled: "VEREENYR", correct: "REVERENCE", hint: "Deep respect and admiration", category: "Emotions" },
  { scrambled: "MENCOTMITM", correct: "COMMITMENT", hint: "Dedication to someone or something", category: "Relationship" },
  { scrambled: "RESHAC", correct: "CHERISH", hint: "To hold dear", category: "Emotions" },
];

const WordScramble: React.FC = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [gameActive, setGameActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isComplete && gameActive && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && gameActive) {
      setGameActive(false);
      toast({
        title: "Time's up!",
        description: "The correct answer was " + wordList[currentWord].correct,
      });
    }
  }, [timeRemaining, gameActive, isComplete, currentWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswer();
  };

  const checkAnswer = () => {
    if (userGuess.toUpperCase() === wordList[currentWord].correct) {
      toast({
        title: "Correct!",
        description: "That's the right word!",
      });
      setScore(score + 1);
      nextWord();
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or use a hint!",
      });
    }
  };

  const nextWord = () => {
    if (currentWord < wordList.length - 1) {
      setCurrentWord(currentWord + 1);
      setUserGuess("");
      setShowHint(false);
      setTimeRemaining(30);
      setGameActive(true);
    } else {
      setIsComplete(true);
      setShowConfetti(true);
    }
  };

  const skipWord = () => {
    toast({
      title: "Word skipped",
      description: "The correct answer was " + wordList[currentWord].correct,
    });
    nextWord();
  };

  const revealHint = () => {
    setShowHint(true);
  };

  const resetGame = () => {
    setCurrentWord(0);
    setUserGuess("");
    setScore(0);
    setShowHint(false);
    setIsComplete(false);
    setShowConfetti(false);
    setTimeRemaining(30);
    setGameActive(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-blue via-white to-celebration-pink">
      {showConfetti && <Confetti />}
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-pacifico text-celebration-purple mb-2">
              Wedding Word Scramble
            </h1>
            <p className="text-lg font-montserrat text-gray-600">
              Unscramble these wedding-related words!
            </p>
          </div>
          
          {!isComplete ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="font-bold text-celebration-purple">Word {currentWord + 1}/{wordList.length}</span>
                </div>
                <div>
                  <span className="font-bold text-celebration-purple">Score: {score}</span>
                </div>
                <div className={`font-bold ${timeRemaining < 10 ? 'text-red-500 animate-pulse' : 'text-celebration-purple'}`}>
                  Time: {timeRemaining}s
                </div>
              </div>
              
              <Card className="border-celebration-gold border-2">
                <CardContent className="p-6 text-center">
                  <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category: {wordList[currentWord].category}</div>
                  <h2 className="text-4xl font-montserrat font-bold mb-6 tracking-widest text-celebration-purple">
                    {wordList[currentWord].scrambled}
                  </h2>
                  
                  {showHint && (
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-100 mb-6">
                      <p className="text-sm font-montserrat">
                        <span className="font-bold">Hint:</span> {wordList[currentWord].hint}
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-3">
                      <Input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="Your answer"
                        className="border-2 border-celebration-purple/30 focus:border-celebration-purple"
                        disabled={!gameActive}
                      />
                      <Button 
                        type="submit" 
                        className="bg-celebration-purple hover:bg-purple-600 text-white"
                        disabled={!gameActive}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div className="flex flex-wrap gap-3 justify-between">
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline" 
                  className="border-celebration-purple text-celebration-purple hover:bg-celebration-purple/10"
                >
                  Back to Celebration
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={revealHint}
                    variant="outline"
                    className="border-celebration-gold text-celebration-gold hover:bg-celebration-gold/10"
                    disabled={showHint || !gameActive}
                  >
                    Show Hint
                  </Button>
                  
                  <Button 
                    onClick={skipWord}
                    className="bg-celebration-pink hover:bg-pink-500 text-white"
                  >
                    Skip Word
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <PartyPopper className="text-celebration-gold h-16 w-16" />
              </div>
              
              <h2 className="text-2xl font-pacifico text-celebration-purple mb-4">
                Congratulations!
              </h2>
              
              <p className="text-lg font-montserrat mb-4">
                You completed the word scramble with a score of <span className="font-bold">{score}</span> out of <span className="font-bold">{wordList.length}</span>
              </p>
              
              <p className="mb-6 text-gray-600">
                {score === wordList.length ? 
                  "Perfect! You're a wordsmith extraordinaire!" :
                  score >= wordList.length / 2 ? 
                  "Great job! You have excellent word skills!" :
                  "Nice effort! With practice comes perfection."
                }
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={resetGame}
                  className="bg-celebration-purple hover:bg-purple-600 text-white"
                >
                  Play Again
                </Button>
                
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline" 
                  className="border-celebration-purple text-celebration-purple hover:bg-celebration-purple/10"
                >
                  Back to Celebration
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-white/20 backdrop-blur-sm py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-gray-800">
          <p className="font-montserrat">Made with 💖 for Justina by Your bro. Goodness</p>
          <p className="font-montserrat text-sm mt-1">Powered by GRIDVEM</p>
        </div>
      </footer>
    </div>
  );
};

export default WordScramble;
