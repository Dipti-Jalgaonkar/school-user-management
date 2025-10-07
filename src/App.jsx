import React, { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users from public/User.json
  useEffect(() => {
    fetch("/User.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("Users loaded:", data);
      })
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  return (
    <div>
      {!user ? (
        <Login users={users} onLogin={setUser} />
      ) : (
        <Dashboard user={user} users={users} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}

export default App;
