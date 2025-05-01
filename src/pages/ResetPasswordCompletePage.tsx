import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Music, Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ResetPasswordCompletePage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Vérification du token dans l'URL
  const token = new URLSearchParams(location.search).get('token');
  
  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return false;
    }
    
    setPasswordError("");
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simuler la mise à jour du mot de passe
    setTimeout(() => {
      setIsComplete(true);
      setIsLoading(false);
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });
    }, 1500);
  };
  
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-spotifyGray p-4">
        <Card className="w-full max-w-md bg-spotifyGray border-spotifyGray">
          <CardContent className="pt-6">
            <div className="text-center text-white space-y-4">
              <p>Ce lien n'est pas valide ou a expiré.</p>
              <Button 
                className="bg-eduPurple hover:bg-eduPurple/90 text-black"
                onClick={() => navigate("/reset-password")}
              >
                Demander un nouveau lien
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-spotifyGray p-4">
     
      <div className="flex items-center mb-6">
          <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto" />
      </div>
      
      <Card className="w-full max-w-md bg-spotifyGray border-spotifyGray">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">Réinitialiser votre mot de passe</CardTitle>
          <CardDescription className="text-spotifyLightGray text-center">
            Créez un nouveau mot de passe pour votre compte
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isComplete ? (
            <div className="text-center space-y-4">
              <CheckCircle size={64} className="mx-auto text-eduPurple" />
              <h2 className="text-white text-xl">Mot de passe réinitialisé !</h2>
              <p className="text-spotifyLightGray">
                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter à votre compte.
              </p>
              <div className="mt-6">
                <Button 
                  className="bg-eduPurple hover:bg-eduPurple/90 text-black"
                  onClick={() => navigate("/login")}
                >
                  Se connecter
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Nouveau mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-black text-white border-gray-800 focus:border-eduPurple"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-spotifyLightGray hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-black text-white border-gray-800 focus:border-eduPurple"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-spotifyLightGray hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-eduPurple hover:bg-eduPurple/90 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Mise à jour en cours..." : "Réinitialiser le mot de passe"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordCompletePage;
