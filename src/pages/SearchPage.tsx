
import { useState } from "react";
import { Search, BookOpen, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const subjects = [
    { id: "math", name: "Mathématiques", color: "from-purple-700 to-blue-500" },
    { id: "physics", name: "Physique-Chimie", color: "from-red-600 to-orange-500" },
    { id: "french", name: "Français", color: "from-green-600 to-teal-500" },
    { id: "history", name: "Histoire-Géo", color: "from-blue-600 to-indigo-500" },
    { id: "biology", name: "SVT", color: "from-yellow-600 to-amber-500" },
    { id: "english", name: "Anglais", color: "from-pink-600 to-rose-500" },
    { id: "spanish", name: "Espagnol", color: "from-cyan-600 to-sky-500" },
    { id: "philosophy", name: "Philosophie", color: "from-violet-600 to-purple-500" },
  ];

  const searchResults = {
    courses: [
      { id: 1, title: "Les équations du second degré", subject: "Mathématiques", level: "Terminale", image: "/placeholder.svg" },
      { id: 2, title: "La Révolution Française", subject: "Histoire", level: "Seconde", image: "/placeholder.svg" },
    ],
    playlists: [
      { id: 1, title: "Révisions Bac Français", description: "Les œuvres essentielles", image: "/placeholder.svg" },
      { id: 2, title: "Spécialité Maths Terminale", description: "Programme complet", image: "/placeholder.svg" },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Recherche</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={20} />
          <Input
            type="text"
            placeholder="Chercher un cours, une matière, un niveau..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-spotifyGray border-spotifyGray focus:border-eduGreen text-white"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Parcourir par matière</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <div 
              key={subject.id} 
              className={`card-hover flex items-center gap-3 bg-gradient-to-r ${subject.color} h-20 rounded-lg cursor-pointer`}
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-md flex items-center justify-center ml-3">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-white font-medium">{subject.name}</span>
            </div>
          ))}
        </div>
      </div>

      {searchQuery && (
        <div className="mt-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-spotifyGray mb-6">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-spotifyGreen">Tous</TabsTrigger>
              <TabsTrigger value="courses" className="text-white data-[state=active]:bg-spotifyGreen">Cours</TabsTrigger>
              <TabsTrigger value="playlists" className="text-white data-[state=active]:bg-spotifyGreen">Playlists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">Cours</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {searchResults.courses.map((course) => (
                      <div key={course.id} className="music-card group cursor-pointer">
                        <div className="relative mb-4 aspect-square bg-spotifyGray rounded-md overflow-hidden">
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-eduGreen rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                              <Music className="text-white" size={20} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-white font-medium truncate">{course.title}</h3>
                        <p className="text-sm text-spotifyLightGray truncate">{course.subject} - {course.level}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {searchResults.playlists.map((playlist) => (
                      <div key={playlist.id} className="music-card group cursor-pointer">
                        <div className="relative mb-4 aspect-square bg-spotifyGray rounded-md overflow-hidden">
                          <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-eduGreen rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                              <Music className="text-white" size={20} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-white font-medium truncate">{playlist.title}</h3>
                        <p className="text-sm text-spotifyLightGray truncate">{playlist.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <h2 className="text-xl font-bold text-white mb-4">Cours</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {searchResults.courses.map((course) => (
                  <div key={course.id} className="music-card group cursor-pointer">
                    <div className="relative mb-4 aspect-square bg-spotifyGray rounded-md overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-eduGreen rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Music className="text-white" size={20} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-white font-medium truncate">{course.title}</h3>
                    <p className="text-sm text-spotifyLightGray truncate">{course.subject} - {course.level}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="playlists">
              <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {searchResults.playlists.map((playlist) => (
                  <div key={playlist.id} className="music-card group cursor-pointer">
                    <div className="relative mb-4 aspect-square bg-spotifyGray rounded-md overflow-hidden">
                      <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-eduGreen rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Music className="text-white" size={20} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-white font-medium truncate">{playlist.title}</h3>
                    <p className="text-sm text-spotifyLightGray truncate">{playlist.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
