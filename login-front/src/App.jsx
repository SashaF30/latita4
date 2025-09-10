import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://192.168.45.205:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Login exitoso");
        // 👉 Redirigimos a la página /sims
        navigate("/sims");
      } else {
        setMessage(data.error || "❌ Error en el login");
      }
    } catch (err) {
      setMessage("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Página de Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
