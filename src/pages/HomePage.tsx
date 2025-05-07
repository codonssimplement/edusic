import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { UserDashboard } from "@/components/home/authenticated/UserDashboard";
import GuestHero from "@/components/home/guest/GuestHero";
import CourseCarousel from "@/components/dashboard/CourseCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedTestimonials from "@/components/home/FeaturedTestimonials";
import StatsBar from "@/components/shared/StatsBar";
import PageTransition from "@/components/shared/PageTransition";
import FeaturedCourse from "@/components/home/FeaturedCourse";
import CallToAction from "@/components/home/CallToAction";
import { motion } from "framer-motion";

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();
  
  const recentCourses = [
    { id: "1", title: "Les équations différentielles en chanson", subject: "Mathématiques", level: "Terminale", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000" },
    { id: "2", title: "La guerre froide - Mélodie historique", subject: "Histoire", level: "Terminale", image: "https://images.unsplash.com/photo-1551406483-3731c5ab67a7?q=80&w=1000" },
    { id: "3", title: "Vocabulaire espagnol en rythme", subject: "Espagnol", level: "Seconde", image: "https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1000" },
    { id: "4", title: "Les réactions chimiques - Ballade scientifique", subject: "Physique-Chimie", level: "Première", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000" },
    { id: "5", title: "Phénomènes littéraires - Rap poétique", subject: "Français", level: "Première", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000" },
    { id: "6", title: "Histoire des arts - Chanson culturelle", subject: "Arts", level: "Seconde", image: "https://images.unsplash.com/photo-1499415479124-43c32433a620?q=80&w=1000" },
  ];

  const recommendedCourses = [
    { id: "7", title: "Les fonctions logarithmiques", subject: "Mathématiques", level: "Terminale", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000" },
    { id: "8", title: "Littérature du 19ème siècle", subject: "Français", level: "Première", image: "https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?q=80&w=1000" },
    { id: "9", title: "Thermodynamique - Sons et équations", subject: "Physique", level: "Terminale", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000" },
    { id: "10", title: "Vocabulaire anglais avancé", subject: "Anglais", level: "Première", image: "https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1000" },
    { id: "11", title: "Les organes du corps humain", subject: "SVT", level: "Seconde", image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000" },
  ];

  const popularCourses = [
    { id: "12", title: "Fonctions dérivées", subject: "Mathématiques", level: "Terminale", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000" },
    { id: "13", title: "Passé composé et imparfait", subject: "Français", level: "Tous niveaux", image: "https://images.unsplash.com/photo-1592845112115-301daab3d0aa?q=80&w=1000" },
    { id: "14", title: "La Première Guerre mondiale", subject: "Histoire", level: "Première", image: "https://images.unsplash.com/photo-1521289581990-a3774e01fdda?q=80&w=1000" },
    { id: "15", title: "Atomes et Molécules", subject: "Physique-Chimie", level: "Seconde", image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000" },
    { id: "16", title: "Théorème de Pythagore", subject: "Mathématiques", level: "Troisième", image: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?q=80&w=1000" },
  ];

  return (
    <PageTransition>
      <div className="pb-20  pt-16 md:pt-0">
        {isLoggedIn && user ? (
          <UserDashboard />
        ) : (
          <>
            <GuestHero />
            <HowItWorks />
            <StatsBar />
          </>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CourseCarousel 
            title="Derniers cours" 
            viewAllLink="/recent" 
            courses={recentCourses} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CourseCarousel 
            title="Recommandés pour vous" 
            viewAllLink="/recommended" 
            courses={recommendedCourses} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CourseCarousel 
            title="Les plus populaires" 
            viewAllLink="/popular" 
            courses={popularCourses} 
          />
        </motion.div>
        
        <FeaturedCourse />
        <FeaturedTestimonials />
        <CallToAction />
      </div>
    </PageTransition>
  );
};

export default HomePage;
