import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import TopNav from './components/TopNav';

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
          {/* Fixed private routes - must come first */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TopNav />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <TopNav />
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <TopNav />
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <TopNav />
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-analysis"
            element={
              <ProtectedRoute>
                <TopNav />
                <AIAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <TopNav />
                <Subscription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <TopNav />
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <TopNav />
                <MyAccount />
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
