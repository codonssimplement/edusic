
import { useState } from "react";
import { Brain, Clock, Activity, Award } from "lucide-react";
import { Course } from "@/data/courseData";
import { Progress } from "@/components/ui/progress";

interface CourseInsightsProps {
  course: Course;
}

const CourseInsights = ({ course }: CourseInsightsProps) => {
  const [completionRate] = useState(75); // Simulation - would be based on user data
  const [retentionRate] = useState(85); // Simulation - would be based on quiz results
  
  return (
    <div className="w-full bg-spotifyGray bg-opacity-30 p-6 rounded-lg mb-8 shadow-lg border border-gray-800">
      <h3 className="text-lg text-white font-medium mb-4">Insights sur l'apprentissage</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-eduPurple/20 flex items-center justify-center">
              <Clock size={20} className="text-eduPurple" />
            </div>
            <div>
              <h4 className="text-white font-medium">Temps d'apprentissage</h4>
              <p className="text-spotifyLightGray text-sm">Optimisé pour une mémorisation maximale</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white text-sm">Progression</span>
              <span className="text-eduPurple font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-eduPurple/20 flex items-center justify-center">
              <Brain size={20} className="text-eduPurple" />
            </div>
            <div>
              <h4 className="text-white font-medium">Rétention estimée</h4>
              <p className="text-spotifyLightGray text-sm">Basée sur vos résultats de quiz</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white text-sm">Efficacité</span>
              <span className="text-eduPurple font-medium">{retentionRate}%</span>
            </div>
            <Progress value={retentionRate} className="h-2" />
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-black/20 rounded-lg p-4 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-eduPurple/20 flex items-center justify-center">
            <Activity size={20} className="text-eduPurple" />
          </div>
          <div>
            <h4 className="text-white font-medium">Difficulté perçue</h4>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div 
                  key={star} 
                  className={`w-4 h-4 rounded-full ${star <= 3 ? 'bg-eduPurple' : 'bg-white/20'}`}
                />
              ))}
              <span className="text-spotifyLightGray text-xs ml-2">Intermédiaire</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-black/20 rounded-lg p-4 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-eduPurple/20 flex items-center justify-center">
            <Award size={20} className="text-eduPurple" />
          </div>
          <div>
            <h4 className="text-white font-medium">Points clés à retenir</h4>
            <p className="text-spotifyLightGray text-sm mt-1">{course.notes.length} concepts principaux</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInsights;
