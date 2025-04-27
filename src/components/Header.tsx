
import React from 'react';
import { PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onPlayGame?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPlayGame }) => {
  const navigate = useNavigate();

  return (
    <header className="py-4 px-5 flex justify-between items-center bg-gradient-to-r from-celebration-pink to-celebration-purple">
      <div className="flex items-center space-x-2">
        <PartyPopper className="text-celebration-gold h-6 w-6" />
        <h1 className="text-xl md:text-2xl font-pacifico text-white">Justina's Celebration</h1>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
        <Button 
          variant="outline" 
          className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
          onClick={onPlayGame || (() => navigate('/game'))}
        >
          Play Game
        </Button>
      </div>
    </header>
  );
};

export default Header;
