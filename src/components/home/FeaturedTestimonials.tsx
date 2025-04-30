
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "En un mois d'utilisation, j'ai gagné 3 points de moyenne en mathématiques ! La musique rend tout plus facile à retenir.",
    name: "Emma, 17 ans",
    subject: "Terminale S",
    stars: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
  },
  {
    quote: "Je détestais l'Histoire jusqu'à ce que je découvre ces cours en musique. Maintenant je me souviens des dates sans effort !",
    name: "Thomas, 16 ans",
    subject: "Première",
    stars: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000"
  },
  {
    quote: "Mes parents n'en reviennent pas de mes progrès en espagnol. Merci EduSic pour cette approche révolutionnaire !",
    name: "Léa, 15 ans",
    subject: "Seconde",
    stars: 5,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000"
  }
];

const FeaturedTestimonials = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Ce que disent nos élèves</h2>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="fill-eduGreen text-eduGreen" size={20} />
            ))}
            <span className="text-white ml-2 font-medium">4.9/5 basé sur 2,483 avis</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden hover:border-eduGreen/30 transition-colors"
            >
              <Quote className="absolute -top-2 -left-2 text-eduGreen/10" size={80} />
              <div className="relative z-10">
                <p className="text-white italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-eduGreen">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-spotifyLightGray text-sm">{testimonial.subject}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonials;
