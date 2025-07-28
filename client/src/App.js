import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AddNote from './pages/AddNote';
import NotesList from './pages/NotesList';
import EditNote from './pages/EditNote';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import ViewNote from './pages/ViewNote';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalErrorBanner from './components/GlobalErrorBanner';
import { useError } from './context/ErrorContext';
import { useEffect } from 'react';
import { attachGlobalErrorHandler } from './services/axiosInstance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { showError } = useError();

  useEffect(() => {
    attachGlobalErrorHandler(showError);
  }, [showError]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <GlobalErrorBanner />
          <ToastContainer position='top-right' autoClose={3000} />
          <Routes>
            <Route path='/' element={<LandingPage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/notes'
              element={
                <PrivateRoute>
                  <NotesList />
                </PrivateRoute>
              }
            />
            <Route
              path='/add'
              element={
                <PrivateRoute>
                  <AddNote />
                </PrivateRoute>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <PrivateRoute>
                  <EditNote />
                </PrivateRoute>
              }
            />
            <Route
              path='/note/:id'
              element={
                <PrivateRoute>
                  <ViewNote />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
