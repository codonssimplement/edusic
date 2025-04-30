
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Empêcher Chrome 76+ d'afficher automatiquement l'invite
      e.preventDefault();
      // Stocker l'événement pour pouvoir le déclencher plus tard
      setDeferredPrompt(e);
      // Vérifier si l'application est déjà installée
      if (!localStorage.getItem('pwaInstalled') && !localStorage.getItem('pwaDismissed')) {
        setShowPrompt(true);
      }
    };

    // Vérifier si l'application est déjà installée via matchMedia
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      localStorage.setItem('pwaInstalled', 'true');
      setShowPrompt(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Afficher l'invite d'installation du navigateur
    deferredPrompt.prompt();
    
    // Attendre que l'utilisateur réponde à l'invite
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('Utilisateur a accepté l\'installation');
      localStorage.setItem('pwaInstalled', 'true');
    } else {
      console.log('Utilisateur a refusé l\'installation');
    }
    
    // On ne peut utiliser l'invite qu'une seule fois
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    localStorage.setItem('pwaDismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 bg-black p-4 rounded-lg z-50 border border-eduGreen shadow-lg shadow-eduGreen/20"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h3 className="text-eduGreen font-bold text-lg mb-1">Installez EduSic sur votre appareil</h3>
              <p className="text-white text-sm mb-3">
                Profitez d'une expérience optimisée, d'un accès rapide et de fonctionnalités hors ligne
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleInstallClick}
                  className="bg-eduGreen hover:bg-eduGreen/90 text-black font-medium rounded-full"
                >
                  Installer maintenant
                </Button>
                <Button 
                  variant="outline" 
                  onClick={dismissPrompt}
                  className="border-gray-600 text-gray-300 hover:text-white hover:border-white rounded-full"
                >
                  Plus tard
                </Button>
              </div>
            </div>
            <button 
              onClick={dismissPrompt} 
              className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
