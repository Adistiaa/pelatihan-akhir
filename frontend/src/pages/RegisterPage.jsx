import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [registers, setRegister] = useState([]);
  const [form, setForm] = useState({
    no_ktp: '',
    name: '',
    date_of_birth: '',
    email: '',
    password: '',
    phone: '',
    description: '',
    role: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const RegisterApi = 'http://127.0.0.1:8000/api/a24/regis';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(RegisterApi, { headers: { Authorization: `Bearer ${token}` } });
      setRegister(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(RegisterApi, { headers: { Authorization: `Bearer ${token}` } });
  //     setRegister(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     Swal.fire('Error', 'Failed to fetch data', 'error');
  //   }
  // };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'put' : 'post';
    const url = editId ? `${RegisterApi}/${editId}` : RegisterApi;

    try {
      const response = await axios[method](url, form, { headers: { Authorization: `Bearer ${token}` } });
      setForm({
        no_ktp: '',
        name: '',
        date_of_birth: '',
        email: '',
        password: '',
        phone: '',
        description: '',
        role: '',
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
      text: 'Langsung aja kalo udh yakin',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${RegisterApi}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setRegister(registers.filter((register) => register.id !== id)); // Hapus data dari state
        Swal.fire('Success', 'Data berhasil dihapus', 'success');
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Failed to delete data', 'error');
      }
    }
  };

  const handleEdit = (register) => {
    setForm(register);
    setEditId(register.id);
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
          <h3 className="text-center mb-4">{editId ? 'Update' : 'Create'} Register</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">No KTP</label>
              <input
                type="number"
                required
                name="no_ktp"
                value={form.no_ktp}
                placeholder="Masukkan no_ktp"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                required
                name="name"
                value={form.name}
                placeholder="Masukkan name"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="text"
                required
                name="email"
                value={form.email}
                placeholder="Masukkan email"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="number"
                required
                name="phone"
                value={form.phone}
                placeholder="Masukkan phone"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                required
                name="description"
                value={form.description}
                placeholder="Masukkan description"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                name="password"
                value={form.password}
                placeholder="Masukkan password"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Pilih Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                required
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleInputChange}
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
          <h3 className="text-center mb-4">Register Data List</h3>
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
                    <th>No KTP</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Description</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registers.map((register) => (
                    <tr key={register.id}>
                      <td>{register.no_ktp}</td>
                      <td>{register.name}</td>
                      <td>{register.date_of_birth}</td>
                      <td>{register.email}</td>
                      <td>{register.phone}</td>
                      <td>{register.description}</td>
                      <td>{register.role}</td>
                      <td>
                        <button
                          className="btn btn-danger me-2 btn-sm"
                          onClick={() => handleDelete(register.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning me-2 btn-sm"
                          onClick={() => handleEdit(register)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {registers.length === 0 && <p className="text-center">Tunggu, jika halaman belum termuat di anjurkan untuk refresh</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;