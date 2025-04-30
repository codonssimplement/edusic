
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book, Clock, AlertCircle, ChevronLeft, ChevronRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  id: string;
  title: string;
  subject: string;
  level: string;
  timeEstimate: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

// Sample exercise data
const exerciseData: Record<string, Exercise> = {
  "math-1": {
    id: "math-1",
    title: "Dérivées et primitives",
    subject: "Mathématiques",
    level: "Terminale",
    timeEstimate: "15 min",
    questions: [
      {
        id: 1,
        question: "Quelle est la dérivée de f(x) = x² ?",
        options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
        correctAnswer: 1,
        explanation: "La dérivée de x² est 2x car on applique la formule de dérivation des puissances : d/dx(x^n) = n*x^(n-1)"
      },
      {
        id: 2,
        question: "Quelle est la primitive de f(x) = 2x ?",
        options: ["F(x) = x² + C", "F(x) = x + C", "F(x) = 2x² + C", "F(x) = x²/2 + C"],
        correctAnswer: 0,
        explanation: "La primitive de 2x est x² + C car la dérivée de x² est 2x."
      },
      {
        id: 3,
        question: "Quelle est la dérivée de f(x) = sin(x) ?",
        options: ["f'(x) = cos(x)", "f'(x) = -sin(x)", "f'(x) = -cos(x)", "f'(x) = tan(x)"],
        correctAnswer: 0,
        explanation: "La dérivée de sin(x) est cos(x)."
      },
      {
        id: 4,
        question: "Quelle est la dérivée de f(x) = e^x ?",
        options: ["f'(x) = xe^(x-1)", "f'(x) = e^x", "f'(x) = xe^x", "f'(x) = e^x/x"],
        correctAnswer: 1,
        explanation: "La fonction exponentielle e^x est sa propre dérivée."
      },
      {
        id: 5,
        question: "Quelle est la primitive de f(x) = 1/x ?",
        options: ["F(x) = ln|x| + C", "F(x) = 1/x + C", "F(x) = x/2 + C", "F(x) = e^x + C"],
        correctAnswer: 0,
        explanation: "La primitive de 1/x est ln|x| + C car la dérivée de ln|x| est 1/x."
      }
    ]
  }
};

const ExerciseDetailPage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize exercise data
  useEffect(() => {
    if (exerciseId && exerciseData[exerciseId]) {
      setExercise(exerciseData[exerciseId]);
      // Initialize answers array with null values
      setAnswers(new Array(exerciseData[exerciseId].questions.length).fill(null));
      // Initialize timer (15 minutes in seconds)
      setTimeLeft(15 * 60);
      setTimerActive(true);
    } else {
      toast({
        title: "Exercice non trouvé",
        description: "Cet exercice n'existe pas ou a été supprimé.",
        variant: "destructive"
      });
      navigate("/exercises");
    }
  }, [exerciseId, navigate, toast]);

  // Timer function
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      // Time's up - auto submit
      setShowResults(true);
      setTimerActive(false);
      toast({
        title: "Temps écoulé !",
        description: "Votre exercice a été automatiquement soumis.",
        variant: "destructive"
      });
    }
    return () => clearInterval(timer);
  }, [timeLeft, timerActive, toast]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || !exercise) return;
    
    setHasAnswered(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (selectedAnswer === exercise.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!exercise) return;
    
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setHasAnswered(answers[currentQuestionIndex + 1] !== null);
    } else {
      setShowResults(true);
      setTimerActive(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
      setHasAnswered(answers[currentQuestionIndex - 1] !== null);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setAnswers(new Array(exercise?.questions.length || 0).fill(null));
    setShowResults(false);
    setTimeLeft(15 * 60);
    setTimerActive(true);
  };

  const handleFinish = () => {
    navigate("/exercises");
  };

  if (!exercise) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Chargement de l'exercice...</p>
      </div>
    );
  }

  const currentQuestion = exercise.questions[currentQuestionIndex];
  const scorePercentage = Math.round((score / exercise.questions.length) * 100);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="text-white border-gray-700"
            onClick={() => navigate("/exercises")}
          >
            <ChevronLeft className="mr-2" size={16} />
            Retour aux exercices
          </Button>
        </div>
        
        <Card className="bg-spotifyGray border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Résultats - {exercise.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-6">
              <CircularProgress value={scorePercentage} />
            </div>
            <p className="text-xl text-white mb-4">
              Votre score : {score}/{exercise.questions.length}
            </p>
            <div className="text-spotifyLightGray mb-8">
              {scorePercentage >= 70 
                ? "Félicitations ! Vous maîtrisez bien ce sujet."
                : "Continuez à pratiquer pour vous améliorer."}
            </div>
            <div className="w-full space-y-6">
              <h3 className="text-white font-semibold text-lg">Détail des réponses :</h3>
              {exercise.questions.map((q, index) => (
                <div key={index} className="bg-black/30 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <div className="flex-shrink-0 mr-3 mt-1 flex justify-center items-center w-6 h-6 rounded-full bg-black/50 text-white text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{q.question}</p>
                    </div>
                  </div>
                  
                  <div className="ml-9 mt-3">
                    <p className="text-eduPurple mb-1">
                      Réponse correcte : {q.options[q.correctAnswer]}
                    </p>
                    {answers[index] !== null && answers[index] !== q.correctAnswer && (
                      <p className="text-red-400 mb-2">
                        Votre réponse : {q.options[answers[index] as number]}
                      </p>
                    )}
                    <p className="text-spotifyLightGray text-sm mt-2 bg-black/20 p-2 rounded">
                      <span className="font-medium text-white">Explication : </span>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="border-eduPurple text-eduPurple hover:bg-eduPurple/10"
              onClick={handleRetry}
            >
              Réessayer
            </Button>
            <Button
              className="bg-eduPurple hover:bg-eduPurple/90 text-white"
              onClick={handleFinish}
            >
              Terminer
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="outline" 
          className="text-white border-gray-700"
          onClick={() => navigate("/exercises")}
        >
          <ChevronLeft className="mr-2" size={16} />
          Retour aux exercices
        </Button>
        
        <div className="flex items-center gap-4">
          <span className="text-spotifyLightGray flex items-center">
            <Book size={16} className="mr-1" />
            {exercise.subject}
          </span>
          <span className="text-spotifyLightGray flex items-center">
            <AlertCircle size={16} className="mr-1" />
            {exercise.level}
          </span>
          <span className={`flex items-center ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-spotifyLightGray'}`}>
            <Timer size={16} className="mr-1" />
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <Card className="bg-spotifyGray border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">
              {exercise.title}
            </CardTitle>
            <span className="text-sm text-spotifyLightGray bg-black/30 px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1}/{exercise.questions.length}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="border-b border-gray-700 pb-4 mb-4">
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
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-black/50 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
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
              <p className="text-white font-medium mb-2">
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? 'Correct !' 
                  : `Incorrect. La bonne réponse est : ${currentQuestion.options[currentQuestion.correctAnswer]}`}
              </p>
              <p className="text-spotifyLightGray text-sm">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="text-white border-gray-700"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="mr-1" size={16} />
            Précédent
          </Button>
          
          <div>
            {!hasAnswered ? (
              <Button
                className="bg-eduPurple hover:bg-eduPurple/90 text-white"
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
              >
                Vérifier
              </Button>
            ) : (
              <Button
                className="bg-eduPurple hover:bg-eduPurple/90 text-white flex items-center"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < exercise.questions.length - 1 ? 'Suivant' : 'Voir les résultats'}
                <ChevronRight className="ml-1" size={16} />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExerciseDetailPage;
