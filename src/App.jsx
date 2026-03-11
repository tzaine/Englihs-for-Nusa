import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Materials from "./pages/Materials";
import QRAccess from "./pages/QRAccess";
import NotFound from "./pages/NotFound";
import LoginPortal from "./pages/LoginPortal";

// ---- LMS: Student Pages ----
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentQuiz from "./pages/student/StudentQuiz";
import StudentWriting from "./pages/student/StudentWriting";

// ---- LMS: Teacher Pages ----
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCorrections from "./pages/teacher/TeacherCorrections";
import TeacherReport from "./pages/teacher/TeacherReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ---- Existing routes (unchanged) ---- */}
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/qr-access" element={<QRAccess />} />

          {/* ---- Unified Login Portal ---- */}
          <Route path="/login" element={<LoginPortal />} />

          {/* ---- LMS: Student routes ---- */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/quiz" element={<StudentQuiz />} />
          <Route path="/student/writing" element={<StudentWriting />} />

          {/* ---- LMS: Teacher routes ---- */}
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/corrections" element={<TeacherCorrections />} />
          <Route path="/teacher/report" element={<TeacherReport />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

