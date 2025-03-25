import React, { JSX } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import AdminDashboard from './pages/Admin/Dashboard';
import HallManagement from './pages/Admin/HallManagement';
import MovieManagement from './pages/Admin/MovieManagement';
import TheatreManagement from './pages/Admin/TheatreManagement';
import BookingConfirmation from './pages/BookingConfirmation';
import BookingDetails from './pages/BookingDetails';
import CitySelection from './pages/CitySelection';
import MovieSelection from './pages/MovieSelection';
import Payment from './pages/Payment';
import SeatSelection from './pages/SeatSelection';
import ShowSelection from './pages/ShowSelection';
import TheatreSelection from './pages/TheatreSelection';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/select-city"
          element={
            <ProtectedRoute>
              <CitySelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-movie"
          element={
            <ProtectedRoute>
              <MovieSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-theatre"
          element={
            <ProtectedRoute>
              <TheatreSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-show"
          element={
            <ProtectedRoute>
              <ShowSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-seat"
          element={
            <ProtectedRoute>
              <SeatSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-confirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-details"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/theatres"
          element={
            <ProtectedRoute>
              <TheatreManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/halls"
          element={
            <ProtectedRoute>
              <HallManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute>
              <MovieManagement />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
