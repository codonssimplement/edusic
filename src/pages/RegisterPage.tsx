import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music, Mail, Lock, User, Facebook, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import PageTransition from "@/components/shared/PageTransition";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);
  const [passwordError, setPasswordError] = useState("");
  
  const { toast } = useToast();
  const { register, registerWithGoogle, registerWithFacebook } = useAuth();
  const navigate = useNavigate();

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        firstName,
        lastName,
        email,
        password
      });
      
      toast({
        title: "Inscription réussie",
        description: "Veuillez compléter votre profil.",
      });
      
      // Redirect to profile completion page
      navigate("/complete-profile");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue. Veuillez réessayer.",
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

  const handleGoogleRegister = async () => {
    setSocialLoading("google");
    
    try {
      // Simuler une demande d'autorisation
      const permissionGranted = await simulatePermissionDialog("Google");
      
      if (!permissionGranted) {
        toast({
          title: "Inscription annulée",
          description: "L'autorisation Google a été refusée",
          variant: "destructive",
        });
        setSocialLoading(null);
        return;
      }
      
      await registerWithGoogle();
      
      toast({
        title: "Inscription réussie",
        description: "Veuillez compléter votre profil.",
      });
      
      // Redirect to profile completion page
      navigate("/complete-profile");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Impossible de s'inscrire avec Google. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookRegister = async () => {
    setSocialLoading("facebook");
    
    try {
      // Simuler une demande d'autorisation
      const permissionGranted = await simulatePermissionDialog("Facebook");
      
      if (!permissionGranted) {
        toast({
          title: "Inscription annulée",
          description: "L'autorisation Facebook a été refusée",
          variant: "destructive",
        });
        setSocialLoading(null);
        return;
      }
      
      await registerWithFacebook();
      
      toast({
        title: "Inscription réussie",
        description: "Veuillez compléter votre profil.",
      });
      
      // Redirect to profile completion page
      navigate("/complete-profile");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Impossible de s'inscrire avec Facebook. Veuillez réessayer.",
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
            <CardTitle className="text-xl text-white text-center">Créez votre compte EduSic</CardTitle>
            <CardDescription className="text-spotifyLightGray text-center">
              Commencez à apprendre en musique
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 bg-black text-white border-gray-800 focus:border-eduGreen"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Nom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10 bg-black text-white border-gray-800 focus:border-eduGreen"
                      required
                    />
                  </div>
                </div>
              </div>
              
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
                    className="pl-10 bg-black text-white border-gray-800 focus:border-eduGreen"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotifyLightGray" size={18} />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Minimum 8 caractères" 
                    className="pl-10 bg-black text-white border-gray-800 focus:border-eduGreen"
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
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirmez votre mot de passe" 
                    className="pl-10 bg-black text-white border-gray-800 focus:border-eduGreen"
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
              
              <div className="text-xs text-spotifyLightGray">
                En vous inscrivant, vous acceptez nos{" "}
                <Link to="/terms" className="text-eduPurple hover:underline">
                  Conditions d'utilisation
                </Link>{" "}
                et notre{" "}
                <Link to="/privacy" className="text-eduPurple hover:underline">
                  Politique de confidentialité
                </Link>.
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-eduPurple hover:bg-eduPurple/90 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Création du compte..." : "S'inscrire"}
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
                onClick={handleGoogleRegister}
                disabled={socialLoading !== null}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12 h8"></path>
                  <path d="M12 8 v8"></path>
                </svg>
                {socialLoading === "google" ? "Inscription en cours..." : "S'inscrire avec Google"}
              </Button>
              <Button 
                variant="whiteBackground" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleFacebookRegister}
                disabled={socialLoading !== null}
              >
                <Facebook size={18} />
                {socialLoading === "facebook" ? "Inscription en cours..." : "S'inscrire avec Facebook"}
              </Button>
            </div>
            
            <p className="text-spotifyLightGray text-sm text-center mt-4">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-eduPurple  hover:underline">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;
