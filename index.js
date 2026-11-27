import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rutasProductos from "./src/routes/products.routes.js";
import authRouter from './src/routes/auth.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/productos", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/fondoIndustria.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "fondoIndustria.jpg"));
});

app.use('/auth', authRouter);
app.use("/api", rutasProductos);

app.use((req, res, next) => {
    //console.log("test 2")
    res.status(404).json({
        error: "404 ruta no encontrada",
        mensaje: `el recurso ${req.url} no existe`
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

