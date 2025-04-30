
import { useState, useEffect } from "react";
import { Home, Search, BookOpen, Library, Music, Plus, User, Settings, TrendingUp, ListMusic, LogIn, UserPlus, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { isLoggedIn, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ferme automatiquement le menu sur mobile lors d'un changement de route
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur EduSic !",
    });
    navigate('/');
  };

  // Version mobile du sidebar
  if (isMobile) {
    return (
      <>
        {/* Bouton de menu mobile */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-50 bg-spotifyGray rounded-full p-2 shadow-lg"
        >
          {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
        
        {/* Header pour mobile (visible quand le menu est fermé) */}
        {!mobileMenuOpen && (
          <div className="fixed top-0 left-0 right-0 bg-black p-4 flex justify-center items-center z-30">
            <Link to="/" className="text-white text-xl font-bold flex items-center gap-2">
              <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto" />
              {/* <span>EduSic</span> */}
            </Link>
          </div>
        )}
        
        {/* Menu mobile */}
        <div className={`fixed inset-0 bg-black z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
          <div className="pt-16 pb-24">
            <div className="p-6">
              <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto" />
                {/* <span>EduSic</span> */}
              </h1>
            </div>
            
            {/* Auth buttons for mobile */}
            {!isLoggedIn && (
              <div className="px-6 mb-4">
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <Button className="w-full bg-eduPurple hover:bg-eduPurple/90 text-white flex font-semibold items-center gap-2">
                      <LogIn size={16} />
                      <span>Se connecter</span>
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="w-full border-eduPurple font-semibold text-eduPurple hover:bg-eduPurple/10 flex items-center gap-2">
                      <UserPlus size={16} />
                      <span>S'inscrire</span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            
            <nav className="mt-2">
              <ul className="space-y-1">
                <li>
                  <Link to="/" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/') && location.pathname === '/' ? 'bg-white/20 text-eduPurple' : ''}`}>
                    <Home size={24} />
                    <span>Accueil</span>
                  </Link>
                </li>
                <li>
                  <Link to="/search" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/search') ? 'bg-white/20 text-eduPurple' : ''}`}>
                    <Search size={24} />
                    <span>Recherche</span>
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/catalog') ? 'bg-white/20 text-eduPurple' : ''}`}>
                    <BookOpen size={24} />
                    <span>Catalogue</span>
                  </Link>
                </li>
                <li>
                  <Link to="/new-releases" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/new-releases') || isActiveRoute('/recent') ? 'bg-white/20 text-eduPurple' : ''}`}>
                    <TrendingUp size={24} />
                    <span>Nouveautés</span>
                  </Link>
                </li>
                <li>
                  <Link to="/playlists" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/playlists') ? 'bg-white/20 text-eduPurple' : ''}`}>
                    <ListMusic size={24} />
                    <span>Playlists</span>
                  </Link>
                </li>
                <li>
                  <Link to="/subjects" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/subjects') ? 'bg-white/20 text-eduPurple' : ''}`}>
                    <Library size={24} />
                    <span>Matières</span>
                  </Link>
                </li>
                
                {/* User-specific links - only visible when logged in */}
                {isLoggedIn && (
                  <>
                    <li>
                      <Link to="/profile" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/profile') ? 'bg-white/20 text-eduPurple' : ''}`}>
                        <User size={24} />
                        <span>Profil</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/exercises" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/exercises') ? 'bg-white/20 text-eduPurple' : ''}`}>
                        <Library size={24} />
                        <span>Exercices</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin" className={`flex items-center gap-3 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActiveRoute('/admin') ? 'bg-white/20 text-eduPurple' : ''}`}>
                        <Settings size={24} />
                        <span>Administration</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            
            {/* Log out button - only visible when logged in */}
            {isLoggedIn && (
              <div className="mt-8 px-6">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 bg-black border-gray-800 text-white hover:bg-red-600/10 hover:text-red-500 hover:border-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Se déconnecter</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Version desktop du sidebar
  return (
    <div className={`${expanded ? 'w-64' : 'w-20'} bg-black h-full flex flex-col transition-all duration-300`}>
      <div className="p-1 ">
        <h1 className="text-white text-2xl font-bold flex items-center gap-2 mb-[-4px]">
          <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto mb-[-4px]" />
        </h1>
      </div>
      
      {/* Auth buttons for top visibility */}
      {expanded && !isLoggedIn && (
        <div className="px-1 mb-2">
          <div className="flex flex-col space-y-2">
            <Link to="/login">
              <Button className="w-full bg-eduPurple hover:bg-eduPurple/90 text-white flex font-semibold items-center gap-2">
                <LogIn size={16} />
                <span>Se connecter</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="w-full border-eduPurple text-eduPurple hover:bg-eduPurple/10 flex items-center gap-2">
                <UserPlus size={16} />
                <span>S'inscrire</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <nav className="mt-2">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/') && location.pathname === '/' ? 'bg-white/20 text-eduPurple' : ''}`}>
              <Home size={24} />
              {expanded && <span>Accueil</span>}
            </Link>
          </li>
          <li>
            <Link to="/search" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/search') ? 'bg-white/20 text-eduPurple' : ''}`}>
              <Search size={24} />
              {expanded && <span>Recherche</span>}
            </Link>
          </li>
          <li>
            <Link to="/catalog" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/catalog') ? 'bg-white/20 text-eduPurple' : ''}`}>
              <BookOpen size={24} />
              {expanded && <span>Catalogue</span>}
            </Link>
          </li>
          <li>
            <Link to="/new-releases" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/new-releases') || isActiveRoute('/recent') ? 'bg-white/20 text-eduPurple' : ''}`}>
              <TrendingUp size={24} />
              {expanded && <span>Nouveautés</span>}
            </Link>
          </li>
          <li>
            <Link to="/playlists" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/playlists') ? 'bg-white/20 text-eduPurple' : ''}`}>
              <ListMusic size={24} />
              {expanded && <span>Playlists</span>}
            </Link>
          </li>
          <li>
            <Link to="/subjects" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/subjects') ? 'bg-white/20 text-eduPurple' : ''}`}>
              <Library size={24} />
              {expanded && <span>Matières</span>}
            </Link>
          </li>
          
          {/* User-specific links - only visible when logged in */}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/profile" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/profile') ? 'bg-white/20 text-eduPurple' : ''}`}>
                  <User size={24} />
                  {expanded && <span>Profil</span>}
                </Link>
              </li>
              <li>
                <Link to="/exercises" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/exercises') ? 'bg-white/20 text-eduPurple' : ''}`}>
                  <Library size={24} />
                  {expanded && <span>Exercices</span>}
                </Link>
              </li>
              <li>
                <Link to="/admin" className={`flex items-center gap-3 px-6 py-2 text-sm text-white hover:bg-white/10 ${isActiveRoute('/admin') ? 'bg-white/20 text-eduPurple' : ''}`}>
                  <Settings size={24} />
                  {expanded && <span>Administration</span>}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      
      {expanded && (
        <div className="mt-8">
          <div className="px-6">
            <div className="bg-spotifyGray bg-opacity-60 rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-spotifyLightGray flex items-center gap-2">
                  <Library size={20} />
                  <span>Mes playlists</span>
                </span>
                <button className="text-spotifyLightGray hover:text-white">
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="space-y-2">
                <Link to="/playlists/create" className="block text-sm text-white hover:text-eduPurple">
                  Créer une playlist
                </Link>
                <p className="text-xs text-spotifyLightGray">
                  Organisez vos cours préférés en playlists personnalisées
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 px-6">
            <div className="text-xs text-spotifyLightGray">
              <p className="mb-2">Playlists récentes</p>
              <ul className="space-y-2">
                <li className="truncate hover:text-white">
                  <Link to="/playlists/1">Révisions Bac Français</Link>
                </li>
                <li className="truncate hover:text-white">
                  <Link to="/playlists/2">Maths Terminale</Link>
                </li>
                <li className="truncate hover:text-white">
                  <Link to="/playlists/3">Histoire Géo</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-auto p-6">
        <button 
          className="text-spotifyLightGray hover:text-white w-full flex justify-center"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '«' : '»'}
        </button>
        
        {isLoggedIn && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 bg-black border-gray-800 text-white hover:bg-red-600/10 hover:text-red-500 hover:border-red-600"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              {expanded && <span>Se déconnecter</span>}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
