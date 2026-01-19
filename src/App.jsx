import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";
import Layout from "./pages/Layout"; // Import Layout
import DashboardPage from "./pages/Dashboard";
import Books from "./pages/Books";
import Characters from "./pages/Characters";
import Blogs from "./pages/Blogs";
import WorldAndThemes from "./pages/WorldAndThemes";
import AccountSettings from "./pages/AccountSettings";
import EditProfile from "./pages/EditProfile";
import PrivacySettings from "./pages/PrivacySettings";
import TermsAndConditions from "./pages/TermsAndConditions";
import { getCookie } from "./services/cookies";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const token = getCookie("NessasBrokenWorldAuthToken");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Routes without Sidebar (Unprotected Routes) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetPassword" element={<ForgotPasswordPage />} />
        <Route path="/verifyCode" element={<VerifyCodePage />} />
        <Route path="/setNewPassword" element={<SetNewPasswordPage />} />

        {/* Routes with Sidebar (Protected Routes) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Layout>
                <Books />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/characters"
          element={
            <ProtectedRoute>
              <Layout>
                <Characters />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Layout>
                <Blogs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/worldandthemes"
          element={
            <ProtectedRoute>
              <Layout>
                <WorldAndThemes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accountsettings"
          element={
            <ProtectedRoute>
              <Layout>
                <AccountSettings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <Layout>
                <EditProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacysettings"
          element={
            <ProtectedRoute>
              <Layout>
                <PrivacySettings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/termsandconditions"
          element={
            <ProtectedRoute>
              <Layout>
                <TermsAndConditions />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
