import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const { login } = useAuth();

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(
                inputData.email,
                inputData.password
            )
            setInputData({
                email: "",
                password: ""
            })
            navigate("/dashboard");
        } catch (error) {
            setError(error?.response?.data?.message || "Login Failed")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter Email' name='email' value={inputData.email} onChange={handleChange} required />
                <input type="password" placeholder='Enter Password' name='password' value={inputData.password} onChange={handleChange} required />
                <button type='submit' disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login
