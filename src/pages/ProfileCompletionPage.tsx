
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, User, School, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

// Options pour les niveaux scolaires
const gradeLevels = [
  { value: "college", label: "Collège" },
  { value: "seconde", label: "Seconde" },
  { value: "premiere", label: "Première" },
  { value: "terminale", label: "Terminale" },
  { value: "superior", label: "Études supérieures" },
];

// Options pour les préférences/matières
const subjectOptions = [
  { value: "math", label: "Mathématiques" },
  { value: "physics", label: "Physique" },
  { value: "chemistry", label: "Chimie" },
  { value: "biology", label: "Biologie" },
  { value: "literature", label: "Littérature" },
  { value: "history", label: "Histoire" },
  { value: "geography", label: "Géographie" },
  { value: "english", label: "Anglais" },
  { value: "philosophy", label: "Philosophie" },
  { value: "music", label: "Musique" },
];

const ProfileCompletionPage = () => {
  const { user, completeProfile } = useAuth();
  const [age, setAge] = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [school, setSchool] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await completeProfile({
        age: age ? parseInt(age) : undefined,
        gradeLevel,
        school,
        preferences,
      });
      
      toast({
        title: "Profil complété !",
        description: "Votre profil a été mis à jour avec succès.",
      });
      
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-spotifyGray p-4">
      <div className="flex items-center mb-6">
        <Music size={32} className="text-eduGreen mr-2" />
        <h1 className="text-3xl font-bold text-white">EduSic</h1>
      </div>
      
      <Card className="w-full max-w-lg bg-spotifyGray border-spotifyGray">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">Complétez votre profil</CardTitle>
          <CardDescription className="text-spotifyLightGray text-center">
            Personnalisez votre expérience d'apprentissage
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white">Âge</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                <Input
                  id="age"
                  type="number"
                  placeholder="Votre âge"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="pl-10 bg-black border-gray-800 focus:border-eduGreen"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gradeLevel" className="text-white">Niveau scolaire</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel} required>
                <SelectTrigger className="bg-black border-gray-800 focus:border-eduGreen text-white">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-spotifyLightGray" />
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-spotifyGray border-gray-800">
                  {gradeLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school" className="text-white">Établissement scolaire</Label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                <Input
                  id="school"
                  type="text"
                  placeholder="Nom de votre établissement"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="pl-10 bg-black border-gray-800 focus:border-eduGreen"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferences" className="text-white">Préférences (matières)</Label>
              <MultiSelect
                options={subjectOptions}
                selected={preferences}
                onChange={setPreferences}
                placeholder="Sélectionnez vos matières préférées"
                className="bg-black border-gray-800 focus:border-eduGreen text-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-eduGreen hover:bg-eduGreen/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "Compléter mon profil"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletionPage;
