
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EbookLanding from "./pages/EbookLanding";
import WebinarLanding from "./pages/WebinarLanding";
import TripwirePage from "./pages/TripwirePage";
import CoreOfferPage from "./pages/CoreOfferPage";
import { DiagnosticForm } from "./components/DiagnosticForm";
import { CRMDashboard } from "./components/CRMDashboard";
import { UnsubscribeManager } from "./components/UnsubscribeManager";
import { TrackingPixels } from "./components/TrackingPixels";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        {/* <TrackingPixels /> */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ebook" element={<EbookLanding />} />
          <Route path="/webinar" element={<WebinarLanding />} />
          <Route path="/tripwire" element={<TripwirePage />} />
          <Route path="/oferta" element={<CoreOfferPage />} />
          <Route path="/diagnostico" element={<DiagnosticForm />} />
          <Route path="/crm" element={<CRMDashboard />} />
          <Route path="/unsubscribe" element={<UnsubscribeManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
