import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    no_car: "",
    name_car: "",
    type_car: "",
    year: "",
    seat: "",
    image: "",
    total: "",
    price: "",
    status: "Available",
  });
  const token = localStorage.getItem("token");
  const [editId, setEditId] = useState(null);
  const carsApi = "http://127.0.0.1:8000/api/a24/cars";
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   const [carsRes] = await Promise.all([
  //     axios.get(carsApi, { headers: { Authorization: `Bearer ${token}` } }),
  //   ]);
  //   setCars(carsRes.data);
  // };  OPSIONAL KALO MAU PAKAI

  const fetchData = async () => { //PENAMBAHAN BERBEDA KALAU SEMISALNYA DI TAMBAHKAN LOADING
    setLoading(true);
    try {
      const [carsRes] = await Promise.all([
        axios.get(carsApi, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setCars(carsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "put" : "post";
    const url = editId ? `${carsApi}/${editId}` : carsApi;
    try {
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        no_car: "",
        name_car: "",
        type_car: "",
        year: "",
        seat: "",
        image: "",
        total: "",
        price: "",
        status: "Available",
      });
      fetchData();
      setEditId(null);
      Swal.fire(
        "success",
        `success ${editId ? "update" : "create"} data`,
        "success"
      );
    } catch {
      Swal.fire("Error", "Failed to save data", "error");
    }
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Seriusan nich?",
      text: "Gak Bakal Muncul Lagi Loh!",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      await axios.delete(`${carsApi}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(cars.filter((car) => car.id !== id));
      Swal.fire("success", "Data berhasil dihapus", "success");
    }
  };
  const handleEdit = (car) => {
    setForm(car);
    setEditId(car.id);
  };

  //PENAMBAHAN WARNA KETERSEDIAAN
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-success';
      case 'Rented': return 'bg-warning';
      case 'Sold Out': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center vh-100 overflow-hidden"
        style={{ overflow: "hidden" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{
            width: "90%",
            maxWidth: "800px",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <h3 className="text-center mb-4">
            {editId ? "Update" : "Create"} Car
          </h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Image</label>
              <input
                type="text" // Ubah ke type="file" jika ingin upload file
                required
                onChange={handleInputChange}
                value={form.image}
                placeholder="Masukan image"
                name="image"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">No Car</label>
              <input
                type="text"
                required
                onChange={handleInputChange}
                value={form.no_car}
                placeholder="Masukan no_car"
                name="no_car"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name Car</label>
              <input
                type="text"
                required
                onChange={handleInputChange}
                value={form.name_car}
                placeholder="Masukan name_car"
                name="name_car"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type Car</label>
              <input
                type="text"
                required
                onChange={handleInputChange}
                value={form.type_car}
                placeholder="Masukan type_car"
                name="type_car"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Year</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.year}
                placeholder="Masukan year"
                name="year"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Seat</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.seat}
                placeholder="Masukan seat"
                name="seat"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Total</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.total}
                placeholder="Masukan total"
                name="total"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.price}
                placeholder="Masukan price"
                name="price"
                className="form-control"
              />
            </div>
            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{
                  background: "#4A5DF9",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mt-4">
      <h2 className="text-center mb-4">Car Data List</h2>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {cars.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card shadow position-relative border-0">
                {car.status && (
                  <span className={`badge position-absolute top-0 start-0 m-2 px-3 py-2 ${getBadgeColor(car.status)}`}>
                    {car.status}
                  </span>
                )}

                <img
                  src={car.image}
                  alt={car.name_car}
                  className="card-img-top rounded-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />

                <div className="card-body">
                  <h5 className="card-title fw-bold">{car.name_car}</h5>
                  <p className="card-text text mb-1"><b>Tipe: </b>{car.type_car}</p>
                  <p className="card-text text mb-1"><b>Tahun: </b>{car.year}</p>
                  <p className="card-text text mb-1"><b>Kursi: </b>{car.seat}</p>

                  <div className="d-flex flex-column gap-2 mt-3">
                    <span className="badge bg-secondary w-100">💲Rp{car.price.toLocaleString()}/ hari</span>
                    <span className="badge bg-secondary w-100">🚗{car.total} Tersedia</span>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    disabled={car.status === 'Sold Out'}
                    onClick={() => navigate('/rents')}
                  >
                    {car.status === 'Sold Out' ? 'Tidak Tersedia' : 'Sewa Sekarang'}
                  </button>

                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-warning w-50"
                      onClick={() => handleEdit(car)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cars.length === 0 && !loading && (
        <p className="text-center">Tunggu, jika halaman belum termuat di anjurkan untuk refresh</p>
      )}
    </div>
    </div>
  );
};

export default CarPage;
