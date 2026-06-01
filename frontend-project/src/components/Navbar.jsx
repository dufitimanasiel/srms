import { Link, useLocation } from 'react-router-dom';

function Navbar({ username, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-white text-2xl font-bold">SRMS</div>
          <div className="flex items-center space-x-6">
            <Link
              to="/customers"
              className={`text-white hover:text-blue-200 transition ${isActive('/customers') ? 'font-bold border-b-2 border-white' : ''}`}
            >
              Customers
            </Link>
            <Link
              to="/products"
              className={`text-white hover:text-blue-200 transition ${isActive('/products') ? 'font-bold border-b-2 border-white' : ''}`}
            >
              Products
            </Link>
            <Link
              to="/sales"
              className={`text-white hover:text-blue-200 transition ${isActive('/sales') ? 'font-bold border-b-2 border-white' : ''}`}
            >
              Sales
            </Link>
            <Link
              to="/reports"
              className={`text-white hover:text-blue-200 transition ${isActive('/reports') ? 'font-bold border-b-2 border-white' : ''}`}
            >
              Reports
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {username}</span>
              <button
                onClick={onLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
