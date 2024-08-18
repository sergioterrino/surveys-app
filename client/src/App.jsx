import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import CreateSurveyPage from "./pages/CreateSurveyPage.jsx";
import OverallResultsPage from "./pages/OverallResultsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from './guards/ProtectedRoute.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Mostrar una survey y sus questions:*/}
            <Route path="/surveys/:id" element={<SurveyPage />} />
            <Route path="/surveys/:id/results/overall" element={<OverallResultsPage />}/>
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/surveys" element={<CreateSurveyPage />} />
              <Route path="/surveys/:id/update" element={<CreateSurveyPage />} />
            </Route>
          </Routes>
          <Toaster/>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
