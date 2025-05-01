
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Music, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast({
        title: "Demande envoyée",
        description: "Un email avec les instructions a été envoyé à votre adresse.",
      });
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
        <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto" />
      </div>
      
      <Card className="w-full max-w-md bg-spotifyGray border-spotifyGray">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">Mot de passe oublié</CardTitle>
          <CardDescription className="text-spotifyLightGray text-center">
            Réinitialisez votre mot de passe
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <CheckCircle size={64} className="mx-auto text-eduPurple" />
              <h2 className="text-white text-xl">Email envoyé !</h2>
              <p className="text-spotifyLightGray">
                Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
              </p>
              <div className="mt-6">
                <Link to="/login">
                  <Button className="bg-eduPurple hover:bg-eduPurple/90 text-black">
                    Retour à la connexion
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
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
                    className="pl-10 bg-black text-white border-gray-800 focus:border-eduPurple"
                    required
                  />
                </div>
                <p className="text-xs text-spotifyLightGray mt-2">
                  Saisissez l'adresse email associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-eduPurple hover:bg-eduPurple/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
              </Button>
              
              <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-eduPurple hover:underline">
                  Retour à la connexion
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
