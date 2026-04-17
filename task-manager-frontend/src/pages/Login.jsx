import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      alert("Signup successful, now login");
    } catch (err) {
      alert("Signup failed");
    }
  };

 return (
    <div>
    <h1 className="app-title">Taskly</h1>
    
  <div className="container">
    <h2>Login / Signup</h2>

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      placeholder="Password"
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />
<div className="button-group">
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleSignup}>Signup</button>
</div>
  </div>
  </div>
);
}

export default Login;