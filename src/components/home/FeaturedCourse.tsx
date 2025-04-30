
import { Headphones, Heart, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FeaturedCourse = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 relative overflow-hidden p-6 rounded-lg my-10"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000')] opacity-10 mix-blend-overlay"></div>
      <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
        <div className="md:w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1453738773917-9c3eff1db985?q=80&w=1000" 
            alt="Cours du jour" 
            className="rounded-md w-full aspect-square object-cover shadow-lg border border-white/10" 
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex items-center gap-2 mb-2">
            <Headphones className="text-eduGreen" size={20} />
            <span className="text-eduGreen font-medium">Cours du jour</span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-1 mb-2">Les fonctions dérivées</h3>
          <p className="text-white/80 mb-4">
            Maîtrisez les concepts fondamentaux des fonctions dérivées avec ce cours chanté qui vous aidera à mémoriser facilement les formules et applications.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/player/12">
              <Button className="bg-eduGreen text-black hover:bg-eduGreen/90 px-4 py-2 rounded-full font-medium transition-colors">
                <Headphones className="mr-2" size={16} />
                Écouter maintenant
              </Button>
            </Link>
            <Button className="border border-white/40 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium hover:bg-white/20 transition-colors">
              <Heart className="mr-2" size={16} />
              Ajouter à ma playlist
            </Button>
            <Button className="bg-black/30 border-none text-white px-4 py-2 rounded-full font-medium hover:bg-black/50 transition-colors">
              <Bell className="mr-2" size={16} />
              Être notifié des mises à jour
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCourse;
