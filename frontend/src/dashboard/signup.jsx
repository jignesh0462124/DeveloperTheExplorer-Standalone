import { useState } from "react";
import { supabase } from "./supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Please check your email to verify.");
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h2>Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={styles.btn}>
          Create Account
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    color: "#fff",
  },
  card: {
    background: "#1e1e1e",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#222",
    color: "#fff",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
  },
};
