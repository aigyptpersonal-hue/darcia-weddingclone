import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import Invitation from "./pages/Invitation"; // <-- Ini file baru kita tadi

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Halaman Utama (Preview Default) */}
          <Route path="/" element={<Index />} />
          
          {/* Halaman Admin */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Halaman Undangan Dinamis (Kabel Utama Kita) */}
          {/* Taruh di sini, SEBELUM Route bintang (*) */}
          <Route path="/:slug" element={<Invitation />} />

          {/* Halaman 404 (Paling Bawah) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
