
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Client Pages
import Home from "./pages/client/Home";
import IPODetail from "./pages/client/IPODetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageIPO from "./pages/admin/ManageIPO";
import IPOForm from "./pages/admin/IPOForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/ipo/:id" element={<IPODetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="manage-ipo" element={<ManageIPO />} />
              <Route path="create-ipo" element={<IPOForm />} />
              <Route path="edit-ipo/:id" element={<IPOForm />} />
              <Route path="ipo-subscription" element={<Dashboard />} />
              <Route path="ipo-allotment" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
              <Route path="api-manager" element={<Dashboard />} />
              <Route path="accounts" element={<Dashboard />} />
              <Route path="help" element={<Dashboard />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
