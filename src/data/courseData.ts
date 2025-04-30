
// Sample course data
export const courseData = {
  "1": {
    id: "1",
    title: "Les équations différentielles en chanson",
    subject: "Mathématiques",
    level: "Terminale",
    teacher: "Prof. Sophie Martin",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000",
    audioSrc: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3", // Sample audio
    lyrics: [
      { time: 0, text: "Quand on dérive une fonction exponentielle..." },
      { time: 5, text: "On garde cette même exponentielle..." },
      { time: 10, text: "C'est une propriété tellement essentielle..." },
      { time: 15, text: "Pour résoudre les équations différentielles..." },
      { time: 20, text: "Les solutions s'écrivent sous forme..." },
      { time: 25, text: "D'une expression qu'on transforme..." },
      { time: 30, text: "En cherchant la solution particulière..." },
      { time: 35, text: "Et la solution est alors entière..." },
    ],
    notes: [
      "Les équations différentielles sont des équations qui mettent en jeu une fonction inconnue et ses dérivées.",
      "Elles apparaissent dans de nombreux domaines: physique, biologie, économie...",
      "Pour une équation du premier ordre y' + a(x)y = b(x), on cherche d'abord la solution de l'équation homogène.",
      "Puis on détermine une solution particulière de l'équation complète.",
      "La solution générale est la somme de la solution homogène et de la solution particulière."
    ],
    completed: false
  },
  "2": {
    id: "2",
    title: "La guerre froide - Mélodie historique",
    subject: "Histoire",
    level: "Terminale",
    teacher: "Prof. Michel Dupont",
    duration: "4:15",
    image: "https://images.unsplash.com/photo-1551406483-3731c5ab67a7?q=80&w=1000",
    audioSrc: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
    lyrics: [
      { time: 0, text: "Après la seconde guerre mondiale..." },
      { time: 4, text: "Deux blocs s'affrontent sans se battre..." },
      { time: 8, text: "L'Est communiste sous Staline..." },
      { time: 12, text: "L'Ouest capitaliste avec Truman..." },
      { time: 16, text: "Berlin devient le symbole..." },
      { time: 20, text: "D'un monde divisé, d'un contrôle..." },
      { time: 24, text: "La course aux armements s'intensifie..." },
      { time: 28, text: "Jusqu'à la chute du mur, la fin d'une ère..." },
    ],
    notes: [
      "La guerre froide est une période de tensions géopolitiques entre le bloc de l'Est et le bloc de l'Ouest.",
      "Elle s'est déroulée de 1947 à 1991, année de la dissolution de l'URSS.",
      "Les principaux événements incluent la construction du mur de Berlin, la crise des missiles de Cuba, la guerre du Vietnam.",
      "Cette période a été marquée par une course aux armements et à l'espace entre les deux superpuissances."
    ],
    completed: false
  },
  "3": {
    id: "3",
    title: "Vocabulaire espagnol en rythme",
    subject: "Espagnol",
    level: "Seconde",
    teacher: "Prof. Carmen Rodríguez",
    duration: "3:30",
    image: "https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1000",
    audioSrc: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
    lyrics: [
      { time: 0, text: "Buenos días, ¿cómo estás?..." },
      { time: 3, text: "Me llamo Juan, ¿y tú quién eres?..." },
      { time: 7, text: "Soy estudiante de francés..." },
      { time: 10, text: "Vivo en Madrid, la capital..." },
      { time: 13, text: "Me gusta mucho el chocolate..." },
      { time: 17, text: "Y también me encanta bailar..." },
      { time: 20, text: "Los colores: rojo, verde, azul..." },
      { time: 24, text: "Los números: uno, dos, tres..." },
    ],
    notes: [
      "Le vocabulaire de base en espagnol est essentiel pour commencer à communiquer.",
      "Les expressions de salutation permettent d'engager la conversation.",
      "Apprendre à se présenter est une étape fondamentale.",
      "Les verbes être et avoir sont irréguliers mais très utilisés."
    ],
    completed: false
  }
};

export type Course = typeof courseData[keyof typeof courseData];
