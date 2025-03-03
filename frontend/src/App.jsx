import { Navigate, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Swal from 'sweetalert2';
import Navbar from "./components/Navbar";
import CarPage from './pages/CarPage';
import RentPage from "./pages/RentPage";
import RegisterPage from "./pages/RegisterPage";
import PenaltiesPage from "./pages/PenaltiesPage";
import ReturnPage from "./pages/ReturnPage";
import NotFoundPage from "./pages/NotFoundPage";
import InformationPage from "./pages/InformationPage";

const AuthGuard = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userData') || '{}');
  const isAdmin = user?.role === 'admin';

  if (!token) {
    return <Navigate to='/' replace />;
  }

  if (adminOnly && !isAdmin) {
    Swal.fire('Error', 'Anda tidak memiliki akses ke halaman ini', 'error');
    return <Navigate to='/home' replace />;
  }

  return children;
};

function App() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/';
  const isNotFoundPage = location.pathname === '*' || !location.pathname.match(/^\/(home|cars|rents|returns|register|penalties|informasi|)$/);

  if (token && isLoginPage) {
    return <Navigate to='/home' replace />;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    Swal.fire('Success', 'Logout Berhasil', 'success').then(() => {
      navigate('/');
    });
  };

  return (
      <>
    {!isLoginPage && !isNotFoundPage && <Navbar OnLogout={logout} />}
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/cars" element={<AuthGuard adminOnly><CarPage /></AuthGuard>} />
      <Route path="/rents" element={<AuthGuard adminOnly><RentPage /></AuthGuard>} />
      <Route path="/returns" element={<AuthGuard adminOnly><ReturnPage /></AuthGuard>} />
      <Route path="/register" element={<AuthGuard adminOnly><RegisterPage /></AuthGuard>} />
      <Route path="/penalties" element={<AuthGuard adminOnly><PenaltiesPage /></AuthGuard>} />
      <Route path="/informasi" element={<InformationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
      </>
  );
}

export default App;