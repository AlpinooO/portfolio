import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import NexusMachina from "./pages/NexusMachina.jsx";
import EfreiMotorsport from "./pages/EfreiMotorsport.jsx";
import Professionnel from "./pages/Professionnel.jsx";
import Profil from "./pages/Profil.jsx";
import ContactPage from "./pages/ContactPage.jsx";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projets" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/projets/nexus-machina" element={<PageTransition><NexusMachina /></PageTransition>} />
        <Route path="/projets/efrei-motorsport" element={<PageTransition><EfreiMotorsport /></PageTransition>} />
        <Route path="/professionnel" element={<PageTransition><Professionnel /></PageTransition>} />
        <Route path="/profil" element={<PageTransition><Profil /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Nav />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}