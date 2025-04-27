
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-celebration-pink to-celebration-purple">
      <div className="text-center bg-white/90 backdrop-blur-sm p-10 rounded-xl shadow-xl max-w-md">
        <h1 className="text-4xl font-pacifico text-celebration-purple mb-4">Oops!</h1>
        <p className="text-xl font-montserrat text-gray-800 mb-6">
          This page seems to have gone on honeymoon!
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-celebration-purple hover:bg-purple-600 text-white font-medium"
        >
          Back to Celebration
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
