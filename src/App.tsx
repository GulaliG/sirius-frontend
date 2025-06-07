import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {Preloader} from './components/Preloader';
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import SurveyPage from "./pages/SurveyPage";
import StatusPage from "./pages/StatusPage";
import { PageTransition } from "./components/PageTransition";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  //preloader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Preloader />;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
              <HomePage />
          }
        />

        <Route
          path="/upload"
          element={
            <PageTransition>
              <UploadPage />
            </PageTransition>
          }
        />

        <Route
          path="/survey"
          element={
            <PageTransition>
              <SurveyPage />
            </PageTransition>
          }
        />

        <Route
          path="/status"
          element={
            <PageTransition>
              <StatusPage />
            </PageTransition>
          }
        />

        <Route path="*" element={<Navigate to="/upload" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
