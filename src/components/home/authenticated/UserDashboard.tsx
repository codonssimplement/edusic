
import React from 'react';
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "@/components/shared/SearchBar";
import ProgressCard from "@/components/dashboard/ProgressCard";
import RecentListeningCard from "@/components/dashboard/RecentListeningCard";
import DailyGoalCard from "@/components/home/authenticated/DailyGoalCard";

export const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-eduGreen to-teal-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
            {user?.firstName ? user.firstName.charAt(0) : "U"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Bonjour, {user?.firstName || "Utilisateur"}
            </h1>
            <p className="text-spotifyLightGray">Continuez votre apprentissage en musique</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10"
      >
        <SearchBar />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <ProgressCard />
        <RecentListeningCard />
      </motion.div>
      
      <DailyGoalCard />
    </>
  );
};
