
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, ChevronLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "./AudioPlayer";
import { Course } from "@/data/courseData";
import CourseQuiz from "./CourseQuiz";

interface LyricsPlayerProps {
  course: Course;
}

const LyricsPlayer = ({ course }: LyricsPlayerProps) => {
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const { toast } = useToast();
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset state when course changes
  useEffect(() => {
    setActiveLyricIndex(0);
    setIsCompleted(false);
    setShowQuiz(false);
    setAudioEnded(false);
  }, [course.id]);
  
  // Scroll active lyric into view with improved smoothness
  useEffect(() => {
    if (lyricsContainerRef.current) {
      const activeElement = lyricsContainerRef.current.querySelector(`[data-index="${activeLyricIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [activeLyricIndex]);
  
  const handleTimeUpdate = (currentTime: number) => {
    // Find the active lyric based on current time
    const newActiveLyricIndex = course.lyrics.findIndex((lyric, index, array) => {
      const nextTime = index < array.length - 1 ? array[index + 1].time : Infinity;
      return currentTime >= lyric.time && currentTime < nextTime;
    });
    
    if (newActiveLyricIndex !== -1 && newActiveLyricIndex !== activeLyricIndex) {
      setActiveLyricIndex(newActiveLyricIndex);
    }
  };

  const handleMarkAsCompleted = () => {
    setIsCompleted(true);
    toast({
      title: "Cours terminé !",
      description: "Ce cours a été marqué comme terminé et ajouté à votre historique.",
    });
  };

  const handleAudioEnded = () => {
    setAudioEnded(true);
    if (!isCompleted) {
      handleMarkAsCompleted();
    }
    
    // Show quiz after a short delay
    setTimeout(() => {
      setShowQuiz(true);
    }, 1000);
  };

  const handleQuizCompleted = () => {
    setShowQuiz(false);
    toast({
      title: "Quiz terminé !",
      description: "Vous avez complété le quiz associé à ce cours.",
      variant: "default",
    });
  };

  if (showQuiz) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setShowQuiz(false)} 
          className="mb-4 text-white hover:text-eduGreen flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Retour au cours
        </Button>
        <CourseQuiz course={course} onComplete={handleQuizCompleted} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-spotifyGray bg-opacity-30 p-6 rounded-lg mb-8 shadow-lg border border-gray-800">
      {/* Course title reminder */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg text-white font-medium flex items-center gap-2">
          <Music size={18} className="text-eduGreen" />
          {course.title}
        </h3>
        {isCompleted && (
          <div className="flex items-center gap-1 text-xs bg-eduGreen/20 text-eduGreen px-2 py-1 rounded-full">
            <CheckCircle size={14} />
            <span>Terminé</span>
          </div>
        )}
      </div>
      
      {/* Large Lyrics Display with improved styling */}
      <div 
        ref={lyricsContainerRef}
        className="mb-8 text-center py-8 px-4 bg-gradient-to-b from-black/40 to-black/10 rounded-lg overflow-hidden h-[250px] flex items-center justify-center shadow-inner"
      >
        <div className="flex flex-col items-center justify-center w-full overflow-y-auto h-full scrollbar-none">
          {course.lyrics.map((lyric, index) => (
            <div 
              key={index}
              data-index={index}
              className={`text-center py-2 transition-all duration-500 transform ${
                index === activeLyricIndex 
                  ? 'text-eduGreen text-3xl font-bold scale-110 opacity-100' 
                  : index === activeLyricIndex - 1 || index === activeLyricIndex + 1
                    ? 'text-white text-xl scale-100 opacity-80'
                    : index === activeLyricIndex - 2 || index === activeLyricIndex + 2
                      ? 'text-gray-400 text-lg scale-95 opacity-60'
                      : 'text-gray-600 text-base scale-90 opacity-40'
              }`}
            >
              {lyric.text}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mark as Completed Button */}
      <div className="flex justify-center mb-4">
        <Button 
          variant="outline" 
          className={`flex items-center gap-2 transition-all duration-300 ${
            isCompleted ? 'bg-eduGreen/10 text-eduGreen border-eduGreen' : 'text-white border-gray-700 hover:border-eduGreen hover:text-eduGreen'
          }`}
          onClick={handleMarkAsCompleted}
          disabled={isCompleted}
        >
          <CheckCircle className={isCompleted ? 'fill-eduGreen text-white' : ''} size={18} />
          {isCompleted ? 'Cours terminé' : 'Marquer comme terminé'}
        </Button>
      </div>
      
      {/* Player Controls */}
      <AudioPlayer 
        audioSrc={course.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {}}
        onPause={() => {}}
        onEnded={handleAudioEnded}
      />
      
      {/* Quiz prompt when audio has ended */}
      {audioEnded && !showQuiz && (
        <div className="mt-6 text-center p-4 bg-black/20 rounded-lg border border-gray-800 animate-fade-in">
          <p className="text-white mb-2">Vous avez terminé ce cours !</p>
          <Button 
            className="bg-eduGreen hover:bg-eduGreen/90 text-white"
            onClick={() => setShowQuiz(true)}
          >
            Commencer le quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default LyricsPlayer;
