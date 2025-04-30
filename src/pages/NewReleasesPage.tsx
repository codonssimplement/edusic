
import { Music, TrendingUp, Calendar, Star, Clock, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewReleasesPage = () => {
  const newReleases = [
    { 
      id: "1", 
      title: "Les équations différentielles en chanson", 
      subject: "Mathématiques", 
      level: "Terminale", 
      releaseDate: "2 avril 2025",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000",
      popularity: 89
    },
    { 
      id: "2", 
      title: "La guerre froide - Mélodie historique", 
      subject: "Histoire", 
      level: "Terminale", 
      releaseDate: "1 avril 2025",
      image: "https://images.unsplash.com/photo-1551406483-3731c5ab67a7?q=80&w=1000",
      popularity: 92
    },
    { 
      id: "3", 
      title: "Vocabulaire espagnol en rythme", 
      subject: "Espagnol", 
      level: "Seconde", 
      releaseDate: "29 mars 2025",
      image: "https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1000",
      popularity: 76
    },
    { 
      id: "4", 
      title: "Les réactions chimiques - Ballade scientifique", 
      subject: "Physique-Chimie", 
      level: "Première", 
      releaseDate: "28 mars 2025",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
      popularity: 85
    },
    { 
      id: "5", 
      title: "Phénomènes littéraires - Rap poétique", 
      subject: "Français", 
      level: "Première", 
      releaseDate: "27 mars 2025",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000",
      popularity: 81
    },
    { 
      id: "6", 
      title: "Pythagore en musique", 
      subject: "Mathématiques", 
      level: "Troisième", 
      releaseDate: "26 mars 2025",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000",
      popularity: 94
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-eduGreen/20 p-2 rounded-lg">
            <TrendingUp className="text-eduGreen" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Nouveautés</h1>
        </div>
        <p className="text-spotifyLightGray max-w-2xl">
          Découvrez nos nouveaux cours en musique pour apprendre plus efficacement. Mis à jour régulièrement pour accompagner votre parcours académique.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newReleases.map((course) => (
            <motion.div 
              key={course.id} 
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-eduGreen/40 transition-all"
            >
              <Link to={`/player/${course.id}`} className="block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full aspect-square object-cover transition-transform hover:scale-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-eduGreen text-black font-medium px-2 py-1 rounded-full inline-block">
                        NOUVEAU
                      </span>
                      <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span>{course.popularity}%</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight">{course.title}</h3>
                    <p className="text-sm text-spotifyLightGray">{course.subject} - {course.level}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-spotifyLightGray" />
                    <span className="text-xs text-spotifyLightGray">{course.releaseDate}</span>
                  </div>
                  <button className="bg-eduGreen rounded-full p-2 hover:scale-105 transition-transform">
                    <Music className="text-black" size={16} />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Headphones className="text-eduGreen" />
          Albums et compilations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-800 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 p-6">
              <h3 className="text-lg font-bold text-white mb-2">Spécial Bac 2025</h3>
              <p className="text-sm text-white/80 mb-4">Une compilation des cours essentiels pour réussir le bac</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-xs text-white/60">
                  <Clock size={14} />
                  12 cours • 3h
                </span>
                <button className="text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
                  <Music size={16} />
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-teal-700 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517842536804-bf6629e2c291?q=80&w=1000')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 p-6">
              <h3 className="text-lg font-bold text-white mb-2">Langues étrangères</h3>
              <p className="text-sm text-white/80 mb-4">Mémorisez facilement avec ces mélodies</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-xs text-white/60">
                  <Clock size={14} />
                  8 cours • 2h15
                </span>
                <button className="text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
                  <Music size={16} />
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-orange-700 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 p-6">
              <h3 className="text-lg font-bold text-white mb-2">Sciences en mélodie</h3>
              <p className="text-sm text-white/80 mb-4">De la physique à la biologie en musique</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-xs text-white/60">
                  <Clock size={14} />
                  10 cours • 2h40
                </span>
                <button className="text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
                  <Music size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-eduGreen/20 p-1.5 rounded-md">
            <Star className="text-eduGreen" size={18} />
          </div>
          <h3 className="text-lg font-bold text-white">Promotion du moment</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1000" 
              alt="Promotion" 
              className="w-full aspect-video object-cover" 
            />
          </div>
          <div className="w-full md:w-2/3">
            <h4 className="text-lg font-bold text-white mb-2">Abonnement Premium Éducation</h4>
            <p className="text-spotifyLightGray mb-4">
              Accédez à tous nos cours en musique avec notre offre spéciale pour les étudiants ! 
              Profitez de contenus exclusifs, de quiz avancés et d'un suivi personnalisé de vos progrès.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-eduGreen hover:bg-eduGreen/90 text-black font-medium px-4 py-2 rounded-full">
                Découvrir l'offre
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewReleasesPage;
