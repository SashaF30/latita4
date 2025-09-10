import express from "express";
import cors from "cors";  
const app = express();
app.use(express.json());



// 🚀 habilitar CORS para permitir que React (5173) hable con el back
app.use(cors({
  origin: "http://192.168.45.205:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Mock de usuarios
const users = [
  { id: 1, email: "sasha@test.com", password: "123456" },
  { id: 2, email: "nico@test.com", password: "abcdef" }
];

// Simulación de sesión
let loggedUser = null;

// 🟢 Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, error: "Credenciales inválidas" });
  }

  loggedUser = user;
  res.json({ success: true, message: "Login exitoso", redirectTo: "/sims" });
});

// 🟢 Nuevo endpoint: data mock
app.get("/data", (req, res) => {
  if (!loggedUser) {
    return res.status(401).json({ error: "Debes iniciar sesión primero" });
  }

  // Mock data (ejemplo de lo que después será data de los Sims 4)
  const mockData = {
    game: "The Sims 4",
    expansions: [
      { id: 1, name: "City Living", year: 2016 },
      { id: 2, name: "Cats & Dogs", year: 2017 },
      { id: 3, name: "Seasons", year: 2018 }
    ],
    lastLogin: new Date().toISOString()
  };

  res.json(mockData);
});

app.listen(3001, () => {
  console.log("✅ Servidor corriendo en http://localhost:3001");
});
