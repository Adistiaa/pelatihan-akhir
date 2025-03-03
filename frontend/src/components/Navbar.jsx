import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ OnLogout }) => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const user = JSON.parse(localStorage.getItem('userData'));
  const isAdmin = user?.role === "admin";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to={'/home'}>RentCar🚗🚗</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={'/home'}>Home</Link>
              </li>
              {isAdmin && (
                <>
                  <li className="nav-item"><Link className="nav-link" to={'/cars'}>Cars</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/rents'}>Rents</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/penalties'}>Penalties</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/returns'}>Returns</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/register'}>Register</Link></li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to={'/informasi'}>Informasi</Link>
              </li>
            </ul>

            <div className="ms-auto d-flex align-items-center">
              <span className="navbar-text me-3">Halo, {user?.name}</span>
              <button className="btn btn-danger btn-sm" onClick={OnLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
