import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Signup = () => {
    const { signup } = useAuth();

    const [inputData, setInputData] = useState({
        name: "",
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
            await signup(
                inputData.name,
                inputData.email,
                inputData.password
            )
            setInputData({
                name: "",
                email: "",
                password: ""
            })
            navigate("/login");           
        } catch (error) {
            setError(error?.response?.data?.message || "Signup Failed")
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name' name='name' value={inputData.name} onChange={handleChange} />
                <input type="email" placeholder='Enter Email' name='email' value={inputData.email} onChange={handleChange} />
                <input type="password" placeholder='Enter Password' name='password' value={inputData.password} onChange={handleChange} />
                <button type='submit' disabled={loading}>
                    {loading ? "Creating Account..." : "SignUp"}
                </button>
            </form>
            <p>Already have an account?<Link to="/login">Login</Link></p>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Signup
