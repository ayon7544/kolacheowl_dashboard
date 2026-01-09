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
import Layout from "./pages/layout"; // Import Layout
import DashboardPage from "./pages/Dashboard";
import Books from "./pages/Books";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Routes without Sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetPassword" element={<ForgotPasswordPage />} />
        <Route path="/verifyCode" element={<VerifyCodePage />} />
        <Route path="/setNewPassword" element={<SetNewPasswordPage />} />

        {/* Routes with Sidebar (using Layout) */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/books"
          element={
            <Layout>
              <Books />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
