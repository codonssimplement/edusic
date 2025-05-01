import React, { useState } from "react";
import { BookOpen, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

const ExercisePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Quelle est la capitale de la France ?",
      options: ["Lyon", "Paris", "Marseille", "Bordeaux"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Combien de départements compte la France ?",
      options: ["96", "101", "95", "88"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "En quelle année la Seconde Guerre mondiale a-t-elle commencé ?",
      options: ["1935", "1939", "1941", "1943"],
      correctAnswer: 1
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <BookOpen className="text-eduPurple" /> Exercices
      </h1>

      {!showResult ? (
        <Card className="bg-spotifyGray border-gray-800">
          <CardHeader>
            <CardTitle className="text-eduPurple/50">
              Question {currentQuestionIndex + 1} / {quizQuestions.length}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <h2 className="text-xl text-white">
                {quizQuestions[currentQuestionIndex].question}
              </h2>
              
              <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-4">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`text-black hover:text-white border-gray-700 hover:bg-black/60 ${
                      selectedAnswer === index 
                        ? selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer 
                          ? 'bg-eduPurple/20 border-eduPurple text-white'
                          : 'bg-eduPurple/20 border-eduPurple text-white'
                        : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-black/70 mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </Button>
                ))}
              </div>
              
              <Button 
                className="w-full bg-eduPurple hover:bg-eduPurple/90 text-white"
                disabled={selectedAnswer === null}
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex === quizQuestions.length - 1 
                  ? "Terminer" 
                  : "Question suivante"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-spotifyGray border-gray-800 text-center">
          <CardContent className="space-y-6 p-8">
            <h2 className="text-2xl font-bold text-white">Quiz terminé !</h2>
            <div className="flex justify-center">
              {score >= quizQuestions.length / 2 ? (
                <CheckCircle size={64} className="text-purple-500" />
              ) : (
                <XCircle size={64} className="text-red-500" />
              )}
            </div>
            <p className="text-xl text-white">
              Votre score : {score} / {quizQuestions.length}
            </p>
            
            <div className="text-spotifyLightGray">
              {score >= quizQuestions.length / 2
                ? "Félicitations ! Vous avez bien révisé."
                : "Continuez à travailler, vous pouvez vous améliorer."}
            </div>
            
            <Button 
              className="mt-4 bg-eduPurple hover:bg-eduPurple/90 text-white"
              onClick={restartQuiz}
            >
              Recommencer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExercisePage;
