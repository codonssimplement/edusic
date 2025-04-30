
import { useState } from "react";
import { Heart, Share2, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Course } from "@/data/courseData";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseHeaderProps {
  course: Course;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const isMobile = useIsMobile();

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isLiked ? "Ce cours a été retiré de vos favoris" : "Ce cours a été ajouté à vos favoris"
    });
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 mb-6">
        <div className="w-full">
          <div className="relative aspect-square bg-spotifyGray rounded-md overflow-hidden shadow-lg max-w-[200px] mx-auto">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        <div className="w-full text-center">
          <div className="mb-3">
            <span className="text-eduGreen text-xs font-medium">COURS EN MUSIQUE</span>
            <h1 className="text-xl font-bold text-white mt-1">{course.title}</h1>
            <p className="text-spotifyLightGray text-sm mt-1">{course.subject} • {course.level}</p>
          </div>
          
          <p className="text-white text-xs mb-3">
            Par <span className="text-eduGreen">{course.teacher}</span> • {course.duration}
          </p>
          
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 rounded-full ${
                isLiked ? 'text-eduGreen border-eduGreen' : 'text-white border-gray-700'
              }`}
              onClick={toggleLike}
            >
              <Heart className={isLiked ? 'fill-eduGreen text-eduGreen' : ''} size={14} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 rounded-full text-white border-gray-700"
              onClick={() => {
                toast({
                  title: "Lien copié",
                  description: "Le lien du cours a été copié dans le presse-papier"
                });
              }}
            >
              <Share2 size={14} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 rounded-full text-white border-gray-700"
              onClick={() => {
                toast({
                  title: "Cours ajouté à la playlist",
                  description: "Ce cours a été ajouté à votre playlist"
                });
              }}
            >
              <ListMusic size={14} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="md:w-1/3 lg:w-1/4">
        <div className="relative aspect-square bg-spotifyGray rounded-md overflow-hidden shadow-lg">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      
      <div className="md:w-2/3 lg:w-3/4">
        <div className="mb-4">
          <span className="text-eduGreen text-sm font-medium">COURS EN MUSIQUE</span>
          <h1 className="text-3xl font-bold text-white mt-1">{course.title}</h1>
          <p className="text-spotifyLightGray mt-1">{course.subject} • {course.level}</p>
        </div>
        
        <p className="text-white text-sm mb-4">
          Par <span className="text-eduGreen">{course.teacher}</span> • {course.duration}
        </p>
        
        <div className="flex gap-4 mb-8">
          <Button
            variant="outline"
            className={`flex items-center gap-2 rounded-full ${
              isLiked ? 'text-eduGreen border-eduGreen' : 'text-white border-gray-700'
            }`}
            onClick={toggleLike}
          >
            <Heart className={isLiked ? 'fill-eduGreen text-eduGreen' : ''} size={18} />
            {isLiked ? 'Aimé' : 'Aimer'}
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full text-white border-gray-700"
            onClick={() => {
              toast({
                title: "Lien copié",
                description: "Le lien du cours a été copié dans le presse-papier"
              });
            }}
          >
            <Share2 size={18} />
            Partager
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full text-white border-gray-700"
            onClick={() => {
              toast({
                title: "Cours ajouté à la playlist",
                description: "Ce cours a été ajouté à votre playlist"
              });
            }}
          >
            <ListMusic size={18} />
            Ajouter à la playlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
