
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const EmailVerificationPage = () => {
  const location = useLocation();
  const { user, verifyEmail } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { toast } = useToast();

  // Vérifier le token dans l'URL si présent
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      handleVerification(token);
    }
  }, [location]);

  useEffect(() => {
    // Si l'utilisateur a déjà vérifié son email, mettre à jour l'état
    if (user?.emailVerified) {
      setIsVerified(true);
    }
  }, [user]);

  // Compte à rebours pour le renvoi d'email
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerification = async (token: string) => {
    setIsVerifying(true);
    
    try {
      await verifyEmail(token);
      setIsVerified(true);
      toast({
        title: "Email vérifié",
        description: "Votre adresse email a été vérifiée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur de vérification",
        description: "Le lien n'est plus valide ou a expiré.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = () => {
    // Logique de renvoi d'email
    toast({
      title: "Email renvoyé",
      description: "Un nouvel email de vérification a été envoyé à votre adresse.",
    });
    setCountdown(60);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-spotifyGray p-4">
      <Card className="w-full max-w-md bg-spotifyGray border-spotifyGray">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">Vérification de l'email</CardTitle>
          <CardDescription className="text-spotifyLightGray">
            Confirmez votre adresse email pour accéder à toutes les fonctionnalités
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {isVerified ? (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle size={64} className="text-eduPurple" />
              <h2 className="text-white text-2xl font-bold">Email vérifié !</h2>
              <p className="text-spotifyLightGray">
                Votre compte est maintenant activé. Vous pouvez profiter de toutes les fonctionnalités d'EduSic.
              </p>
              <div className="flex space-x-4 mt-4">
                <Link to="/profile">
                  <Button className="bg-eduPurple hover:bg-eduPurple/90 text-black">
                    Voir mon profil
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="bg-black border-gray-800 text-white hover:bg-black/60">
                    Aller à l'accueil
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Mail size={64} className="mx-auto text-eduPurple" />
              <h2 className="text-white text-xl font-semibold">Vérifiez votre boîte de réception</h2>
              <p className="text-spotifyLightGray">
                Nous avons envoyé un email avec un lien de confirmation à
                {user?.email ? <span className="text-white font-medium"> {user.email}</span> : <span> votre adresse</span>}. 
                Cliquez sur le lien pour activer votre compte.
              </p>
              
              <div className="bg-black/30 rounded-lg p-4 mt-4 border border-gray-800">
                <h3 className="text-white font-medium mb-2">Vous n'avez pas reçu l'email ?</h3>
                <p className="text-spotifyLightGray text-sm mb-4">
                  Vérifiez votre dossier de spam ou demandez un nouvel email.
                </p>
                <Button 
                  onClick={handleResendEmail}
                  disabled={countdown > 0 || isVerifying}
                  className="w-full bg-spotifyGray border border-gray-700 text-white hover:bg-black/40"
                >
                  {countdown > 0 
                    ? (
                      <span className="flex items-center">
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Renvoyer ({countdown}s)
                      </span>
                    ) 
                    : "Renvoyer l'email de vérification"}
                </Button>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Link to="/" className="text-eduPurple hover:underline">
                  Revenir à l'accueil
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
