import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Clients from './pages/Clients.jsx';
import Programs from './pages/Programs.jsx';
import Users from './pages/Users.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ClientProfile from './pages/ClientProfile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
          <Route path="/programs" element={<PrivateRoute><Programs /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/users/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/clients/:id" element={<PrivateRoute><ClientProfile /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Add this export default statement
export default App;