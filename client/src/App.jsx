import { Routes, BrowserRouter, Route, useLocation } from "react-router-dom";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import CreateSurveyPage from "./pages/CreateSurveyPage.jsx";
import OverallResultsPage from "./pages/OverallResultsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./guards/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </AuthProvider>
  );
}

function Content() {
  const location = useLocation();

  return (
    <div className="xs:mx-4 xxs:px-6 xxxs:px-10 xxxxs:px-14 sm:px-24 md:px-8 lg:px-20 llg:px-28 xl:px-12 mb-3">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Mostrar una survey y sus questions:*/}
        <Route path="/surveys/:id" element={<SurveyPage />} />
        <Route
          path="/surveys/:id/results/overall"
          element={<OverallResultsPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/surveys" element={<CreateSurveyPage />} />
          <Route
            path="/surveys/:id/update"
            element={<CreateSurveyPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;