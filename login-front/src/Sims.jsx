import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sims() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://192.168.45.205:3001/data");
        if (res.status === 401) {
          navigate("/"); // si no hay login, volver a /
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error al traer data:", err);
      }
    })();
  }, [navigate]);

  if (!data) return <p style={{ padding: "2rem" }}>Cargando datos...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Bienvenido a la sección Sims 🎮</h1>

      {/* Tarjeta de Elvira Lápida */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          margin: "2rem 0",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          maxWidth: "800px"
        }}
      >
        <img
          src="/elvira.jpg"   // 👈 asegurate de que el archivo sea public/elvira.jpg
          alt="Elvira Lápida (NPC) - The Sims 4"
          style={{
            width: "250px",
            borderRadius: "10px",
            objectFit: "cover"
          }}
        />
        <div>
          <h2>Elvira Lápida</h2>
          <p style={{ lineHeight: "1.5" }}>
            Elvira Lápida es la matriarca de la familia Lápida (Goth en inglés),
            una de las familias más icónicas y misteriosas del universo de Los Sims.
            Conocida por su estilo elegante y gótico, representa el carácter
            oscuro y clásico de esta saga.  
            <br />
            Su familia está compuesta por Mortimer (su esposo), Cassandra (su hija mayor)
            y Alejandro (su hijo menor). Los Lápida suelen vivir en grandes mansiones,
            rodeados de leyendas paranormales y secretos familiares.
          </p>
        </div>
      </div>

      {/* Mock del backend (expansiones) */}
      <section>
        <h3>{data.game}</h3>
        <ul>
          {Array.isArray(data.expansions) &&
            data.expansions.map((exp) => (
              <li key={exp.id}>
                {exp.name} ({exp.year})
              </li>
            ))}
        </ul>
        <p style={{ color: "#555" }}>
          Último login: {new Date(data.lastLogin).toLocaleString()}
        </p>
      </section>
    </div>
  );
}
