import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home"; // Import halaman utama
import SignUp from "./pages/SignUp"; // Import halaman login

const queryClient = new QueryClient();

const App = () => {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn")); // Cek status login

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
