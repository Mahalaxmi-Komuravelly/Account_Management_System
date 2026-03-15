import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    if (!user) return <p>Loading user...</p>
    return (
        <div>
            <h2>Welcome {user.name}</h2>
            <h4>Balance Amount: {user.balance}</h4>
            <button onClick={() =>
                navigate("/money-transfer")
            }>
                Send Money
            </button>
            <button onClick={() =>
                navigate("/account-statement")
            }>
                Statement
            </button>
            <button onClick={() => {
                logout()
                navigate("/login")
            }}>Logout</button>
        </div>
    )
}

export default Dashboard
