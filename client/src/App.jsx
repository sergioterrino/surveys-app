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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/surveys/:id" element={<SurveyPage />} />
          <Route path="/surveys" element={<CreateSurveyPage />} />
          <Route path="/surveys/:id/questions/results/overall" element={<OverallResultsPage />}/>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
