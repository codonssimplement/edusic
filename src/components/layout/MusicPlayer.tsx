
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, List, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { courseData } from "@/data/courseData";
import { useIsMobile } from "@/hooks/use-mobile";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentCourseId, setCurrentCourseId] = useState("1");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const currentCourse = courseData[currentCourseId as keyof typeof courseData];

  // Effect to simulate progress updating
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const courseIds = Object.keys(courseData);
    const currentIndex = courseIds.indexOf(currentCourseId);
    const nextIndex = (currentIndex + 1) % courseIds.length;
    setCurrentCourseId(courseIds[nextIndex]);
    setProgress(0);
  };

  const handlePrevTrack = () => {
    const courseIds = Object.keys(courseData);
    const currentIndex = courseIds.indexOf(currentCourseId);
    const prevIndex = (currentIndex - 1 + courseIds.length) % courseIds.length;
    setCurrentCourseId(courseIds[prevIndex]);
    setProgress(0);
  };

  const navigateToCourse = () => {
    navigate(`/player/${currentCourseId}`);
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-spotifyGray border-t border-gray-800 py-2 px-3 z-20">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center w-1/3"
            onClick={navigateToCourse}
          >
            <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden flex-shrink-0">
              <img 
                src={currentCourse.image} 
                alt="Couverture du cours" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="ml-2 truncate">
              <p className="text-xs font-medium text-white truncate max-w-[80px]">{currentCourse.title}</p>
              <p className="text-[10px] text-spotifyLightGray truncate">{currentCourse.subject}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center w-1/3">
            <button 
              className="mx-1 text-spotifyLightGray hover:text-white"
              onClick={handlePrevTrack}
            >
              <SkipBack size={16} />
            </button>
            <button 
              className="mx-2 bg-white rounded-full w-7 h-7 flex items-center justify-center hover:scale-105 transition-transform"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={14} className="text-black" /> : <Play size={14} className="text-black ml-0.5" />}
            </button>
            <button 
              className="mx-1 text-spotifyLightGray hover:text-white"
              onClick={handleNextTrack}
            >
              <SkipForward size={16} />
            </button>
          </div>
          
          <div className="flex items-center justify-end w-1/3">
            <div className="flex items-center gap-1 w-12">
              <Volume2 size={14} className="text-spotifyLightGray" />
              <Slider
                className="w-full"
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
          </div>
        </div>
        <div className="mt-1 flex items-center w-full gap-2">
          <span className="text-[10px] text-spotifyLightGray">
            {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}
          </span>
          <Slider 
            className="w-full"
            value={[progress]} 
            max={100}
            step={1}
            onValueChange={(value) => setProgress(value[0])}
          />
          <span className="text-[10px] text-spotifyLightGray">3:45</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotifyGray border-t border-gray-800 py-3 px-4 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/4">
          <div 
            className="w-14 h-14 bg-gray-700 rounded mr-3 flex-shrink-0 overflow-hidden cursor-pointer"
            onClick={navigateToCourse}
          >
            <img 
              src={currentCourse.image} 
              alt="Couverture du cours" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="truncate">
            <p className="text-sm font-medium text-white truncate">{currentCourse.title}</p>
            <p className="text-xs text-spotifyLightGray truncate">{currentCourse.subject} - {currentCourse.level}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center justify-center mb-2">
            <button 
              className="mx-2 text-spotifyLightGray hover:text-white"
              onClick={handlePrevTrack}
            >
              <SkipBack size={20} />
            </button>
            <button 
              className="mx-3 bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black ml-0.5" />}
            </button>
            <button 
              className="mx-2 text-spotifyLightGray hover:text-white"
              onClick={handleNextTrack}
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="flex items-center w-full max-w-lg gap-2">
            <span className="text-xs text-spotifyLightGray">
              {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}
            </span>
            <Slider 
              className="w-full"
              value={[progress]} 
              max={100}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
            />
            <span className="text-xs text-spotifyLightGray">3:45</span>
          </div>
        </div>
        
        <div className="flex items-center justify-end w-1/4 gap-3">
          <button className="text-spotifyLightGray hover:text-white">
            <List size={20} />
          </button>
          <div className="flex items-center gap-2 w-32">
            <Volume2 size={18} className="text-spotifyLightGray" />
            <Slider
              className="w-full"
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
