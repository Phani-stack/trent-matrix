import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Collections from './pages/Collections.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import SelectionPage from './pages/SelectionPage.jsx';
import ComputerVisionPage from './pages/ComputerVisionPage.jsx';
import BodyDetailsPage from './pages/BodyDetails.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import ForgotPasswordPage from './pages/FogotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import Collection from './pages/Collection.jsx';
import SearchUsersPage from './pages/Search.jsx';
import PublicProfilePage from './pages/PublicProfilePage.jsx';
import NavBar from './components/NavBar.jsx';
import AnalysisResultPage from './pages/AnalysisResultPage.jsx';
import WikiPage from "./pages/WikiPage";

const App = () => {
  return (
    <Router>
      {/* Fixed Wrapper for the Opaque Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>


      <div className="pt-20 min-h-screen bg-zinc-950">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/collections"
            element={
              // <ProtectedRoute>
                <Collections />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/selection"
            element={
              // <ProtectedRoute>
                <SelectionPage />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/computer-vision"
            element={
              // <ProtectedRoute>
                <ComputerVisionPage />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/body-details"
            element={
              // <ProtectedRoute>
                <BodyDetailsPage />
              //  </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              // <ProtectedRoute>
                <ProfilePage />
              // </ProtectedRoute>
            }

          />
          {/* <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchUsersPage />
              </ProtectedRoute>
            }
          /> */}

          <Route path="/collection/:id"
            element={
              // <ProtectedRoute>
                <Collection />
              // </ProtectedRoute>}
            }
          />

          <Route path="/public-profile/:id" element={
            // <ProtectedRoute>
                <PublicProfilePage />}
            // </ProtectedRoute>}
          />

          <Route path="/analysis-result" element={
            // <ProtectedRoute>
              <AnalysisResultPage />
          }
            // </ProtectedRoute>}
            />

            <Route path="/wiki/:name" element={<WikiPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
