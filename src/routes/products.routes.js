import express from "express";
import { getAllProducts, getProduct,createProduct,deleteProduct } from "../controllers/products.controllers.js";
import { authentication } from "../middlewares/authentication.js";

const routes = express.Router();

routes.get("/products", getAllProducts);

routes.get("/products/:id", getProduct);

routes.post("/products/create",authentication,createProduct);

routes.delete("/products/:id", authentication, deleteProduct);

export default routes;