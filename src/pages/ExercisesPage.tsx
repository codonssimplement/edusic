
import { useState } from "react";
import { Book, Clock, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const subjectExercises = {
  "mathématiques": [
    { id: "math-1", title: "Dérivées et primitives", level: "Terminale", difficulty: "Moyen", timeEstimate: "15 min", questionsCount: 10 },
    { id: "math-2", title: "Suites numériques", level: "Première", difficulty: "Facile", timeEstimate: "10 min", questionsCount: 8 },
    { id: "math-3", title: "Géométrie dans l'espace", level: "Terminale", difficulty: "Difficile", timeEstimate: "20 min", questionsCount: 12 },
  ],
  "physique": [
    { id: "phys-1", title: "Forces et mouvement", level: "Première", difficulty: "Moyen", timeEstimate: "15 min", questionsCount: 10 },
    { id: "phys-2", title: "Électricité - circuits", level: "Terminale", difficulty: "Moyen", timeEstimate: "12 min", questionsCount: 8 },
    { id: "phys-3", title: "Ondes et signaux", level: "Terminale", difficulty: "Difficile", timeEstimate: "18 min", questionsCount: 10 },
  ],
  "histoire": [
    { id: "hist-1", title: "La Seconde Guerre mondiale", level: "Terminale", difficulty: "Moyen", timeEstimate: "15 min", questionsCount: 10 },
    { id: "hist-2", title: "La Guerre froide", level: "Terminale", difficulty: "Facile", timeEstimate: "10 min", questionsCount: 8 },
    { id: "hist-3", title: "La Révolution française", level: "Première", difficulty: "Moyen", timeEstimate: "15 min", questionsCount: 10 },
  ],
  "français": [
    { id: "fr-1", title: "Figures de style", level: "Première", difficulty: "Facile", timeEstimate: "10 min", questionsCount: 8 },
    { id: "fr-2", title: "Analyse de textes littéraires", level: "Terminale", difficulty: "Difficile", timeEstimate: "20 min", questionsCount: 12 },
    { id: "fr-3", title: "Conjugaison", level: "Seconde", difficulty: "Facile", timeEstimate: "8 min", questionsCount: 10 },
  ],
};

type DifficultyBadgeProps = {
  difficulty: string;
};

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  let color;
  switch (difficulty.toLowerCase()) {
    case "facile":
      color = "bg-eduPurple/20 text-eduPurple";
      break;
    case "moyen":
      color = "bg-amber-500/20 text-amber-400";
      break;
    case "difficile":
      color = "bg-red-500/20 text-red-400";
      break;
    default:
      color = "bg-gray-500/20 text-gray-400";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {difficulty}
    </span>
  );
};

const ExercisesPage = () => {
  const [activeTab, setActiveTab] = useState("mathématiques");
  const navigate = useNavigate();

  const handleExerciseClick = (exerciseId: string) => {
    navigate(`/exercises/${exerciseId}`);
  };

  return (
    <div className="pt-16 md:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 sm:mb-0 flex items-center gap-3">
          <Book className="text-eduPurple" /> Exercices
        </h1>
        
        <div className="flex items-center text-spotifyLightGray text-sm">
          <span className="flex items-center gap-1 mr-4">
            <Clock size={16} />
            <span>Dernière session: il y a 2 jours</span>
          </span>
          <span className="flex items-center gap-1">
            <Award size={16} />
            <span>Score moyen: 75%</span>
          </span>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-spotifyGray grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="mathématiques">Mathématiques</TabsTrigger>
          <TabsTrigger value="physique">Physique</TabsTrigger>
          <TabsTrigger value="histoire">Histoire</TabsTrigger>
          <TabsTrigger value="français">Français</TabsTrigger>
        </TabsList>

        {Object.keys(subjectExercises).map((subject) => (
          <TabsContent key={subject} value={subject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectExercises[subject as keyof typeof subjectExercises].map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className="bg-spotifyGray border-spotifyLightGray/20 hover:border-eduPurple/50 hover:bg-spotifyGray/70 transition-all cursor-pointer"
                  onClick={() => handleExerciseClick(exercise.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg">{exercise.title}</CardTitle>
                      <DifficultyBadge difficulty={exercise.difficulty} />
                    </div>
                    <p className="text-spotifyLightGray text-sm">
                      {exercise.level}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-spotifyLightGray text-sm space-x-4">
                        <span className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {exercise.timeEstimate}
                        </span>
                        <span>{exercise.questionsCount} questions</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-eduPurple p-0 hover:bg-transparent hover:text-eduPurple/80">
                        <ChevronRight size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExercisesPage;
