import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import LawLibrary from "./pages/LawLibrary";
import Transcripts from "./pages/Transcripts";
import LegalTeam from "./pages/LegalTeam";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/chat" element={<Layout><Chat /></Layout>} />
            <Route path="/cases" element={<Layout><Cases /></Layout>} />
            <Route path="/cases/:id" element={<Layout><CaseDetail /></Layout>} />
            <Route path="/library" element={<Layout><LawLibrary /></Layout>} />
            <Route path="/transcripts" element={<Layout><Transcripts /></Layout>} />
            <Route path="/team" element={<Layout><LegalTeam /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;