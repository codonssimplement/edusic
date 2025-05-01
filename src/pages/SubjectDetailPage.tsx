
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, PlayCircle, Clock, BookmarkPlus, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Subject data mapping for demo purpose
const subjectsData = {
  math: {
    name: "Mathématiques",
    description: "Apprendre les mathématiques en musique pour une mémorisation optimale",
    color: "bg-blue-700",
    levels: ["Collège", "Seconde", "Première", "Terminale"],
    courses: [
      {
        id: 1,
        title: "Fonctions du second degré",
        level: "Première",
        duration: "28 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Limites et continuité",
        level: "Terminale",
        duration: "34 min",
        image: "/placeholder.svg"
      },
      {
        id: 3,
        title: "Dérivation",
        level: "Terminale",
        duration: "26 min",
        image: "/placeholder.svg"
      },
      {
        id: 4,
        title: "Probabilités conditionnelles",
        level: "Terminale",
        duration: "31 min",
        image: "/placeholder.svg"
      },
      {
        id: 5,
        title: "Théorème de Pythagore",
        level: "Collège",
        duration: "22 min",
        image: "/placeholder.svg"
      },
      {
        id: 6,
        title: "Équations du premier degré",
        level: "Seconde",
        duration: "25 min",
        image: "/placeholder.svg"
      }
    ]
  },
  physics: {
    name: "Physique-Chimie",
    description: "Explorez les lois physiques et réactions chimiques en musique",
    color: "bg-purple-700",
    levels: ["Collège", "Seconde", "Première", "Terminale"],
    courses: [
      {
        id: 1,
        title: "Mécanique Newtonienne",
        level: "Terminale",
        duration: "33 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Réactions d'oxydo-réduction",
        level: "Première",
        duration: "29 min",
        image: "/placeholder.svg"
      },
      {
        id: 3,
        title: "Ondes et signaux",
        level: "Terminale",
        duration: "35 min",
        image: "/placeholder.svg"
      },
      {
        id: 4,
        title: "Structure de l'atome",
        level: "Seconde",
        duration: "24 min",
        image: "/placeholder.svg"
      }
    ]
  },
  french: {
    name: "Français",
    description: "Littérature, grammaire et analyses de textes en harmonie",
    color: "bg-red-700",
    levels: ["Collège", "Seconde", "Première"],
    courses: [
      {
        id: 1,
        title: "Figures de style",
        level: "Première",
        duration: "27 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Le roman au XIXe siècle",
        level: "Première",
        duration: "40 min",
        image: "/placeholder.svg"
      },
      {
        id: 3,
        title: "La poésie lyrique",
        level: "Première",
        duration: "31 min",
        image: "/placeholder.svg"
      }
    ]
  },
  history: {
    name: "Histoire-Géographie",
    description: "Voyagez à travers le temps et l'espace en musique",
    color: "bg-green-700",
    levels: ["Collège", "Seconde", "Première", "Terminale"],
    courses: [
      {
        id: 1,
        title: "La Seconde Guerre mondiale",
        level: "Terminale",
        duration: "45 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "La mondialisation",
        level: "Terminale",
        duration: "38 min",
        image: "/placeholder.svg"
      },
      {
        id: 3,
        title: "La Révolution française",
        level: "Première",
        duration: "42 min",
        image: "/placeholder.svg"
      }
    ]
  },
  english: {
    name: "Anglais",
    description: "Learn English with music and rhythm",
    color: "bg-indigo-700",
    levels: ["Collège", "Seconde", "Première", "Terminale"],
    courses: [
      {
        id: 1, 
        title: "Irregular Verbs in Songs",
        level: "Seconde",
        duration: "26 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Advanced Vocabulary",
        level: "Terminale",
        duration: "30 min",
        image: "/placeholder.svg"
      }
    ]
  },
  spanish: {
    name: "Espagnol", 
    description: "Aprender español con ritmos latinos",
    color: "bg-yellow-600",
    levels: ["Collège", "Seconde", "Première", "Terminale"],
    courses: [
      {
        id: 1,
        title: "Conjugaison des verbes",
        level: "Seconde",
        duration: "28 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Vocabulaire de base",
        level: "Collège",
        duration: "22 min",
        image: "/placeholder.svg"
      }
    ]
  },
  biology: {
    name: "SVT",
    description: "La biologie et la géologie en symphonie",
    color: "bg-teal-700",
    levels: ["Collège", "Seconde", "Première", "Terminale"],
    courses: [
      {
        id: 1,
        title: "ADN et division cellulaire",
        level: "Première",
        duration: "32 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "L'évolution",
        level: "Terminale",
        duration: "36 min",
        image: "/placeholder.svg"
      }
    ]
  },
  philosophy: {
    name: "Philosophie",
    description: "Les grands concepts philosophiques en harmonie",
    color: "bg-gray-700",
    levels: ["Terminale"],
    courses: [
      {
        id: 1,
        title: "La conscience",
        level: "Terminale",
        duration: "40 min",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "La liberté",
        level: "Terminale",
        duration: "38 min",
        image: "/placeholder.svg"
      }
    ]
  }
};

const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const [activeLevel, setActiveLevel] = useState("all");
  const { toast } = useToast();
  
  const subject = subjectsData[subjectId as keyof typeof subjectsData];
  
  useEffect(() => {
    if (!subject) {
      console.error(`Subject with ID ${subjectId} not found`);
    }
  }, [subject, subjectId]);
  
  if (!subject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Matière non trouvée</h2>
        <p className="text-spotifyLightGray mb-6">La matière que vous recherchez n'existe pas.</p>
        <Link to="/subjects">
          <Button variant="outline" className="bg-eduPurple text-black hover:bg-eduPurple/80">
            Retour aux matières
          </Button>
        </Link>
      </div>
    );
  }
  
  const filteredCourses = activeLevel === "all" 
    ? subject.courses 
    : subject.courses.filter(course => course.level === activeLevel);
    
  const addToPlaylist = (courseId: number) => {
    toast({
      title: "Ajouté à votre playlist",
      description: "Le cours a été ajouté à votre playlist.",
    });
  };

  return (
    <div>
      <div className={`${subject.color} px-6 py-10 rounded-lg mb-8`}>
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen /> {subject.name}
        </h1>
        <p className="text-white/90 text-lg">{subject.description}</p>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeLevel === "all" ? "default" : "outline"}
            className={`${activeLevel === "all" ? "bg-eduPurple text-black" : "bg-spotifyGray text-white"}`}
            onClick={() => setActiveLevel("all")}
          >
            Tous les niveaux
          </Button>
          {subject.levels.map(level => (
            <Button 
              key={level}
              variant={activeLevel === level ? "default" : "outline"}
              className={`${activeLevel === level ? "bg-eduPurple text-black" : "bg-spotifyGray text-white"}`}
              onClick={() => setActiveLevel(level)}
            >
              {level}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-spotifyGray rounded-lg overflow-hidden shadow-md music-card">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Link to={`/player/${course.id}`}>
                    <Button className="rounded-full w-12 h-12 p-0 bg-eduPurple text-black hover:bg-eduPurple/90 hover:scale-110 transition-transform">
                      <PlayCircle size={24} />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{course.title}</h3>
                    <p className="text-spotifyLightGray text-sm">{course.level}</p>
                  </div>
                  <button 
                    className="text-spotifyLightGray hover:text-eduPurple p-1"
                    onClick={() => addToPlaylist(course.id)}
                  >
                    <BookmarkPlus size={18} />
                  </button>
                </div>
                <div className="flex items-center mt-2 text-spotifyLightGray text-xs">
                  <Clock size={14} className="mr-1" />
                  <span>{course.duration}</span>
                  <Music size={14} className="ml-3 mr-1" />
                  <span>Cours musical</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
