import React, { useEffect, useState } from "react";

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      console.log("beforeinstallprompt fired");
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log("deferredPrompt.prompt() called");
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("deferredPrompt.userChoice outcome:", outcome);
      if (outcome === "accepted") {
        setShowButton(false);
      }
    }
  };

  if (!showButton) return null;

  return (
    <button
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        padding: "12px 24px",
        background: "#1DB954",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontWeight: "bold",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "pointer"
      }}
      onClick={handleInstallClick}
    >
      Installer l’application
    </button>
  );
};

export default InstallPWAButton;