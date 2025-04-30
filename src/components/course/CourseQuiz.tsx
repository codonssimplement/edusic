
import { useState } from "react";
import { Course } from "@/data/courseData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { CircularProgress } from "@/components/dashboard/CircularProgress";

interface CourseQuizProps {
  course: Course;
  onComplete: () => void;
}

// Sample quiz questions for each course
const getQuizQuestions = (course: Course) => {
  // In a real app, you would fetch these from an API or include them in the course data
  switch (course.id) {
    case "1": // Mathematics
      return [
        {
          question: "Quelle propriété caractérise les fonctions exponentielles ?",
          options: [
            "Elles sont toujours décroissantes",
            "Leur dérivée est la fonction elle-même",
            "Elles sont périodiques",
            "Elles passent toujours par le point (0,0)"
          ],
          correctAnswer: 1
        },
        {
          question: "Qu'est-ce qu'une équation différentielle ?",
          options: [
            "Une équation contenant uniquement des dérivées",
            "Une équation contenant une fonction inconnue et ses dérivées",
            "Une équation qui se résout uniquement par différence",
            "Une équation à deux variables"
          ],
          correctAnswer: 1
        },
        {
          question: "Dans quels domaines les équations différentielles sont-elles utilisées ?",
          options: [
            "Uniquement en mathématiques",
            "Uniquement en physique",
            "En physique, biologie et économie",
            "Uniquement en informatique"
          ],
          correctAnswer: 2
        }
      ];
    case "2": // History
      return [
        {
          question: "Quand a commencé la guerre froide ?",
          options: [
            "1939",
            "1945",
            "1947",
            "1950"
          ],
          correctAnswer: 2
        },
        {
          question: "Quels étaient les deux blocs opposés pendant la guerre froide ?",
          options: [
            "France et Allemagne",
            "États-Unis et Chine",
            "Est communiste et Ouest capitaliste",
            "OTAN et Pacte de Varsovie"
          ],
          correctAnswer: 2
        },
        {
          question: "Quand le mur de Berlin est-il tombé ?",
          options: [
            "1985",
            "1989",
            "1991",
            "1993"
          ],
          correctAnswer: 1
        }
      ];
    case "3": // Spanish
      return [
        {
          question: "Comment dit-on 'bonjour' en espagnol ?",
          options: [
            "Ciao",
            "Hello",
            "Buenos días",
            "Guten Tag"
          ],
          correctAnswer: 2
        },
        {
          question: "Quelle est la traduction de 'Je m'appelle' ?",
          options: [
            "Me gusta",
            "Me llamo",
            "Yo soy",
            "Mi nombre"
          ],
          correctAnswer: 1
        },
        {
          question: "Comment dit-on 'étudiant' en espagnol ?",
          options: [
            "Estudiante",
            "Profesor",
            "Escuela",
            "Estudiar"
          ],
          correctAnswer: 0
        }
      ];
    default:
      return [
        {
          question: "Question par défaut 1",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 0
        },
        {
          question: "Question par défaut 2",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 1
        },
        {
          question: "Question par défaut 3",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 2
        }
      ];
  }
};

const CourseQuiz = ({ course, onComplete }: CourseQuizProps) => {
  const questions = getQuizQuestions(course);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };
  
  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    setHasAnswered(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };
  
  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  if (showResults) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-spotifyGray bg-opacity-30 p-6 rounded-lg mb-8">
        <Card className="bg-black/30 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Quiz terminé !</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-6">
              <CircularProgress value={getScorePercentage()} />
            </div>
            <p className="text-xl text-white mb-4">
              Votre score : {score}/{questions.length}
            </p>
            <div className="text-spotifyLightGray mb-8">
              {getScorePercentage() >= 70 
                ? "Félicitations ! Vous avez bien compris ce cours."
                : "Continuez à pratiquer pour améliorer votre compréhension."}
            </div>
            <div className="w-full space-y-4">
              <h3 className="text-white font-semibold">Résumé des réponses :</h3>
              {questions.map((q, index) => (
                <div key={index} className="flex items-start bg-black/20 p-3 rounded-lg">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {index < currentQuestionIndex || showResults 
                      ? (index === currentQuestion.correctAnswer 
                          ? <CheckCircle className="text-green-500" size={20} />
                          : <XCircle className="text-red-500" size={20} />)
                      : (index + 1)}
                  </div>
                  <div>
                    <p className="text-white text-sm">{q.question}</p>
                    <p className="text-eduGreen text-xs">
                      Réponse correcte : {q.options[q.correctAnswer]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="bg-eduGreen hover:bg-eduGreen/90 text-white"
              onClick={onComplete}
            >
              Retour au cours
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-spotifyGray bg-opacity-30 p-6 rounded-lg mb-8">
      <Card className="bg-black/30 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">
              Quiz: {course.title}
            </CardTitle>
            <span className="text-sm text-spotifyLightGray">
              Question {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center pb-4">
            <h2 className="text-xl text-white mb-2">{currentQuestion.question}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`justify-start text-left p-4 h-auto border border-gray-700 ${
                  selectedAnswer === index 
                    ? hasAnswered 
                      ? index === currentQuestion.correctAnswer 
                        ? 'bg-green-500/20 border-green-500 text-white' 
                        : 'bg-red-500/20 border-red-500 text-white'
                      : 'bg-eduGreen/10 border-eduGreen text-white'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => handleSelectAnswer(index)}
                disabled={hasAnswered}
              >
                <div className="flex items-center">
                  {hasAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="text-green-500 mr-2" size={20} />
                  )}
                  {hasAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="text-red-500 mr-2" size={20} />
                  )}
                  {option}
                </div>
              </Button>
            ))}
          </div>
          
          {hasAnswered && (
            <div className={`p-4 rounded-md ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-500/10 border border-green-500' 
                : 'bg-red-500/10 border border-red-500'
            }`}>
              <p className="text-white">
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? 'Correct !' 
                  : `Incorrect. La bonne réponse est : ${currentQuestion.options[currentQuestion.correctAnswer]}`}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-spotifyLightGray">
            Score actuel: {score}/{currentQuestionIndex + (hasAnswered ? 1 : 0)}
          </div>
          <div>
            {!hasAnswered ? (
              <Button
                className="bg-eduGreen hover:bg-eduGreen/90 text-white"
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
              >
                Vérifier
              </Button>
            ) : (
              <Button
                className="bg-eduGreen hover:bg-eduGreen/90 text-white flex items-center gap-2"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseQuiz;
