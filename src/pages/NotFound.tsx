
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Search, Music, ArrowLeft, BookOpen, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-spotifyGray p-6 pt-16 md:pt-0">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Music size={70} className="text-eduPurple" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
              404
            </div>
          </div>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Page introuvable</h1>
        <p className="text-xl text-white mb-8">Cette page n'existe pas dans notre répertoire musical éducatif</p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button variant="default" className="w-full bg-eduPurple text-black hover:bg-eduPurple/90 flex items-center justify-center gap-2 py-6">
              <Home size={18} />
              Retour à l'accueil
            </Button>
          </Link>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <Button variant="outline" className="w-full border-gray-700 text-eduPurple/50 hover:bg-white/10" onClick={() => window.history.back()}>
              <ArrowLeft size={18} className="mr-2" />
              Page précédente
            </Button>
            
            <Link to="/search" className="w-full">
              <Button variant="outline" className="w-full border-gray-700 text-eduPurple/50 hover:bg-white/10">
                <Search size={18} className="mr-2" />
                Rechercher
              </Button>
            </Link>
            
            <Link to="/subjects" className="w-full">
              <Button variant="outline" className="w-full border-gray-700 text-eduPurple/50 hover:bg-white/10">
                <BookOpen size={18} className="mr-2" />
                Explorer
              </Button>
            </Link>
            
            <Link to="/new-releases" className="w-full">
              <Button variant="outline" className="w-full border-gray-700 text-eduPurple/50 hover:bg-white/10">
                <Headphones size={18} className="mr-2" />
                Nouveautés
              </Button>
            </Link>
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-spotifyLightGray text-sm"
        >
          Vous recherchez peut-être un cours qui a été déplacé ou supprimé. 
          N'hésitez pas à parcourir notre catalogue pour trouver d'autres contenus similaires.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
