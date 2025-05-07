
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Music, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  // All available subjects with courses
  const subjects = [
    { 
      id: "math", 
      name: "Mathématiques", 
      color: "from-purple-700 to-blue-500",
      levels: ["Troisième", "Seconde", "Première", "Terminale"],
      courses: [
        { id: 1, title: "Les équations du second degré", level: "Terminale", duration: "12:30", image: "/placeholder.svg" },
        { id: 2, title: "Les fonctions dérivées", level: "Première", duration: "15:45", image: "/placeholder.svg" },
        { id: 3, title: "Probabilités et statistiques", level: "Terminale", duration: "18:20", image: "/placeholder.svg" },
        { id: 4, title: "Les nombres complexes", level: "Terminale", duration: "14:10", image: "/placeholder.svg" },
        { id: 5, title: "Les suites", level: "Première", duration: "16:30", image: "/placeholder.svg" },
        { id: 6, title: "Géométrie dans l'espace", level: "Seconde", duration: "13:45", image: "/placeholder.svg" },
        { id: 7, title: "Théorème de Pythagore", level: "Troisième", duration: "10:15", image: "/placeholder.svg" },
        { id: 8, title: "Théorème de Thalès", level: "Troisième", duration: "11:20", image: "/placeholder.svg" },
      ]
    },
    { 
      id: "physics", 
      name: "Physique-Chimie", 
      color: "from-red-600 to-orange-500",
      levels: ["Seconde", "Première", "Terminale"],
      courses: [
        { id: 1, title: "Le champ magnétique", level: "Première", duration: "14:50", image: "/placeholder.svg" },
        { id: 2, title: "La relativité restreinte", level: "Terminale", duration: "20:15", image: "/placeholder.svg" },
        { id: 3, title: "La mécanique newtonienne", level: "Première", duration: "16:40", image: "/placeholder.svg" },
        { id: 4, title: "Les lois de la thermodynamique", level: "Terminale", duration: "19:25", image: "/placeholder.svg" },
        { id: 5, title: "La structure de l'atome", level: "Seconde", duration: "12:10", image: "/placeholder.svg" },
        { id: 6, title: "Les réactions d'oxydo-réduction", level: "Terminale", duration: "17:30", image: "/placeholder.svg" },
      ]
    },
    { 
      id: "french", 
      name: "Français", 
      color: "from-green-600 to-teal-500",
      levels: ["Collège", "Lycée"],
      courses: [
        { id: 1, title: "L'accord du participe passé", level: "Collège", duration: "9:45", image: "/placeholder.svg" },
        { id: 2, title: "Les figures de style", level: "Lycée", duration: "14:20", image: "/placeholder.svg" },
        { id: 3, title: "La dissertation littéraire", level: "Lycée", duration: "18:30", image: "/placeholder.svg" },
        { id: 4, title: "Le roman au XIXe siècle", level: "Lycée", duration: "22:15", image: "/placeholder.svg" },
        { id: 5, title: "La poésie lyrique", level: "Collège", duration: "13:10", image: "/placeholder.svg" },
      ]
    },
    { 
      id: "history", 
      name: "Histoire-Géo", 
      color: "from-blue-600 to-indigo-500",
      levels: ["Seconde", "Première", "Terminale"],
      courses: [
        { id: 1, title: "La Révolution Française", level: "Seconde", duration: "17:30", image: "/placeholder.svg" },
        { id: 2, title: "La Seconde Guerre mondiale", level: "Terminale", duration: "23:45", image: "/placeholder.svg" },
        { id: 3, title: "La guerre froide", level: "Terminale", duration: "19:20", image: "/placeholder.svg" },
        { id: 4, title: "La décolonisation", level: "Première", duration: "16:15", image: "/placeholder.svg" },
        { id: 5, title: "La mondialisation", level: "Terminale", duration: "18:30", image: "/placeholder.svg" },
      ]
    },
    { 
      id: "english", 
      name: "Anglais", 
      color: "from-yellow-500 to-amber-500",
      levels: ["Collège", "Lycée"],
      courses: [
        { id: 1, title: "Present perfect vs. past simple", level: "Lycée", duration: "14:20", image: "/placeholder.svg" },
        { id: 2, title: "Modal verbs", level: "Collège", duration: "11:30", image: "/placeholder.svg" },
        { id: 3, title: "Phrasal verbs", level: "Lycée", duration: "13:45", image: "/placeholder.svg" },
        { id: 4, title: "Business English vocabulary", level: "Lycée", duration: "15:10", image: "/placeholder.svg" },
      ]
    },
  ];

  // Filter courses based on search term and selected level
  const filteredSubjects = subjects.map(subject => {
    const filteredCourses = subject.courses.filter(course => {
      const matchesSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
    
    return {
      ...subject,
      courses: filteredCourses
    };
  }).filter(subject => subject.courses.length > 0);

  // Get all unique levels from all subjects
  const allLevels = Array.from(new Set(subjects.flatMap(subject => subject.levels)));

  return (
    <div className="pt-16 md:pt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-eduPurple" /> Catalogue des Matières
        </h1>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
            <Input
              placeholder="Rechercher des cours..."
              className="pl-10 bg-spotifyGray border-gray-700 focus:border-eduPurple text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 hover:bg-eduPurple cursor-pointer text-eduPurple">
                <Filter size={18} className="mr-2 " />
                {selectedLevel || "Niveau"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-spotifyGray border-gray-700 text-white">
              <DropdownMenuLabel>Filtrer par niveau</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-eduPurple" />
              <DropdownMenuItem 
                className="hover:bg-eduPurple cursor-pointer"
                onClick={() => setSelectedLevel(null)}
              >
                Tous les niveaux
              </DropdownMenuItem>
              {allLevels.map(level => (
                <DropdownMenuItem 
                  key={level}
                  className="hover:bg-eduPurple cursor-pointer"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {filteredSubjects.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={48} className="text-spotifyLightGray mx-auto mb-4" />
          <h3 className="text-white text-xl font-medium mb-2">Aucun cours trouvé</h3>
          <p className="text-spotifyLightGray">
            Aucun cours ne correspond à votre recherche.
          </p>
          <Button 
            className="mt-4 text-white bg-eduPurple hover:bg-eduPurple/90"
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedLevel(null);
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <Accordion type="multiple" className="space-y-6">
          {filteredSubjects.map((subject) => (
            <AccordionItem 
              key={subject.id} 
              value={subject.id}
              className="border-none"
            >
              <AccordionTrigger className={`bg-gradient-to-r ${subject.color} p-4 rounded-lg text-white hover:no-underline`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-md flex items-center justify-center">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">{subject.name}</h2>
                  <span className="text-sm text-white/80 ml-2">
                    {subject.courses.length} cours
                  </span>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="pt-4 pb-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subject.courses.map((course) => (
                    <Link 
                      key={course.id} 
                      to={`/player/${course.id}`}
                      className="group"
                    >
                      <div className="music-card bg-spotifyGray rounded-md overflow-hidden hover:bg-opacity-70 transition-all">
                        <div className="relative">
                          <div className="aspect-square bg-gray-800">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-eduPurple rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                              <Music className="text-white" size={20} />
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-white font-medium line-clamp-2">{course.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-spotifyLightGray">{course.level}</span>
                            <span className="text-xs text-spotifyLightGray">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default CatalogPage;
