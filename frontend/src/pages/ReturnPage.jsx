import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ReturnPage = () => {
  const [returns, setReturns] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    id_tenant: '',
    id_car: '',
    id_penalties: '',
    date_borrow: '',
    date_return: '',
    down_payment: '',
    discount: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const ReturnsApi = 'http://127.0.0.1:8000/api/a24/returns';
  const TenantApi = 'http://127.0.0.1:8000/api/a24/regis';
  const CarsApi = 'http://127.0.0.1:8000/api/a24/cars';
  const PenaltiesApi = 'http://127.0.0.1:8000/api/a24/penalties';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [returnsRes, tenantRes, carsRes, penaltiesRes] = await Promise.all([
        axios.get(ReturnsApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(TenantApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(CarsApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(PenaltiesApi, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setReturns(returnsRes.data);
      setTenant(tenantRes.data);
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
    //     const [ returnsRes, tenantRes, carsRes, penaltiesRes ] = await Promise.all([
    //     axios.get(ReturnsApi, {headers: { Authorization: `Bearer ${token}` }}),
    //     axios.get(TenantApi, {headers: { Authorization: `Bearer ${token}` }}),
    //     axios.get(CarsApi, {headers: { Authorization: `Bearer ${token}` }}),
    //     axios.get(PenaltiesApi, {headers: { Authorization: `Bearer ${token}` }}),
    //     ])
    //     setReturns(returnsRes.data)
    //     setTenant(tenantRes.data)
    //     setCars(carsRes.data)
    //     setPenalties(penaltiesRes.data)
    // }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'put' : 'post';
    const url = editId ? `${ReturnsApi}/${editId}` : ReturnsApi;

    try {
      const response = await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        id_tenant: '',
        id_car: '',
        id_penalties: '',
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
      text: 'Ya udh di hapus aja!',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${ReturnsApi}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReturns(returns.filter((rtn) => rtn.id !== id));
        Swal.fire('Success', 'Data berhasil dihapus', 'success');
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Failed to delete data', 'error');
      }
    }
  };

  const handleEdit = (rtn) => {
    setForm(rtn);
    setEditId(rtn.id);
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
          <h3 className="text-center mb-4">{editId ? 'Update' : 'Create'} Return</h3>
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
                {tenant.map((tenant) => (
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
              <label className="form-label">Penalty</label>
              <select
                name="id_penalties"
                value={form.id_penalties}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Pilih Penalty</option>
                {penalties.map((penalty) => (
                  <option key={penalty.id} value={penalty.id}>
                    {penalty.penalties_name} - {penalty.penalties_total}
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
                placeholder="Masukkan discount"
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
          <h3 className="text-center mb-4">Return Data List</h3>
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
                    <th>Tenant</th>
                    <th>Penalty</th>
                    <th>Date Borrow</th>
                    <th>Date Return</th>
                    <th>Discount</th>
                    <th>Penalty Total</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((rtn) => (
                    <tr key={rtn.id}>
                      <td>{cars.find((car) => car.id === rtn.id_car)?.name_car}</td>
                      <td>{tenant.find((tenant) => tenant.id === rtn.id_tenant)?.name}</td>
                      <td>{penalties.find((penalty) => penalty.id === rtn.id_penalties)?.penalties_name}</td>
                      <td>{rtn.date_borrow}</td>
                      <td>{rtn.date_return}</td>
                      <td>{rtn.discount}</td>
                      <td>{rtn.penalties_total}</td>
                      <td>{rtn.total}</td>
                      <td>
                        <button
                          className="btn btn-danger me-2 btn-sm"
                          onClick={() => handleDelete(rtn.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning me-2 btn-sm"
                          onClick={() => handleEdit(rtn)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {returns.length === 0 && <p className="text-center">Tunggu, jika halaman belum termuat di anjurkan untuk refresh</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;