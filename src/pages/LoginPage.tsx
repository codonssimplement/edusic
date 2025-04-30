
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music, Mail, Lock, Facebook, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import PageTransition from "@/components/shared/PageTransition";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);
  const { login, loginWithGoogle, loginWithFacebook, isProfileComplete } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur EduSic !",
      });
      
      // Redirect to profile completion if needed, otherwise to home
      if (!isProfileComplete()) {
        navigate('/complete-profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulatePermissionDialog = (provider: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const confirmed = window.confirm(
        `${provider} demande les autorisations suivantes :\n\n` +
        `- Accéder à votre profil (prénom, nom)\n` +
        `- Accéder à votre adresse email\n\n` +
        `Autorisez-vous EduSic à accéder à ces informations ?`
      );
      resolve(confirmed);
    });
  };

  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    
    try {
      // Simuler une demande d'autorisation
      const permissionGranted = await simulatePermissionDialog("Google");
      
      if (!permissionGranted) {
        toast({
          title: "Connexion annulée",
          description: "L'autorisation Google a été refusée",
          variant: "destructive",
        });
        setSocialLoading(null);
        return;
      }
      
      await loginWithGoogle();
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur EduSic !",
      });
      
      // Redirect to profile completion if needed, otherwise to home
      if (!isProfileComplete()) {
        navigate('/complete-profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter avec Google. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    setSocialLoading("facebook");
    
    try {
      // Simuler une demande d'autorisation
      const permissionGranted = await simulatePermissionDialog("Facebook");
      
      if (!permissionGranted) {
        toast({
          title: "Connexion annulée",
          description: "L'autorisation Facebook a été refusée",
          variant: "destructive",
        });
        setSocialLoading(null);
        return;
      }
      
      await loginWithFacebook();
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur EduSic !",
      });
      
      // Redirect to profile completion if needed, otherwise to home
      if (!isProfileComplete()) {
        navigate('/complete-profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter avec Facebook. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-spotifyGray p-4">
        <div className="flex items-center mb-6">
          <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto" />
        </div>
        
        <Card className="w-full max-w-md bg-spotifyGray border-spotifyGray">
          <CardHeader>
            <CardTitle className="text-xl text-white text-center">Connectez-vous à EduSic</CardTitle>
            <CardDescription className="text-spotifyLightGray text-center">
              Accédez à vos cours et playlists
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black text-white border-gray-600 focus:border-eduPurple"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-white">Mot de passe</Label>
                  <Link to="/reset-password" className="text-xs text-eduPurple hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray/90" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-black text-white border-gray-600 focus:border-eduPurple"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-eduPurple hover:bg-eduPurple/90 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-spotifyGray px-2 text-spotifyLightGray">ou</span>
              </div>
            </div>
            
            <div className="grid gap-3 w-full">
              <Button 
                variant="whiteBackground" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={socialLoading !== null}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12 h8"></path>
                  <path d="M12 8 v8"></path>
                </svg>
                {socialLoading === "google" ? "Connexion en cours..." : "Continuer avec Google"}
              </Button>
              <Button 
                variant="whiteBackground" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleFacebookLogin}
                disabled={socialLoading !== null}
              >
                <Facebook size={18} />
                {socialLoading === "facebook" ? "Connexion en cours..." : "Continuer avec Facebook"}
              </Button>
            </div>
            
            <p className="text-spotifyLightGray text-sm text-center mt-4">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register" className="text-eduPurple hover:underline">
                S'inscrire
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
