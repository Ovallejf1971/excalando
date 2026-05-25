import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { HomePage } from "@/pages/HomePage";
import { ManifiestoPage } from "@/pages/ManifiestoPage";
import { CapacidadesPage } from "@/pages/CapacidadesPage";
import { ProcesoPage } from "@/pages/ProcesoPage";
import { ScorePage } from "@/pages/ScorePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-ink">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manifiesto" element={<ManifiestoPage />} />
          <Route path="/capacidades" element={<CapacidadesPage />} />
          <Route path="/proceso" element={<ProcesoPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}
