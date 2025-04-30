
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Flag, Trash } from "lucide-react";
import { Course } from "@/data/courseData";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  userHasLiked: boolean;
}

interface CourseCommentsProps {
  course: Course;
}

const CourseComments = ({ course }: CourseCommentsProps) => {
  const { toast } = useToast();
  const { isLoggedIn, user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "user1",
      username: "Sophie Martin",
      avatar: "",
      content: "J'ai adoré ce cours ! La méthode d'apprentissage avec la musique est vraiment efficace.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      likes: 5,
      userHasLiked: false
    },
    {
      id: "2",
      userId: "user2",
      username: "Thomas Dubois",
      avatar: "",
      content: "Est-ce que quelqu'un pourrait m'expliquer la partie sur les équations différentielles ? J'ai eu du mal à suivre.",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      likes: 2,
      userHasLiked: false
    }
  ]);

  const handleComment = () => {
    if (!commentText.trim()) return;
    
    // In a real app, you would send this to an API
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.email || "guest", // Using email as a unique identifier since there's no id
      username: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "Utilisateur", // Using firstName and lastName from UserProfile
      avatar: "", // UserProfile doesn't have avatar, so using empty string
      content: commentText,
      timestamp: new Date(),
      likes: 0,
      userHasLiked: false
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
    
    toast({
      title: "Commentaire publié",
      description: "Votre commentaire a été ajouté avec succès",
    });
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newLikeState = !comment.userHasLiked;
        return {
          ...comment,
          likes: newLikeState ? comment.likes + 1 : comment.likes - 1,
          userHasLiked: newLikeState
        };
      }
      return comment;
    }));
  };

  const handleDelete = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    toast({
      title: "Commentaire supprimé",
      description: "Votre commentaire a été supprimé",
    });
  };

  const handleReport = (commentId: string) => {
    toast({
      title: "Commentaire signalé",
      description: "Merci pour votre signalement. Notre équipe va examiner ce commentaire.",
      variant: "destructive"
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} secondes`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} heures`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} jours`;
    
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-spotifyGray bg-opacity-30 p-6 rounded-lg mb-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-eduGreen" size={24} />
        <h2 className="text-xl text-white font-bold">Commentaires ({comments.length})</h2>
      </div>
      
      {isLoggedIn ? (
        <div className="mb-6">
          <Textarea
            placeholder="Partagez vos pensées sur ce cours..."
            className="bg-black/30 border-gray-700 text-white resize-none mb-2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleComment}
              className="bg-eduGreen hover:bg-eduGreen/90 text-white"
              disabled={!commentText.trim()}
            >
              Publier
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-black/20 p-4 rounded-md mb-6 text-center">
          <p className="text-white mb-2">Connectez-vous pour participer à la discussion</p>
          <Button variant="outline" className="text-eduGreen border-eduGreen hover:bg-eduGreen/10">
            Se connecter
          </Button>
        </div>
      )}
      
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-black/20 rounded-lg p-4 border border-gray-800 animate-fade-in">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border border-gray-700">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="bg-eduGreen/20 text-eduGreen">
                  {comment.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-white">{comment.username}</p>
                    <p className="text-xs text-spotifyLightGray">{formatDate(comment.timestamp)}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {comment.userId === (user?.email || "guest") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500 text-gray-400"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-yellow-500/10 hover:text-yellow-500 text-gray-400"
                      onClick={() => handleReport(comment.id)}
                    >
                      <Flag size={16} />
                    </Button>
                  </div>
                </div>
                
                <p className="mt-2 text-white break-words">{comment.content}</p>
                
                <div className="mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 text-xs px-2 py-1 h-auto ${
                      comment.userHasLiked 
                        ? 'text-eduGreen' 
                        : 'text-spotifyLightGray hover:text-white'
                    }`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp size={14} className={comment.userHasLiked ? 'fill-eduGreen' : ''} />
                    <span>{comment.likes}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-spotifyLightGray">Soyez le premier à commenter ce cours !</p>
        </div>
      )}
    </div>
  );
};

export default CourseComments;
