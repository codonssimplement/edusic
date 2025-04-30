
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Rewind, FastForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioSrc: string;
  onTimeUpdate: (time: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded?: () => void;
}

const AudioPlayer = ({ audioSrc, onTimeUpdate, onPlay, onPause, onEnded }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate(audio.currentTime);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
        if (onEnded) onEnded();
      }
    };

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onEnded, isRepeat]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      onPause();
    } else {
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
      });
      onPlay();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  // Progress percentage for visual indicator
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <TooltipProvider>
      <audio ref={audioRef} src={audioSrc} loop={isRepeat}></audio>
      
      <div className="flex flex-col items-center bg-black/20 rounded-lg p-4 border border-gray-800">
        {/* Progress bar with visual indicator */}
        <div className="w-full flex items-center gap-3 mb-4">
          <span className="text-xs text-spotifyLightGray w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative w-full">
            <Slider 
              className="w-full" 
              value={[currentTime]} 
              max={duration || 100} 
              step={0.1}
              onValueChange={handleSeek}
            />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-eduGreen rounded-full transform -translate-y-1/2 pointer-events-none" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-spotifyLightGray w-12">
            {formatTime(duration)}
          </span>
        </div>
        
        {/* Player controls with improved interaction */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-spotifyLightGray hover:text-white rounded-full h-8 w-8 p-0"
                onClick={toggleRepeat}
              >
                <Repeat size={18} className={isRepeat ? "text-eduGreen" : ""} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRepeat ? "Désactiver la répétition" : "Activer la répétition"}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-spotifyLightGray hover:text-white rounded-full h-10 w-10 p-0"
                onClick={() => skipTime(-10)}
              >
                <Rewind size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reculer de 10 secondes</p>
            </TooltipContent>
          </Tooltip>
          
          <Button 
            size="icon"
            variant="default"
            className="bg-white hover:bg-white/90 rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform p-0"
            onClick={togglePlay}
          >
            {isPlaying ? 
              <Pause size={24} className="text-black" /> : 
              <Play size={24} className="text-black ml-0.5" />
            }
          </Button>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-spotifyLightGray hover:text-white rounded-full h-10 w-10 p-0"
                onClick={() => skipTime(10)}
              >
                <FastForward size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Avancer de 10 secondes</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-spotifyLightGray hover:text-white rounded-full h-8 w-8 p-0"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMuted ? "Activer le son" : "Couper le son"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Volume slider with improved visuals */}
        <div className="flex items-center gap-2">
          <Slider
            className="w-32"
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
          />
          <span className="text-xs text-spotifyLightGray">
            {volume}%
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AudioPlayer;
