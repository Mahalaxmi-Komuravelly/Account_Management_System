import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBalance = async () => {
            if (!user) return

            try {
                const token = localStorage.getItem('token')
                const response = await api.get('/api/account/balance', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setBalance(response.data.balance)
            } catch (error) {
                console.error('Error fetching balance', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBalance()
    }, [user])


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
