
import { Clock, Play, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const RecentListeningCard = () => {
  const isMobile = useIsMobile();
  
  // Données simulées pour les dernières écoutes
  const recentListenings = [
    { id: "1", title: "Les équations différentielles", subject: "Mathématiques", time: "Hier" },
    { id: "2", title: "La guerre froide", subject: "Histoire", time: "Il y a 2 jours" },
    { id: "3", title: "Le champ magnétique", subject: "Physique", time: "Il y a 3 jours" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-spotifyGray border-none shadow-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-400"></div>
        <CardHeader className={`${isMobile ? 'p-3 pb-1' : 'pb-2'}`}>
          <CardTitle className={`text-white ${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-2`}>
            <Music className="text-eduGreen" size={isMobile ? 16 : 20} />
            Dernières écoutes
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? 'p-3' : ''}>
          <div className="space-y-3">
            {recentListenings.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  to={`/player/${item.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-black/30 transition-colors group"
                >
                  <div className="flex items-center">
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-black/30 rounded-md flex items-center justify-center mr-3 group-hover:bg-eduGreen transition-colors relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                      <Play size={isMobile ? 14 : 18} className="text-white ml-1" />
                    </div>
                    <div>
                      <h4 className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} font-medium line-clamp-1`}>{item.title}</h4>
                      <p className={`text-spotifyLightGray ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{item.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-spotifyLightGray text-xs">
                    <Clock size={isMobile ? 12 : 14} className="mr-1" />
                    <span className={isMobile ? 'text-[10px]' : ''}>{item.time}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentListeningCard;
