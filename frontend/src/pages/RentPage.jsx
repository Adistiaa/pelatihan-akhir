import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RentPage = () => {
  const [rents, setRent] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    id_car: '',
    id_tenant: '',
    date_borrow: '',
    date_return: '',
    down_payment: '',
    discount: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const rentsApi = 'http://127.0.0.1:8000/api/a24/rent';
  const tenantApi = 'http://127.0.0.1:8000/api/a24/regis';
  const carsApi = 'http://127.0.0.1:8000/api/a24/cars';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rentsRes, tenantRes, carsRes] = await Promise.all([
        axios.get(rentsApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(tenantApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(carsApi, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setRent(rentsRes.data);
      setTenants(tenantRes.data);
      setCars(carsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // const fetchData = async () => {
  //   const [ rentsRes, tenantRes, carsRes ] = await Promise.all([
  //     axios.get(rentsApi, { headers: { Authorization: `Bearer ${token}` } }),
  //     axios.get(tenantApi, { headers: { Authorization: `Bearer ${token}` } }),
  //     axios.get(carsApi, { headers: { Authorization: `Bearer ${token}` } }),
  //   ])
  //   setRent(rentsRes.data)
  //   setTenants(tenantRes.data)
  //   setCars(carsRes.data)
  // }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'put' : 'post';
    const url = editId ? `${rentsApi}/${editId}` : rentsApi;

    try {
      const response = await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        id_car: '',
        id_tenant: '',
        date_borrow: '',
        date_return: '',
        down_payment: '',
        discount: '',
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
      text: 'Kalau udah yakin mau hapus ya gak papa',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${rentsApi}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRent(rents.filter((rent) => rent.id !== id));
        Swal.fire('Success', 'Data berhasil dihapus', 'success');
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Failed to delete data', 'error');
      }
    }
  };

  const handleEdit = (rent) => {
    setForm(rent);
    setEditId(rent.id);
  };

  // const getBadgeColor = (status) => {
  //   switch (status) {
  //     case 'Available':
  //       return 'bg-success';
  //     case 'Unavailable':
  //       return 'bg-danger';
  //     default:
  //       return 'bg-secondary';
  //   }
  // };

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
          <h3 className="text-center mb-4">{editId ? 'Update' : 'Create'} Rent</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Date Borrow</label>
              <input
                type="date"
                required
                onChange={handleInputChange}
                value={form.date_borrow}
                name="date_borrow"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date Return</label>
              <input
                type="date"
                required
                onChange={handleInputChange}
                value={form.date_return}
                name="date_return"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Tenant</label>
              <select
                name="id_tenant"
                value={form.id_tenant}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Pilih Tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name} - {tenant.role}
                  </option>
                ))}
              </select>
            </div>
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
              <label className="form-label">Discount</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.discount}
                name="discount"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Down Payment</label>
              <input
                type="number"
                required
                onChange={handleInputChange}
                value={form.down_payment}
                name="down_payment"
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
          <h3 className="text-center mb-4">Rent Data List</h3>
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
                    <th>ID</th>
                    <th>Car</th>
                    <th>Tenant</th>
                    <th>Date Borrow</th>
                    <th>Date Return</th>
                    <th>Down Payment</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rents.map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{cars.find((car) => car.id === rent.id_car)?.name_car}</td>
                      <td>{tenants.find((tenant) => tenant.id === rent.id_tenant)?.name}</td>
                      <td>{rent.date_borrow}</td>
                      <td>{rent.date_return}</td>
                      <td>{rent.down_payment}</td>
                      <td>{rent.discount}</td>
                      <td>
                        <button
                          className="btn btn-danger me-2 btn-sm"
                          onClick={() => handleDelete(rent.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning me-2 btn-sm"
                          onClick={() => handleEdit(rent)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rents.length === 0 && <p className="text-center">Tunggu, jika halaman belum termuat di anjurkan untuk refresh</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentPage;