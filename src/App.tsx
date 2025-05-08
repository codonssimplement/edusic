import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import SubjectsPage from "./pages/SubjectsPage";
import MainLayout from "./components/layout/MainLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ProfileCompletionPage from "./pages/ProfileCompletionPage";
import UserProfilePage from "./pages/UserProfilePage";
import ResetPasswordCompletePage from "./pages/ResetPasswordCompletePage";
import ExercisePage from "./pages/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NewReleasesPage from "./pages/NewReleasesPage";
import CoursePlayerPage from "./pages/CoursePlayerPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import CreatePlaylistPage from "./pages/CreatePlaylistPage";
import CatalogPage from "./pages/CatalogPage";
import SubjectDetailPage from "./pages/SubjectDetailPage";
import InstallPWAButton from "./components/InstallPWAButton";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/complete" element={<ResetPasswordCompletePage />} />
              <Route path="/email-verification" element={<EmailVerificationPage />} />
              <Route path="/complete-profile" element={<ProfileCompletionPage />} />
              
              <Route path="/search" element={
                <MainLayout>
                  <SearchPage />
                </MainLayout>
              } />
              
              <Route path="/subjects" element={
                <MainLayout>
                  <SubjectsPage />
                </MainLayout>
              } />
              
              <Route path="/subjects/:subjectId" element={
                <MainLayout>
                  <SubjectDetailPage />
                </MainLayout>
              } />
              
              <Route path="/catalog" element={
                <MainLayout>
                  <CatalogPage />
                </MainLayout>
              } />
              
              <Route path="/new-releases" element={
                <MainLayout>
                  <NewReleasesPage />
                </MainLayout>
              } />
              
              <Route path="/player/:courseId" element={
                <MainLayout>
                  <CoursePlayerPage />
                </MainLayout>
              } />
              
              <Route path="/playlists" element={
                <MainLayout>
                  <PlaylistsPage />
                </MainLayout>
              } />
              
              <Route path="/playlists/create" element={
                <MainLayout>
                  <CreatePlaylistPage />
                </MainLayout>
              } />
              
              <Route path="/profile" element={
                <MainLayout>
                  <UserProfilePage />
                </MainLayout>
              } />
              
              <Route path="/exercises" element={
                <MainLayout>
                  <ExercisesPage />
                </MainLayout>
              } />
              
              <Route path="/exercises/:exerciseId" element={
                <MainLayout>
                  <ExerciseDetailPage />
                </MainLayout>
              } />
              
              <Route path="/quiz" element={
                <MainLayout>
                  <ExercisePage />
                </MainLayout>
              } />
              
              <Route path="/admin" element={
                <MainLayout>
                  <AdminDashboardPage />
                </MainLayout>
              } />
              
              {/* Redirect /recent to /new-releases */}
              <Route path="/recent" element={<Navigate to="/new-releases" replace />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </AnimatePresence>
          <InstallPWAButton />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
