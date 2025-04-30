
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="mt-16 bg-gradient-to-r from-green-800/80 to-teal-700/80 relative overflow-hidden rounded-xl p-8"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000')] opacity-10 mix-blend-overlay"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center">
            <GraduationCap className="mr-3 text-eduGreen" size={32} />
            Prêt à révolutionner votre façon d'apprendre ?
          </h2>
          <p className="text-white/90 mb-6">
            Rejoignez des milliers d'étudiants qui améliorent leurs résultats scolaires grâce à EduSic. Commencez dès aujourd'hui avec un essai gratuit de 14 jours !
          </p>
        </div>
        <div className="md:w-1/3 flex flex-wrap justify-center md:justify-end gap-4">
          <Button className="bg-eduGreen hover:bg-eduGreen/90 text-black font-bold px-6 py-6 text-lg rounded-full">
            Démarrer gratuitement
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 text-lg rounded-full">
            En savoir plus
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CallToAction;
