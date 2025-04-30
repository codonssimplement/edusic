
import { motion } from "framer-motion";
import { BookOpen, Music, TrendingUp } from "lucide-react";

const FeatureCards = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12"
    >
      <FeatureCard
        icon={<BookOpen />}
        title="Cours en musique"
        description="Apprenez en écoutant"
        gradient="from-purple-700/80 to-blue-500/80"
        bgImage="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000"
      />
      <FeatureCard
        icon={<Music />}
        title="Playlists éducatives"
        description="Organisez vos révisions"
        gradient="from-red-600/80 to-orange-500/80"
        bgImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000"
      />
      <FeatureCard
        icon={<TrendingUp />}
        title="Suivez vos progrès"
        description="Visualisez votre évolution"
        gradient="from-green-600/80 to-teal-500/80"
        bgImage="https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=1000"
      />
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, bgImage }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  bgImage: string;
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.03 }}
      className={`card-hover relative overflow-hidden rounded-xl flex items-center gap-3 bg-gradient-to-r ${gradient} p-6`}
    >
      <div className={`absolute inset-0 bg-[url('${bgImage}')] opacity-20 mix-blend-overlay`}></div>
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-center z-10">
        <div className="text-white">{icon}</div>
      </div>
      <div className="z-10">
        <span className="text-white font-medium block">{title}</span>
        <span className="text-white/70 text-sm">{description}</span>
      </div>
    </motion.div>
  );
};

export default FeatureCards;
