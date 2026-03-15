import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axiosInstance.js";

const AccountStatement = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/account/statement", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error("Error fetching statement", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatement();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div>
      <h2>Account Statement</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{new Date(tx.created_at).toLocaleDateString()}</td>
              <td style={{ color: tx.transaction_type === "credit" ? "green" : "red" }}>
                {tx.transaction_type}
              </td>
              <td>₹{tx.amount}</td>
              <td>{tx.sender_id === user.id ? "You" : tx.sender_id}</td>
              <td>{tx.receiver_id === user.id ? "You" : tx.receiver_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountStatement;