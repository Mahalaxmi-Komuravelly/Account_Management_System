import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axiosInstance.js";

const MoneyTransfer = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users); // <-- this must be an array
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };
  fetchUsers();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!receiverId || !amount) {
      setError("Select a receiver and enter amount");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.post(
        "/api/account/transfer",
        { receiverId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(`₹${amount} sent successfully!`);
      setAmount("");
      setReceiverId("");
    } catch (err) {
      setError(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
      <p>Your Balance: ₹{user.balance}</p>
      <form onSubmit={handleSubmit}>
        <select value={receiverId} onChange={(e) => setReceiverId(e.target.value)}>
          <option value="">Select Receiver</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Money"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default MoneyTransfer;