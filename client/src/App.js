import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);
  console.log(users);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/users/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API}/users`, form);
      }
      setForm({ name: "", email: "", phone: "" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({ name: user.name, email: user.email, phone: user.phone || "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>MERN CRUD</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", email: "", phone: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
