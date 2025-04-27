
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartHandshake } from 'lucide-react';
import Header from '@/components/Header';
import Confetti from '@/components/Confetti';
import { toast } from '@/components/ui/use-toast';

interface Question {
  question: string;
  options: string[];
  answer: number;
  tip: string;
}

const questions: Question[] = [
  {
    question: "What's the most important foundation for a successful marriage?",
    options: ["Financial stability", "Communication", "Similar interests", "Physical attraction"],
    answer: 1,
    tip: "Open and honest communication helps couples navigate challenges together."
  },
  {
    question: "How often should couples have a 'date night'?",
    options: ["Once a year", "Only on anniversaries", "At least once a month", "Never needed after marriage"],
    answer: 2,
    tip: "Regular date nights help maintain connection and romance in long-term relationships."
  },
  {
    question: "What's a good approach when disagreeing with your spouse?",
    options: ["Always let them win", "Express your feelings calmly", "Ignore the issue", "Bring up past mistakes"],
    answer: 1,
    tip: "Using 'I' statements and expressing feelings without blame helps resolve conflicts."
  },
  {
    question: "Which is NOT considered one of the '5 Love Languages'?",
    options: ["Acts of service", "Quality time", "Financial gifts", "Words of affirmation"],
    answer: 2,
    tip: "The five love languages are: words of affirmation, quality time, receiving gifts, acts of service, and physical touch."
  },
  {
    question: "What habit can strengthen your marriage daily?",
    options: ["Expressing gratitude", "Having separate routines", "Always agreeing", "Keeping score of favors"],
    answer: 0,
    tip: "Regularly expressing appreciation creates a positive atmosphere in your relationship."
  },
  {
    question: "What tradition can help couples build lasting memories?",
    options: ["Annual vacation", "Weekly shared hobby", "Monthly budget meetings", "All of the above"],
    answer: 3,
    tip: "Creating traditions together builds shared experiences and strengthens bonds."
  },
];

const LoveQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    if (optionIndex === questions[currentQuestion].answer) {
      toast({
        title: "Correct!",
        description: "That's the right answer!",
      });
      setScore(score + 1);
    } else {
      toast({
        title: "Not quite right",
        description: "Take a look at the tip!",
      });
    }
    
    setShowTip(true);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowTip(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowConfetti(true);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowTip(false);
    setShowResults(false);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-pink via-white to-celebration-purple">
      {showConfetti && <Confetti />}
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-pacifico text-celebration-purple mb-2">
              Justina's Love & Marriage Quiz
            </h1>
            <p className="text-lg font-montserrat text-gray-600">
              Test your knowledge about building a happy marriage!
            </p>
          </div>
          
          {!showResults ? (
            <div className="space-y-6">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-celebration-purple">Question {currentQuestion + 1}/{questions.length}</span>
                <span className="font-bold text-celebration-purple">Score: {score}</span>
              </div>
              
              <Card className="border-celebration-pink border-2">
                <CardContent className="p-6">
                  <h2 className="text-xl font-montserrat font-medium mb-6">{questions[currentQuestion].question}</h2>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full justify-start text-left p-4 h-auto ${
                          selectedOption === index 
                            ? index === questions[currentQuestion].answer
                              ? "bg-green-100 border-green-500" 
                              : "bg-red-100 border-red-500"
                            : "hover:bg-celebration-purple/10"
                        }`}
                        disabled={selectedOption !== null}
                        onClick={() => handleAnswer(index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  
                  {showTip && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                      <p className="text-sm font-montserrat">
                        <span className="font-bold">Tip:</span> {questions[currentQuestion].tip}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline" 
                  className="border-celebration-purple text-celebration-purple hover:bg-celebration-purple/10"
                >
                  Back to Celebration
                </Button>
                
                {selectedOption !== null && (
                  <Button 
                    onClick={nextQuestion}
                    className="bg-celebration-purple hover:bg-purple-600 text-white"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <HeartHandshake className="text-celebration-pink h-16 w-16" fill="#ffccd5" />
              </div>
              
              <h2 className="text-2xl font-pacifico text-celebration-purple mb-4">
                Quiz Complete!
              </h2>
              
              <p className="text-lg font-montserrat mb-4">
                You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span>
              </p>
              
              <p className="mb-6 text-gray-600">
                {score === questions.length ? 
                  "Perfect score! You're ready for a wonderful marriage journey!" :
                  score >= questions.length / 2 ? 
                  "Great job! You have good marriage knowledge!" :
                  "Keep learning! Every day is an opportunity to grow together."
                }
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={resetQuiz}
                  className="bg-celebration-purple hover:bg-purple-600 text-white"
                >
                  Take Quiz Again
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

export default LoveQuiz;
