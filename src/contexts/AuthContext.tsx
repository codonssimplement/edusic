
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types pour notre contexte d'authentification
export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email: string;
  age?: number;
  gradeLevel?: string;
  school?: string;
  preferences?: string[];
  emailVerified: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  register: (userData: Partial<UserProfile> & { password: string }) => Promise<void>;
  registerWithGoogle: () => Promise<void>;
  registerWithFacebook: () => Promise<void>;
  completeProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  isProfileComplete: () => boolean;
  updateUserProfile: (userData: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Simulation de connexion
  const login = async (email: string, password: string) => {
    // Dans une implémentation réelle, cette fonction ferait une requête API
    // Pour l'instant, on simule un succès après un court délai
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser({
          email,
          emailVerified: true,
          // Des valeurs par défaut pour la démonstration
          firstName: 'Utilisateur',
          lastName: 'Test',
          gradeLevel: 'lycee',
        });
        resolve();
      }, 1000);
    });
  };

  // Simulation de connexion avec Google
  const loginWithGoogle = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser({
          email: 'utilisateur.google@gmail.com',
          firstName: 'Utilisateur',
          lastName: 'Google',
          emailVerified: true,
          gradeLevel: 'lycee',
        });
        resolve();
      }, 1000);
    });
  };

  // Simulation de connexion avec Facebook
  const loginWithFacebook = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser({
          email: 'utilisateur.facebook@facebook.com',
          firstName: 'Utilisateur',
          lastName: 'Facebook',
          emailVerified: true,
          gradeLevel: 'lycee',
        });
        resolve();
      }, 1000);
    });
  };

  // Simulation d'inscription
  const register = async (userData: Partial<UserProfile> & { password: string }) => {
    // Dans une implémentation réelle, cette fonction ferait une requête API
    const { password, ...userDataWithoutPassword } = userData;
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser({
          ...userDataWithoutPassword,
          email: userData.email || '',
          emailVerified: false,
        } as UserProfile);
        resolve();
      }, 1000);
    });
  };

  // Simulation d'inscription avec Google
  const registerWithGoogle = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser({
          email: 'nouveau.utilisateur.google@gmail.com',
          firstName: 'Nouveau',
          lastName: 'Google',
          emailVerified: true,
        } as UserProfile);
        resolve();
      }, 1000);
    });
  };

  // Simulation d'inscription avec Facebook
  const registerWithFacebook = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser({
          email: 'nouveau.utilisateur.facebook@facebook.com',
          firstName: 'Nouveau',
          lastName: 'Facebook',
          emailVerified: true,
        } as UserProfile);
        resolve();
      }, 1000);
    });
  };

  // Compléter le profil après l'inscription
  const completeProfile = async (profileData: Partial<UserProfile>) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          setUser({
            ...user,
            ...profileData
          });
        }
        resolve();
      }, 1000);
    });
  };

  // Vérifier si le profil est complet
  const isProfileComplete = () => {
    if (!user) return false;
    
    return !!(user.firstName && user.lastName && user.age && user.gradeLevel && user.school);
  };

  // Mettre à jour le profil utilisateur
  const updateUserProfile = async (userData: Partial<UserProfile>) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          setUser({
            ...user,
            ...userData
          });
        }
        resolve();
      }, 1000);
    });
  };

  // Simulation de réinitialisation de mot de passe
  const resetPassword = async (email: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Dans une implémentation réelle, cela enverrait un email
        resolve();
      }, 1000);
    });
  };

  // Simulation de vérification d'email
  const verifyEmail = async (token: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          setUser({
            ...user,
            emailVerified: true
          });
        }
        resolve();
      }, 1000);
    });
  };

  // Déconnexion
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      login,
      loginWithGoogle,
      loginWithFacebook, 
      register,
      registerWithGoogle,
      registerWithFacebook, 
      logout, 
      completeProfile,
      isProfileComplete,
      updateUserProfile,
      resetPassword,
      verifyEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
