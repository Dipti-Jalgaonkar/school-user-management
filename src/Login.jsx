import React, { useState } from "react";
import bcrypt from "bcryptjs";

export default function Login({ users, onLogin }) {

// console.log(bcrypt.hashSync("admin123", 10));
// console.log(bcrypt.hashSync("john123", 10));
// console.log(bcrypt.hashSync("jane123", 10));
// console.log(bcrypt.hashSync("nikhil123", 10));
// console.log(bcrypt.hashSync("priya123", 10));
// console.log(bcrypt.hashSync("liam123", 10));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }

    const found = users.find((u) => u.email === email);
    if (!found) {
      setError("Invalid email or password");
      return;
    }

    // Compare hashed password
    const isMatch = bcrypt.compareSync(password, found.password);
    if (!isMatch) {
      setError("Invalid email or password");
      return;
    }

    setError("");
    onLogin(found);
  };

  return (
    <div className="container">
      <h2>School Login</h2>
      <form className="glass-card" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
