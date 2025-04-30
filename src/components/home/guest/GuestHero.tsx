
import React from 'react';
import { motion } from "framer-motion";
import SearchBar from "@/components/shared/SearchBar";
import FeatureCards from "./FeatureCards";

const GuestHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4"
      >
        {/* <img src="/logoEduSic.png" alt="EduSic" className="w-24 h-24 mx-auto" /> */}
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-3 mt-14 bg-gradient-to-r from-eduPurple via-teal-300 to-blue-400 text-transparent bg-clip-text"
      >
        Apprends en musique avec EduSic 
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-spotifyLightGray mb-8 max-w-1.5xl mx-auto text-lg"
      >
        Le savoir a enfin trouvé son flow.
        Transforme tes cours en mélodies.
        Retiens mieux, mémorise plus vite, et kiffe l’apprentissage comme jamais.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-10 max-w-1.5xl mx-auto"
      >
        <SearchBar />
      </motion.div>

      <FeatureCards />
    </motion.div>
  );
};

export default GuestHero;
