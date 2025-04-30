
import { Award } from "lucide-react";
import { motion } from "framer-motion";

const DailyGoalCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-6 p-4 bg-gradient-to-r from-eduGreen/20 to-blue-500/10 backdrop-blur-sm rounded-lg border border-eduGreen/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Award className="text-eduGreen" size={20} />
        <h3 className="text-white font-medium">Objectif quotidien</h3>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-spotifyLightGray text-sm">Suivez au moins 2 cours aujourd'hui pour maintenir votre progression</p>
        <span className="text-sm bg-eduGreen/20 text-eduGreen px-2 py-1 rounded-full">1/2 complété</span>
      </div>
    </motion.div>
  );
};

export default DailyGoalCard;
