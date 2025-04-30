
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Course {
  id: string;
  title: string;
  subject: string;
  level: string;
  image: string;
}

interface CourseCarouselProps {
  title: string;
  viewAllLink: string;
  courses: Course[];
}

const CourseCarousel = ({ title, viewAllLink, courses }: CourseCarouselProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>{title}</h2>
        <Link to={viewAllLink}>
          <Button variant="link" className="text-eduGreen hover:text-eduGreen/80 flex items-center gap-1 -mr-2">
            Voir tout
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'}`}>
        {courses.map((course, index) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group"
          >
            <Link to={`/player/${course.id}`} className="block">
              <div className="relative overflow-hidden rounded-md bg-spotifyGray mb-2 aspect-square">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute bottom-2 right-2 bg-eduGreen rounded-full p-2 scale-0 group-hover:scale-100 transition-transform origin-bottom-right z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <h3 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white line-clamp-1 group-hover:text-eduGreen transition-colors`}>{course.title}</h3>
              <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-spotifyLightGray`}>{course.subject} • {course.level}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseCarousel;
