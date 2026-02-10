import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MovieDetails from './pages/MovieDetails';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for logged in user
    const storedUser = localStorage.getItem('movieUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute user={user}>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:movieId/:hallId"
            element={
              <ProtectedRoute user={user}>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirmation"
            element={
              <ProtectedRoute user={user}>
                <Confirmation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
