import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Tips from './pages/Tips';
import NotFound from './pages/NotFound';

function Layout({ children }) {
  const { pathname } = useLocation();
  const isFlush = pathname === '/';

  return (
    <div className="page">
      <Header />
      <main className={`page__content ${isFlush ? 'page__content_flush' : ''}`}>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute anonymous>
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <ProtectedRoute anonymous>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workouts"
                element={
                  <ProtectedRoute>
                    <Workouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tips"
                element={
                  <ProtectedRoute>
                    <Tips />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
