
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic2, BookOpen } from "lucide-react";
import { Course } from "@/data/courseData";

interface CourseContentProps {
  course: Course;
}

const CourseContent = ({ course }: CourseContentProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Tabs defaultValue="lyrics" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid grid-cols-2 bg-black">
        <TabsTrigger value="lyrics" className="flex items-center gap-2">
          <Mic2 size={16} /> Paroles complètes
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex items-center gap-2">
          <BookOpen size={16} /> Notes de cours
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="lyrics" className="pt-4">
        <div className="bg-spotifyGray bg-opacity-30 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Paroles du cours</h3>
          <div className="space-y-6">
            {course.lyrics.map((lyric, index) => (
              <div 
                key={index} 
                className="pl-4 border-l-2 border-spotifyGray"
              >
                <p className="text-white">
                  {lyric.text}
                </p>
                <span className="text-xs text-spotifyLightGray">
                  {formatTime(lyric.time)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="notes" className="pt-4">
        <div className="bg-spotifyGray bg-opacity-30 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Notes de cours</h3>
          <div className="space-y-4">
            {course.notes.map((note, index) => (
              <p key={index} className="text-white">
                • {note}
              </p>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CourseContent;
