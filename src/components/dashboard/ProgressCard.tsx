
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { Book, CheckCircle, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const ProgressCard = () => {
  // Ces données seraient normalement récupérées depuis l'API
  const progress = {
    coursesCompleted: 8,
    totalCourses: 15,
    lastActivity: "Les fonctions dérivées",
    streakDays: 5
  };
  const isMobile = useIsMobile();
  const percentComplete = Math.round((progress.coursesCompleted / progress.totalCourses) * 100);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-spotifyGray border-none shadow-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eduGreen to-teal-400"></div>
        <CardHeader className={`${isMobile ? 'p-3 pb-1' : 'pb-2'}`}>
          <CardTitle className={`text-white ${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-2`}>
            <Award className="text-eduGreen" size={isMobile ? 16 : 20} />
            Ma progression
          </CardTitle>
          <CardDescription className="text-spotifyLightGray">
            {progress.streakDays} jours consécutifs d'apprentissage
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? 'p-3' : ''}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className={`flex items-center mb-2 text-white ${isMobile ? 'text-xs' : ''}`}>
                <Book className="mr-2 text-eduGreen" size={isMobile ? 14 : 18} />
                <span>{progress.coursesCompleted} cours terminés</span>
              </div>
              <div className={`flex items-center text-white ${isMobile ? 'text-xs' : ''}`}>
                <CheckCircle className="mr-2 text-eduGreen" size={isMobile ? 14 : 18} />
                <span className="line-clamp-1">Dernier cours: {progress.lastActivity}</span>
              </div>
            </div>
            <div className={`flex items-center justify-center ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}>
              <CircularProgress value={percentComplete} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProgressCard;
