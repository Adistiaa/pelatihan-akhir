import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      {/* Gambar GIF */}
      <img
        src="/assets/404.gif" // Ganti ini dengan URL atau path lokal GIF
        alt="Not Found"
        className="img-fluid mb-4"
        style={{ maxWidth: "300px" }}
      />

      {/* Pesan Error */}
      <h1 className="fw-bold text-danger">404: NOT_FOUND</h1>
      <p className="text-muted">Code: <code>NOT_FOUND</code></p>
      <p className="text-muted">The page you are looking for does not exist.</p>

      {/* Tombol Kembali */}
      <Link to="/" className="btn btn-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
