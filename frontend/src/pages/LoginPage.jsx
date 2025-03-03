import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
    const [form, setForm] = useState({
        name: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/a24/auth/login", form);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userData", JSON.stringify({
                name: response.data.user.name,
                role: response.data.user.role
            }));

            navigate('/home');
            Swal.fire('Success', `Login Berhasil, ${response.data.user.name} (${response.data.user.role})`, 'success');
        } catch (error) {
            Swal.fire('Error', 'Login Gagal, periksa kembali nama dan password!', 'error');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card shadow" style={{ width: '28rem', borderRadius: '15px' }}>
                <div className="row g-0">
                    <div className="col-md-6 p-4">
                        <h5 className="card-title">Sign In</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input required value={form.name} type="text" name="name" onChange={handleInputChange} className="form-control" placeholder="Name" />
                            </div>
                            <div className="mb-3">
                                <input required value={form.password} type="password" name="password" onChange={handleInputChange} className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" style={{ background: '#4A5DF9', border: 'none' }}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white" style={{ background: '#4A5DF9', borderRadius: '0 15px 15px 0' }}>
                        <h4>Welcome to Login</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;