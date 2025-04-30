
import { Users, BookOpen, Headphones, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const StatsBar = () => {
  return (
    <div className="w-full bg-black/30 backdrop-blur-sm border-y border-white/5 py-6 my-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <Users className="text-eduGreen mb-2" size={24} />
            <span className="text-2xl font-bold text-white">50 000+</span>
            <span className="text-spotifyLightGray text-sm">Élèves</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <BookOpen className="text-eduGreen mb-2" size={24} />
            <span className="text-2xl font-bold text-white">500+</span>
            <span className="text-spotifyLightGray text-sm">Cours en musique</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <Headphones className="text-eduGreen mb-2" size={24} />
            <span className="text-2xl font-bold text-white">8 000+</span>
            <span className="text-spotifyLightGray text-sm">Heures d'écoute</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <TrendingUp className="text-eduGreen mb-2" size={24} />
            <span className="text-2xl font-bold text-white">+40%</span>
            <span className="text-spotifyLightGray text-sm">Amélioration moyenne</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
