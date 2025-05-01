
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Music, Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const CreatePlaylistPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  
  // Sample available courses
  const availableCourses = [
    { id: 1, title: "Les équations du second degré", subject: "Mathématiques", level: "Terminale", image: "/placeholder.svg" },
    { id: 2, title: "La Révolution Française", subject: "Histoire", level: "Seconde", image: "/placeholder.svg" },
    { id: 3, title: "Le champ magnétique", subject: "Physique", level: "Première", image: "/placeholder.svg" },
    { id: 4, title: "La photosynthèse", subject: "SVT", level: "Première", image: "/placeholder.svg" },
    { id: 5, title: "L'accord du participe passé", subject: "Français", level: "Collège", image: "/placeholder.svg" },
    { id: 6, title: "Les fonctions dérivées", subject: "Mathématiques", level: "Première", image: "/placeholder.svg" },
    { id: 7, title: "Vocabulaire espagnol", subject: "Espagnol", level: "Seconde", image: "/placeholder.svg" },
    { id: 8, title: "Pythagore et son théorème", subject: "Mathématiques", level: "Troisième", image: "/placeholder.svg" },
  ];

  const filteredCourses = availableCourses.filter(course => 
    !selectedCourses.some(selected => selected.id === course.id) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddCourse = (course: any) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemoveCourse = (courseId: number) => {
    setSelectedCourses(selectedCourses.filter(course => course.id !== courseId));
  };

  const handleCreatePlaylist = () => {
    if (!title) {
      toast({
        title: "Erreur",
        description: "Veuillez donner un titre à votre playlist",
        variant: "destructive"
      });
      return;
    }

    if (selectedCourses.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins un cours à votre playlist",
        variant: "destructive"
      });
      return;
    }

    // Here you would save the playlist to your database
    toast({
      title: "Playlist créée!",
      description: `Votre playlist "${title}" a été créée avec ${selectedCourses.length} cours.`
    });
    
    navigate("/playlists");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold text-white mb-6">Créer une nouvelle playlist</h1>
        
        <div className="bg-spotifyGray bg-opacity-30 p-6 rounded-lg mb-8">
          <div className="mb-6">
            <Label htmlFor="title" className="text-white block mb-2">Titre de la playlist</Label>
            <Input
              id="title"
              placeholder="Ma playlist de révision"
              className="bg-spotifyGray border-gray-700 focus:border-eduPurple text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <Label htmlFor="description" className="text-white block mb-2">Description (optionnelle)</Label>
            <Textarea
              id="description"
              placeholder="Une description de votre playlist..."
              className="bg-spotifyGray border-gray-700 focus:border-eduPurple text-white min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <Button 
              className="bg-eduPurple hover:bg-eduPurple/90 text-white"
              onClick={handleCreatePlaylist}
            >
              <Save className="mr-2" size={18} />
              Créer la playlist
            </Button>
            <span className="text-spotifyLightGray ml-4">
              {selectedCourses.length} cours sélectionnés
            </span>
          </div>
        </div>
        
        <div className="bg-spotifyGray bg-opacity-30 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Cours sélectionnés</h2>
          
          {selectedCourses.length === 0 ? (
            <div className="text-center py-6">
              <Music size={32} className="text-spotifyLightGray mx-auto mb-2" />
              <p className="text-spotifyLightGray">
                Aucun cours sélectionné. Cherchez et ajoutez des cours à droite.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-3 rounded-md bg-black bg-opacity-30">
                  <div className="flex items-center">
                    <div className="text-spotifyLightGray mr-3">{index + 1}</div>
                    <Avatar className="mr-3 h-10 w-10">
                      <AvatarImage src={course.image} alt={course.title} />
                      <AvatarFallback className="bg-spotifyGray text-white">
                        {course.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-medium">{course.title}</p>
                      <p className="text-spotifyLightGray text-xs">{course.subject} • {course.level}</p>
                    </div>
                  </div>
                  <button 
                    className="text-spotifyLightGray hover:text-white p-1"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="md:w-1/2">
        <div className="sticky top-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
              <Input
                placeholder="Rechercher des cours à ajouter..."
                className="pl-10 bg-spotifyGray border-gray-700 focus:border-eduPurple text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="bg-spotifyGray bg-opacity-30 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Tous les cours</h2>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-6">
                <Search size={32} className="text-spotifyLightGray mx-auto mb-2" />
                <p className="text-spotifyLightGray">
                  Aucun cours trouvé pour "{searchTerm}".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCourses.map(course => (
                  <div 
                    key={course.id}
                    className="bg-black bg-opacity-30 rounded-md p-3 hover:bg-opacity-50 transition-colors cursor-pointer"
                    onClick={() => handleAddCourse(course)}
                  >
                    <div className="flex">
                      <Avatar className="mr-3 h-12 w-12">
                        <AvatarImage src={course.image} alt={course.title} />
                        <AvatarFallback className="bg-spotifyGray text-white">
                          {course.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{course.title}</p>
                        <p className="text-spotifyLightGray text-xs truncate">{course.subject} • {course.level}</p>
                        <button 
                          className="mt-1 text-xs flex items-center text-eduPurple hover:text-eduPurple/80"
                        >
                          <Plus size={14} className="mr-1" />
                          Ajouter à la playlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
