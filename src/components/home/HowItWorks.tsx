
import { Music, BookOpen, BrainCircuit, Award } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-spotifyGray/30 to-transparent rounded-lg">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Comment ça marche ?</h2>
        <p className="text-spotifyLightGray text-center max-w-2xl mx-auto mb-12">
          Apprends comme t’écoutes ta musique préférée.
          Avec EduSic, tes cours deviennent des sons qui restent en tête.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-eduPurple/20 flex items-center justify-center mb-4">
              <Music className="text-eduPurple" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">1. Choisis ton flow </h3>
            <p className="text-spotifyLightGray">Histoire, Géographie, PHILO… trouve ta leçon chantée par ton artiste préféré. Tout est calé sur ton programme.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-eduPurple/20 flex items-center justify-center mb-4">
              <BookOpen className="text-eduPurple" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">2. Lance et kiffe</h3>
            <p className="text-spotifyLightGray">Appuie sur play, les paroles s’affichent en rythme. Tu captes les infos sans t’en rendre compte.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-eduPurple/20 flex items-center justify-center mb-4">
              <BrainCircuit className="text-eduPurple" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">3. Mémorise </h3>
            <p className="text-spotifyLightGray">Naturellement, ton cerveau retient tout. La musique booste ta mémoire. T’écoutes, tu retiens, c’est naturel.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-eduPurple/20 flex items-center justify-center mb-4">
              <Award className="text-eduPurple" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">4. Teste-toi </h3>
            <p className="text-spotifyLightGray">En mode chill, un petit quiz pour voir ce que t’as capté. Pas de pression, juste des wins à débloquer.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-black/30 border border-eduPurple/30 text-white">
            <span className="text-eduPurple font-medium">C'EST PROUVÉ</span> : Apprendre en musique, c’est jusqu’à 4x plus efficace que relire tes cahiers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
