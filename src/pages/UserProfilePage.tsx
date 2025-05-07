
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { User, Clock, Award, Trophy, Bell, Moon, LogOut, Settings, Edit, Check } from "lucide-react";

const UserProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Sample user data - in a real application this would come from a database or context
  const [userData, setUserData] = useState({
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@example.com",
    age: 17,
    schoolLevel: "Terminale",
    school: "Lycée Victor Hugo",
    city: "Paris",
    subjects: ["Mathématiques", "Physique", "SVT", "Histoire"],
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été enregistrées.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
    // In a real app, this would clear the authentication state
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `Thème ${!darkMode ? "sombre" : "clair"} activé`,
      description: `L'application est maintenant en mode ${!darkMode ? "sombre" : "clair"}.`,
    });
  };

  // Sample badges data
  const badges = [
    { id: 1, name: "Premier pas", description: "A terminé son premier cours", icon: Award, date: "12/04/2023" },
    { id: 2, name: "Studieux", description: "A suivi 10 cours", icon: Clock, date: "18/04/2023" },
    { id: 3, name: "Expert en maths", description: "A obtenu 100% à 5 quiz de mathématiques", icon: Trophy, date: "25/04/2023" },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-16 md:pt-0">
      <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <User className="text-eduPurple" /> Mon Profil
      </h1>

      <Tabs defaultValue="personal" className="w-full">
      <TabsList className="mb-8 grid grid-cols-3 gap-2 rounded-lg bg-spotifyGray p-1">
  <TabsTrigger value="personal" className="text-xs sm:text-sm data-[state=active]:bg-eduPurple/80 data-[state=inactive]:text-eduPurple/70">
    Informations
  </TabsTrigger>
  <TabsTrigger value="badges" className="text-xs sm:text-sm data-[state=active]:bg-eduPurple/80 data-[state=inactive]:text-eduPurple/70">
    Badges
  </TabsTrigger>
  <TabsTrigger value="settings" className="text-xs sm:text-sm data-[state=active]:bg-eduPurple/80 data-[state=inactive]:text-eduPurple/70">
    Paramètres
  </TabsTrigger>
</TabsList>

        <TabsContent value="personal">
          <Card className="bg-spotifyGray border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">Mes informations</CardTitle>
                <CardDescription>Vos informations personnelles et scolaires</CardDescription>
              </div>
              {!isEditing ? (
                <Button
                  className="bg-eduPurple hover:bg-eduPurple/90 text-white"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="mr-2" size={18} />
                  Modifier
                </Button>
              ) : (
                <Button
                  className="bg-eduPurple hover:bg-eduPurple/90 text-white"
                  onClick={handleSaveProfile}
                >
                  <Check className="mr-2" size={18} />
                  Enregistrer
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">Prénom</Label>
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="bg-black/20 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Nom</Label>
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="bg-black/20 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                    className="bg-black/20 border-gray-700 text-white"
                  />
                  <p className="text-xs text-spotifyLightGray">Pour changer votre email, contactez le support</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-white">Âge</Label>
                  <Input
                    id="age"
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="bg-black/20 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolLevel" className="text-white">Niveau scolaire</Label>
                  <Select 
                    disabled={!isEditing}
                    value={userData.schoolLevel}
                    onValueChange={(value) => setUserData({ ...userData, schoolLevel: value })}
                  >
                    <SelectTrigger className="bg-black/20 border-gray-700 text-white">
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sixième">Sixième</SelectItem>
                      <SelectItem value="Cinquième">Cinquième</SelectItem>
                      <SelectItem value="Quatrième">Quatrième</SelectItem>
                      <SelectItem value="Troisième">Troisième</SelectItem>
                      <SelectItem value="Seconde">Seconde</SelectItem>
                      <SelectItem value="Première">Première</SelectItem>
                      <SelectItem value="Terminale">Terminale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school" className="text-white">Établissement</Label>
                  <Input
                    id="school"
                    value={userData.school}
                    onChange={(e) => setUserData({ ...userData, school: e.target.value })}
                    disabled={!isEditing}
                    className="bg-black/20 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-700">
                <Label className="text-white">Matières préférées</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.subjects.map((subject, index) => (
                    <div key={index} className="bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                      {subject}
                      {isEditing && (
                        <button
                          className="ml-2 text-xs text-spotifyLightGray hover:text-white"
                          onClick={() => setUserData({
                            ...userData,
                            subjects: userData.subjects.filter((_, i) => i !== index)
                          })}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      className="bg-eduPurple/20 text-eduPurple px-3 py-1 rounded-full text-sm flex items-center"
                      onClick={() => {
                        const newSubject = prompt("Ajouter une matière");
                        if (newSubject && !userData.subjects.includes(newSubject)) {
                          setUserData({
                            ...userData,
                            subjects: [...userData.subjects, newSubject]
                          });
                        }
                      }}
                    >
                      + Ajouter
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <div className="space-y-6">
            <Card className="bg-spotifyGray border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-xl">Mes badges</CardTitle>
                <CardDescription>Les récompenses obtenues en utilisant l'application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div key={badge.id} className="bg-black/30 rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-eduPurple/20 flex items-center justify-center mb-3">
                        <badge.icon size={32} className="text-eduPurple" />
                      </div>
                      <h3 className="text-white font-medium mb-1">{badge.name}</h3>
                      <p className="text-spotifyLightGray text-sm mb-2">{badge.description}</p>
                      <span className="text-xs text-spotifyLightGray">Obtenu le {badge.date}</span>
                    </div>
                  ))}
                  <div className="bg-black/20 border border-dashed border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-center h-full">
                    <Trophy size={32} className="text-spotifyLightGray opacity-50 mb-3" />
                    <h3 className="text-white font-medium mb-1">Prochain badge</h3>
                    <p className="text-spotifyLightGray text-sm">
                      Continuez à apprendre pour débloquer plus de badges !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-spotifyGray border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-xl">Activité récente</CardTitle>
                <CardDescription>Votre historique d'apprentissage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "course", title: "Les équations différentielles", date: "Aujourd'hui, 14:30", result: "Terminé" },
                    { type: "quiz", title: "Quiz sur les équations différentielles", date: "Aujourd'hui, 14:35", result: "80%" },
                    { type: "exercise", title: "Exercice sur les primitives", date: "Hier, 18:20", result: "75%" },
                    { type: "course", title: "La Révolution Française", date: "Avant-hier, 10:15", result: "Terminé" },
                    { type: "quiz", title: "Quiz sur la Révolution Française", date: "Avant-hier, 10:30", result: "90%" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start p-3 hover:bg-black/30 rounded-md">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        activity.type === "course" ? "bg-blue-500/20" : 
                        activity.type === "quiz" ? "bg-purple-500/20" : 
                        "bg-green-500/20"
                      }`}>
                        {activity.type === "course" ? (
                          <Clock size={20} className="text-blue-500" />
                        ) : activity.type === "quiz" ? (
                          <Award size={20} className="text-purple-500" />
                        ) : (
                          <Trophy size={20} className="text-purple-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-white font-medium">{activity.title}</h4>
                          <span className={`text-sm ${
                            activity.result === "Terminé" ? "text-blue-400" :
                            parseInt(activity.result) >= 80 ? "text-purple-400" :
                            "text-yellow-400"
                          }`}>
                            {activity.result}
                          </span>
                        </div>
                        <p className="text-spotifyLightGray text-sm">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 justify-center py-4">
                <Button variant="link" className="text-eduPurple">
                  Voir toute l'activité
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-spotifyGray border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Settings className="mr-2 text-eduPurple" size={20} />
                Paramètres de l'application
              </CardTitle>
              <CardDescription>Gérez vos préférences d'utilisation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Notifications</Label>
                    <p className="text-sm text-spotifyLightGray">Recevoir des notifications sur les nouveaux cours</p>
                  </div>
                  <Switch 
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Mode sombre</Label>
                    <p className="text-sm text-spotifyLightGray">Activer le thème sombre pour l'application</p>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={handleToggleDarkMode}
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2" size={18} />
                    Se déconnecter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
