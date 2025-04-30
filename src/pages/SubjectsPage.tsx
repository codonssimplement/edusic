import { BookOpen, Music, ChevronRight, BookCheck, LayoutGrid, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PageTransition from "@/components/shared/PageTransition";
import { motion } from "framer-motion";

const subjects = [
  {
    id: "math",
    name: "Mathématiques",
    description: "Algèbre, géométrie, fonctions et probabilités en musique",
    color: "from-blue-800 to-blue-600",
    image: "/placeholder.svg"
  },
  {
    id: "physics",
    name: "Physique-Chimie",
    description: "Forces, électricité, réactions chimiques en mélodies",
    color: "from-purple-800 to-violet-600",
    image: "/placeholder.svg"
  },
  {
    id: "french",
    name: "Français",
    description: "Littérature, grammaire et analyses de textes en harmonie",
    color: "from-red-800 to-orange-600",
    image: "/placeholder.svg"
  },
  {
    id: "history",
    name: "Histoire-Géographie",
    description: "Périodes historiques et concepts géographiques en chansons",
    color: "from-green-800 to-emerald-600",
    image: "/placeholder.svg"
  },
  {
    id: "english",
    name: "Anglais",
    description: "Vocabulaire, grammaire et culture anglophone en musique",
    color: "from-indigo-800 to-blue-500",
    image: "/placeholder.svg"
  },
  {
    id: "spanish",
    name: "Espagnol",
    description: "Apprentissage de l'espagnol avec des rythmes latins",
    color: "from-yellow-700 to-amber-500",
    image: "/placeholder.svg"
  },
  {
    id: "biology",
    name: "SVT",
    description: "Sciences de la vie et de la Terre en symphonie naturelle",
    color: "from-teal-800 to-green-500",
    image: "/placeholder.svg"
  },
  {
    id: "philosophy",
    name: "Philosophie",
    description: "Concepts philosophiques et grands penseurs en musique",
    color: "from-gray-800 to-slate-600",
    image: "/placeholder.svg"
  }
];

const SubjectsPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const levels = ["all", "Collège", "Seconde", "Première", "Terminale"];
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0 flex items-center gap-3">
            <BookOpen className="text-eduGreen" /> Matières
          </h1>
          
          <div className="flex flex-wrap gap-3">
            <div className="bg-black/30 rounded-lg border border-white/10 p-1 flex">
              <button 
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-eduGreen/20 text-eduGreen' : 'text-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-eduGreen/20 text-eduGreen' : 'text-white'}`}
                onClick={() => setViewMode('list')}
              >
                <BookCheck size={18} />
              </button>
            </div>
            
            <div className="bg-black/30 rounded-lg border border-white/10 p-1 flex items-center">
              <Filter size={16} className="text-spotifyLightGray ml-2 mr-1" />
              {levels.map(level => (
                <button 
                  key={level} 
                  className={`px-3 py-1 text-sm rounded ${selectedLevel === level ? 'bg-eduGreen text-black font-medium' : 'text-white'}`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level === "all" ? "Tous" : level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}
        >
          {subjects.map((subject) => (
            viewMode === 'grid' ? (
              <motion.div 
                key={subject.id} 
                variants={itemAnimation}
                className={`bg-gradient-to-br ${subject.color} rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <Link to={`/subjects/${subject.id}`} className="block p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">{subject.name}</h2>
                      <p className="text-white/80 text-sm mb-4">{subject.description}</p>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 hover:border-white/50">
                        Explorer <ChevronRight size={16} />
                      </Button>
                    </div>
                    <div className="text-white/30">
                      <Music size={40} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                key={subject.id} 
                variants={itemAnimation}
                className="flex items-center gap-4 bg-black/20 rounded-lg p-4 border border-white/10 hover:bg-black/30 hover:border-eduGreen/30 transition-all"
              >
                <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center`}>
                  <Music className="text-white" size={20} />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-white">{subject.name}</h2>
                  <p className="text-spotifyLightGray text-sm">{subject.description}</p>
                </div>
                <Link to={`/subjects/${subject.id}`}>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </motion.div>
            )
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default SubjectsPage;
