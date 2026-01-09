import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import AIAnalysis from './pages/AIAnalysis';
import Subscription from './pages/Subscription';
import Support from './pages/Support';
import MyAccount from './pages/MyAccount';
import PortfolioView from './pages/PortfolioView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected routes with dashboard layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Templates />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-analysis"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AIAnalysis />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Subscription />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Support />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyAccount />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Public auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Root redirect - must be before dynamic route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            }
          />

          {/* Dynamic public portfolio route - must be last */}
          <Route path="/:subdomain" element={<PortfolioView />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
