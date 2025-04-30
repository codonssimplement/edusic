
import React, { useState } from "react";
import { BarChart, Users, BookOpen, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const dashboardStats = {
    totalUsers: 1234,
    totalCourses: 56,
    activePlaylists: 128,
    averageScore: 75
  };

  const usersList = [
    { id: 1, name: "John Doe", email: "john@example.com", level: "Terminale" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", level: "Première" }
  ];

  const coursesList = [
    { id: 1, title: "Les équations différentielles", subject: "Mathématiques", level: "Terminale" },
    { id: 2, title: "La Révolution Française", subject: "Histoire", level: "Première" }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Settings className="text-eduGreen" /> Tableau de bord administrateur
      </h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6 bg-spotifyGray border-gray-800">
          <TabsTrigger value="dashboard" className="text-white">
            <BarChart className="mr-2" /> Statistiques
          </TabsTrigger>
          <TabsTrigger value="users" className="text-white">
            <Users className="mr-2" /> Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="courses" className="text-white">
            <BookOpen className="mr-2" /> Cours
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-spotifyGray border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  Utilisateurs totaux
                  <Users className="text-eduPurple" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{dashboardStats.totalUsers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-spotifyGray border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  Nombre de cours
                  <BookOpen className="text-eduPurple" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{dashboardStats.totalCourses}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-spotifyGray border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  Playlists actives
                  <BarChart className="text-eduPurple" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{dashboardStats.activePlaylists}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-spotifyGray border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  Score moyen
                  <Settings className="text-eduPurple" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{dashboardStats.averageScore}%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card className="bg-spotifyGray border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Liste des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Nom</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Niveau</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user) => (
                      <tr key={user.id} className="border-b border-gray-700">
                        <td className="p-2">{user.id}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.level}</td>
                        <td className="p-2">
                          <Button size="sm" className="mr-2 bg-eduPurple hover:bg-eduPurple/90 text-white">
                            Modifier
                          </Button>
                          <Button size="sm" variant="destructive">
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <Card className="bg-spotifyGray border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-center">
                Liste des cours
                <Button className="bg-eduPurple hover:bg-eduPurple/90 text-white">
                  Ajouter un cours
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Titre</th>
                      <th className="text-left p-2">Matière</th>
                      <th className="text-left p-2">Niveau</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesList.map((course) => (
                      <tr key={course.id} className="border-b border-gray-700">
                        <td className="p-2">{course.id}</td>
                        <td className="p-2">{course.title}</td>
                        <td className="p-2">{course.subject}</td>
                        <td className="p-2">{course.level}</td>
                        <td className="p-2">
                          <Button size="sm" className="mr-2 bg-eduPurple hover:bg-eduPurple/90 text-white">
                            Modifier
                          </Button>
                          <Button size="sm" variant="destructive">
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
