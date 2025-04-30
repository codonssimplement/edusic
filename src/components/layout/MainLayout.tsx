
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { HeartHandshake, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube, Copyright } from "lucide-react";
import InstallPrompt from "../pwa/InstallPrompt";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto"
        >
          <div className={`${isMobile ? 'p-4 pt-16' : 'p-6'}`}>
            {children}
          </div>
          
          {/* Footer */}
          <footer className="bg-black border-t border-gray-800 py-10 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div> <h3 className="text-white font-bold text-lg mb-[-4px]">À propos</h3>
                
                    <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto mb-[-4px]" />
                   
                 
                  <p className="text-spotifyLightGray mb-4 hover:text-white transition-colors">
                    EduSic révolutionne l'apprentissage en associant éducation et musique pour faciliter la mémorisation et rendre l'étude plus agréable.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="hover-social-icon">
                      <Instagram size={20} className="text-spotifyLightGray hover:text-eduPurple transition-colors" />
                    </a>
                    <a href="#" className="hover-social-icon">
                      <Facebook size={20} className="text-spotifyLightGray hover:text-eduPurple transition-colors" />
                    </a>
                    <a href="#" className="hover-social-icon">
                      <Twitter size={20} className="text-spotifyLightGray hover:text-eduPurple transition-colors" />
                    </a>
                    <a href="#" className="hover-social-icon">
                      <Youtube size={20} className="text-spotifyLightGray hover:text-eduPurple transition-colors" />
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Liens rapides</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/" className="text-spotifyLightGray hover:text-white transition-colors">Accueil</a>
                    </li>
                    <li>
                      <a href="/catalog" className="text-spotifyLightGray hover:text-white transition-colors">Catalogue</a>
                    </li>
                    <li>
                      <a href="/subjects" className="text-spotifyLightGray hover:text-white transition-colors">Matières</a>
                    </li>
                    <li>
                      <a href="/new-releases" className="text-spotifyLightGray hover:text-white transition-colors">Nouveautés</a>
                    </li>
                    <li>
                      <a href="/playlists" className="text-spotifyLightGray hover:text-white transition-colors">Playlists</a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <MapPin size={16} className="text-eduPurple" />
                      <span className="text-spotifyLightGray hover:text-white transition-colors text-sm">
                        Dakar, Sénégal
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone size={16} className="text-eduPurple" />
                      <a href="tel:+221777041245" className="text-spotifyLightGray hover:text-white transition-colors text-sm">
                        +221 77 704 12 45
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail size={16} className="text-eduPurple" />
                      <a href="mailto:contact@edusic.sn" className="text-spotifyLightGray hover:text-white transition-colors text-sm">
                        contact@edusic.sn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-1 text-spotifyLightGray text-sm mb-4 md:mb-0">
                  <Copyright size={14} />
                  <span>{currentYear} EduSic. Tous droits réservés</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm justify-center">
                  <a href="#" className="text-spotifyLightGray hover:text-white transition-colors">Conditions d'utilisation</a>
                  <a href="#" className="text-spotifyLightGray hover:text-white transition-colors">Politique de confidentialité</a>
                  <a href="#" className="text-spotifyLightGray hover:text-white transition-colors">Mentions légales</a>
                </div>
              </div>
            </div>
          </footer>
          
          {/* PWA Install Prompt */}
          <InstallPrompt />
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
