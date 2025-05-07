
import React, { useState } from "react";
import { User, Mail, Lock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [gradeLevel, setGradeLevel] = useState("terminale");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="pt-16 md:pt-0">
      <h1 className="text-2xl font-bold text-white mb-8">Mon Profil</h1>
      
      <Card className="bg-spotifyGray border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex justify-between items-center">
            Informations personnelles
            <Button 
              variant="outline" 
              className="text-white border-gray-700 hover:bg-black/40"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Annuler" : "Modifier"}
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 bg-black border-gray-800 disabled:opacity-50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 bg-black border-gray-800 disabled:opacity-50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gradeLevel" className="text-white">Niveau scolaire</Label>
              <Select 
                value={gradeLevel} 
                onValueChange={isEditing ? setGradeLevel : undefined}
                disabled={!isEditing}
              >
                <SelectTrigger className={`bg-black border-gray-800 text-white ${!isEditing ? 'opacity-50' : ''}`}>
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent className="bg-spotifyGray border-gray-800">
                  <SelectItem value="college">Collège</SelectItem>
                  <SelectItem value="seconde">Seconde</SelectItem>
                  <SelectItem value="premiere">Première</SelectItem>
                  <SelectItem value="terminale">Terminale</SelectItem>
                  <SelectItem value="superior">Études supérieures</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isEditing && (
              <Button 
                className="w-full bg-eduGreen hover:bg-eduGreen/90 text-white mt-4"
                onClick={handleSaveProfile}
              >
                Enregistrer les modifications
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
