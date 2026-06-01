import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CustomerForm from './components/CustomerForm';
import ProductForm from './components/ProductForm';
import SalesForm from './components/SalesForm';
import Reports from './components/Reports';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUser({ token, username });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar username={user.username} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/customers" element={<CustomerForm />} />
            <Route path="/products" element={<ProductForm />} />
            <Route path="/sales" element={<SalesForm />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/customers" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
