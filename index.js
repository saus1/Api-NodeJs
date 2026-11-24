import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import rutasProductos from "./src/routes/products.routes.js";
import authRouter from './src/routes/auth.routes.js';

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

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

