import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Landing from './landing';
import Register from './assets/Registration and login/register';
import Login from './assets/Registration and login/login';
import Loader from './assets/loader/loader';

function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Loader on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500); // Adjust time as needed
    return () => clearTimeout(timeout);
  }, [location]);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setInitialLoading(false), 1500); // Initial loader time
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      {initialLoading ? <Loader /> : <AppRoutes />}
    </Router>
  );
}

export default App;
