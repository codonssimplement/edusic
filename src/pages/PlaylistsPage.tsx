
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Music, Play, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample playlist data (in a real app, this would come from a database)
const samplePlaylists = [
  {
    id: "1",
    title: "Révisions Bac Maths",
    description: "Tous les cours à revoir avant le bac",
    courseCount: 7,
    duration: "2h 15min",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600",
  },
  {
    id: "2",
    title: "Physique - Formules essentielles",
    description: "Les bases à connaître",
    courseCount: 5,
    duration: "1h 40min",
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600",
  },
  {
    id: "3",
    title: "Philosophie - La conscience",
    description: "Notions philosophiques sur la conscience",
    courseCount: 3,
    duration: "1h 05min",
    coverImage: "https://images.unsplash.com/photo-1544133782-b62779394064?q=80&w=600",
  },
];

const PlaylistsPage = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState(samplePlaylists);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Mes Playlists</h1>
        <Button 
          className="bg-eduGreen hover:bg-eduGreen/90 text-white"
          onClick={() => navigate("/playlists/create")}
        >
          <PlusCircle className="mr-2" size={18} />
          Créer une playlist
        </Button>
      </div>

      {playlists.length === 0 ? (
        <div className="text-center py-20 bg-spotifyGray bg-opacity-30 rounded-lg">
          <Music size={48} className="text-spotifyLightGray mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Aucune playlist</h2>
          <p className="text-spotifyLightGray mb-6">
            Créez votre première playlist pour organiser vos cours préférés
          </p>
          <Button
            className="bg-eduGreen hover:bg-eduGreen/90 text-white"
            onClick={() => navigate("/playlists/create")}
          >
            <PlusCircle className="mr-2" size={18} />
            Créer une playlist
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="bg-spotifyGray border-gray-800 overflow-hidden group hover:bg-gray-800 transition-colors">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <Button 
                  size="icon" 
                  className="absolute bottom-4 right-4 rounded-full w-12 h-12 bg-eduGreen hover:bg-eduGreen/90 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play size={24} className="ml-1" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-xl">{playlist.title}</CardTitle>
                <CardDescription className="text-spotifyLightGray">{playlist.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between text-spotifyLightGray text-sm">
                <div className="flex items-center">
                  <Music size={14} className="mr-1" />
                  <span>{playlist.courseCount} cours</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{playlist.duration}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-3 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-eduGreen text-eduGreen hover:bg-eduGreen/10"
                >
                  Modifier
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-spotifyLightGray hover:text-white"
                >
                  <MoreHorizontal size={20} />
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Create new playlist card */}
          <Card className="bg-black/30 border-gray-800 border-dashed h-full flex flex-col justify-center items-center p-8 hover:bg-black/50 transition-colors cursor-pointer"
            onClick={() => navigate("/playlists/create")}
          >
            <PlusCircle size={48} className="text-eduGreen mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">Créer une playlist</h3>
            <p className="text-spotifyLightGray text-center">
              Organisez vos cours préférés et créez des parcours d'apprentissage
            </p>
          </Card>
        </div>
      )}
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">Historique d'écoute</h2>
        <Card className="bg-spotifyGray border-gray-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-black/30 rounded-md transition-colors">
                  <div className="flex items-center">
                    <div className="text-spotifyLightGray mr-4">{i + 1}</div>
                    <img 
                      src={`https://source.unsplash.com/random/40x40?sig=${i}`} 
                      alt="Course" 
                      className="w-10 h-10 object-cover rounded-md mr-4"
                    />
                    <div>
                      <div className="text-white font-medium">
                        {["Les équations différentielles", "La Révolution Française", "La photosynthèse", "Les verbes irréguliers en anglais", "L'Union Européenne"][i]}
                      </div>
                      <div className="text-spotifyLightGray text-sm">
                        {["Mathématiques", "Histoire", "SVT", "Anglais", "Géopolitique"][i]} • 
                        Écouté {["aujourd'hui", "hier", "il y a 2 jours", "il y a 3 jours", "la semaine dernière"][i]}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-spotifyLightGray hover:text-white">
                    <Play size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-700 justify-center py-4">
            <Button variant="link" className="text-eduGreen">
              Voir tout l'historique
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PlaylistsPage;
