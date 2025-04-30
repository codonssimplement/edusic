
import { useParams } from "react-router-dom";
import { courseData } from "@/data/courseData";
import CourseHeader from "@/components/course/CourseHeader";
import LyricsPlayer from "@/components/course/LyricsPlayer";
import CourseContent from "@/components/course/CourseContent";
import CourseComments from "@/components/course/CourseComments";
import CourseInsights from "@/components/course/CourseInsights";
import PageTransition from "@/components/shared/PageTransition";

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  
  // Get course data based on courseId
  const course = courseData[courseId as keyof typeof courseData] || courseData["1"];

  return (
    <PageTransition>
      <div className="flex flex-col h-full min-h-[calc(100vh-6rem)]">
        <CourseHeader course={course} />
        <div className="animate-fade-in duration-500">
          <LyricsPlayer course={course} />
        </div>
        <CourseInsights course={course} />
        <CourseContent course={course} />
        <div className="mt-8 animate-fade-in duration-500 delay-300">
          <CourseComments course={course} />
        </div>
      </div>
    </PageTransition>
  );
};

export default CoursePlayerPage;
