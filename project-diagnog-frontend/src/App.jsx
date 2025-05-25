import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Landing from './landing';
import Register from './assets/Registration and login/register';
import Login from './assets/Registration and login/login';
import Loader from './assets/loader/loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './assets/About&Contact/contact';
import Chat from './dashboard/chat';
import Text from './dashboard/text';
import Diagnose from './dashboard/diagnose';
import Personnels from './dashboard/personnels';
import Setting from './dashboard/setting';
import AdminDashboard from './AdminDashboard/admindashboard';
import AdminDoctor from './AdminDashboard/admindoctor';



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/text" element={<Text />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/personnels" element={<Personnels />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admindoctor" element={<AdminDoctor />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;