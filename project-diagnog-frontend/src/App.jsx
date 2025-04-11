import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing';
import Register from './assets/Registration and login/register';
import Login from './assets/Registration and login/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/landing" element={<Landing />} />
      
        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
