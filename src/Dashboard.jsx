import React, { useState } from "react";

export default function Dashboard({ user, users, onLogout }) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Only students
  const students = users.filter((u) => u.userType === "student");

  // Filter by name or subjects
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subjects.some((sub) =>
        sub.toLowerCase().includes(search.toLowerCase())
      )
  );

  // Student view
  if (user.userType === "student") {
    return (
      <div className="container">
        <h2>Welcome, {user.name}</h2>
        <button onClick={onLogout}>Logout</button>
        <div className="card">
          <p><b>Email:</b> {user.email}</p>
          <p><b>Language:</b> {user.language}</p>
          <p><b>Address:</b> {user.address}</p>
          <p><b>Standard:</b> {user.standard}</p>
          <p><b>Subjects:</b> {user.subjects.join(", ")}</p>
        </div>
      </div>
    );
  }

  // Admin view
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      <button
        style={{ marginLeft: "10px", background: "#4caf50", color: "white", padding: "6px 12px", borderRadius: "6px" }}
        onClick={() => setSelectedUser(user)}
      >
        My Details
      </button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table border="1" cellPadding="8" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Standard</th>
            <th>Subjects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.email}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.standard}</td>
              <td>{s.subjects.join(", ")}</td>
              <td>
                <button onClick={() => setSelectedUser(s)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedUser.name}</h3>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Language:</b> {selectedUser.language}</p>
            <p><b>Address:</b> {selectedUser.address}</p>
            <p><b>Standard:</b> {selectedUser.standard}</p>
            <p><b>Subjects:</b> {selectedUser.subjects.join(", ")}</p>
            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
