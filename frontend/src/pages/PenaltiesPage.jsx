import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const PenaltiesPage = () => {
  const [cars, setCars] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [form, setForm] = useState({
    name_penalties: '',
    description: '',
    id_car: '',
    penalties_total: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const PenaltiesApi = 'http://127.0.0.1:8000/api/a24/penalties';
  const CarsApi = 'http://127.0.0.1:8000/api/a24/cars';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [carsRes, penaltiesRes] = await Promise.all([
        axios.get(CarsApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(PenaltiesApi, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setCars(carsRes.data);
      setPenalties(penaltiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // const fetchData = async () => {
  //   const [carsRes, penaltiesRes] = await Promise.all([
  //     axios.get(CarsApi, { headers: { Authorization: `Bearer ${token}` } }),
  //     axios.get(PenaltiesApi, { headers: { Authorization: `Bearer ${token}` } }),
  //   ])
  //   setCars(carsRes.data)
  //   setPenalties(penaltiesRes.data)
  // }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'put' : 'post';
    const url = editId ? `${PenaltiesApi}/${editId}` : PenaltiesApi;

    try {
      const response = await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        name_penalties: '',
        description: '',
        id_car: '',
        penalties_total: '',
      });
      setEditId(null);
      fetchData();
      Swal.fire('Success', editId ? 'Data updated successfully' : 'Data created successfully', 'success');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to save data', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Yakin gak nich?',
      text: 'Yakin anda mau ngapus kan?',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${PenaltiesApi}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPenalties(penalties.filter((penalty) => penalty.id !== id));
        Swal.fire('Success', 'Data berhasil dihapus', 'success');
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Failed to delete data', 'error');
      }
    }
  };

  const handleEdit = (penalty) => {
    setForm(penalty);
    setEditId(penalty.id);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100 overflow-hidden">
        <div
          className="card shadow-sm p-4"
          style={{
            width: '90%',
            maxWidth: '800px',
            overflowY: 'auto',
            maxHeight: '90vh',
          }}
        >
          <h3 className="text-center mb-4">{editId ? 'Update' : 'Create'} Penalty</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Car</label>
              <select
                name="id_car"
                value={form.id_car}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Pilih Mobil</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name_car} - {car.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Penalty Name</label>
              <input
                type="text"
                required
                onChange={handleInputChange}
                value={form.name_penalties}
                name="name_penalties"
                placeholder="Masukkan penalty name"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                required
                onChange={handleInputChange}
                value={form.description}
                name="description"
                placeholder="Masukkan description"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Penalty Total</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.penalties_total}
                name="penalties_total"
                placeholder="Masukkan penalty total"
                className="form-control"
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100 overflow-hidden">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '1000px' }}>
          <h3 className="text-center mb-4">Penalty Data List</h3>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Car</th>
                    <th>Penalty Name</th>
                    <th>Description</th>
                    <th>Penalty Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {penalties.map((penalty) => (
                    <tr key={penalty.id}>
                      <td>{cars.find((car) => car.id === penalty.id_car)?.name_car}</td>
                      <td>{penalty.name_penalties}</td>
                      <td>{penalty.description}</td>
                      <td>{penalty.penalties_total}</td>
                      <td>
                        <button
                          className="btn btn-danger me-2 btn-sm"
                          onClick={() => handleDelete(penalty.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning me-2 btn-sm"
                          onClick={() => handleEdit(penalty)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {penalties.length === 0 && <p className="text-center">Tunggu, jika halaman belum termuat di anjurkan untuk refresh</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PenaltiesPage;