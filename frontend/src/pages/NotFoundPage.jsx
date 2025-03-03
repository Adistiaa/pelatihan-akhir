import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <img
        src="https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740962704/error_404_oo6xtc.gif"
        alt="Not Found"
        className="img-fluid mb-4"
        style={{ maxWidth: "300px" }}
      />

      <h1 className="fw-bold">404: NOT_FOUND</h1>
      <p className="text-muted">Code: <b>NOT_FOUND</b></p>
      <p className="text-muted">Yah, Halaman nya gak ada nich</p>

      <Link to="/" className="btn btn-primary mt-3">
        Kembali ke Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
