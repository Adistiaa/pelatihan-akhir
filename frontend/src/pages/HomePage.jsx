import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const HomePage = () => {
  const token = localStorage.getItem('token');
  const returnsApi = 'http://127.0.0.1:8000/api/a24/returns';
  const tenantApi = 'http://127.0.0.1:8000/api/a24/regis';
  const carsApi = 'http://127.0.0.1:8000/api/a24/cars';
  const penaltiesApi = 'http://127.0.0.1:8000/api/a24/penalties';
  const rentsApi = 'http://127.0.0.1:8000/api/a24/rent';

  const [rents, setRents] = useState([]);
  const [returns, setReturns] = useState([]);
  const [cars, setCars] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Set loading ke true sebelum fetching data
    try {
      const [returnsRes, tenantRes, carsRes, penaltiesRes, rentsRes] = await Promise.all([
        axios.get(returnsApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(tenantApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(carsApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(penaltiesApi, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(rentsApi, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setReturns(returnsRes.data);
      setTenants(tenantRes.data);
      setCars(carsRes.data);
      setPenalties(penaltiesRes.data);
      setRents(rentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
    } finally {
      setLoading(false); // Set loading ke false setelah fetching selesai
    }
  };

  
//   const fetchData = async () => {
//     const [returnsRes, tenantRes, carsRes, penaltiesRes,rentsRes] = await Promise.all([
//       axios.get(returnsApi, { headers: { Authorization: `Bearer ${token}` } }),
//       axios.get(tenantApi, { headers: { Authorization: `Bearer ${token}` } }),
//       axios.get(carsApi, { headers: { Authorization: `Bearer ${token}` } }),
//       axios.get(penaltiesApi, { headers: { Authorization: `Bearer ${token}` } }),
//       axios.get(rentsApi, { headers: { Authorization: `Bearer ${token}` } }),
//     ])
//     setReturns(returnsRes.data)
//     setTenants(tenantRes.data)
//     setCars(carsRes.data)
//     setPenalties(penaltiesRes.data)
//     setRents(rentsRes.data)
//   }

  
  return (
    <div className="container">
      <div className="card shadow container mt-4">
        <div className="text-center">
          <h3 className="mt-3">Rents List</h3>
          <hr />
        </div>
        <div className="card-body">
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
                    <th>Date Borrow</th>
                    <th>Date Return</th>
                    <th>Discount</th>
                    <th>Down Payment</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rents.map((rent) => (
                    <tr key={rent.id}>
                      <td>{cars.find((car) => car.id === rent.id_car)?.name_car}</td>
                      <td>{tenants.find((tenant) => tenant.id === rent.id_tenant)?.name}</td>
                      <td>{rent.date_borrow}</td>
                      <td>{rent.date_return}</td>
                      <td>{rent.discount}</td>
                      <td>{rent.down_payment}</td>
                      <td>{rent.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rents.length === 0 && <p className="text-center">Tunggu, jika halaman belum termuat di anjurkan untuk refresh</p>}
            </>
          )}
        </div>
      </div>
      <div className="card shadow container mt-4">
        <div className="text-center">
          <h3 className="mt-3">Returns List</h3>
          <hr />
        </div>
        <div className="card-body">
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
                  </tr>
                </thead>
                <tbody>
                  {returns.map((rtn) => (
                    <tr key={rtn.id}>
                      <td>{cars.find((car) => car.id === rtn.id_car)?.name_car}</td>
                      <td>{tenants.find((tenant) => tenant.id === rtn.id_tenant)?.name}</td>
                      <td>{penalties.find((penalty) => penalty.id === rtn.id_penalties)?.name_penalties}</td>
                      <td>{rtn.date_borrow}</td>
                      <td>{rtn.date_return}</td>
                      <td>{rtn.discount}</td>
                      <td>{rtn.penalties_total}</td>
                      <td>{rtn.total}</td>
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

export default HomePage;