import {
  buscarPorConsulta,
  crearProducto,
  eliminarProducto,
  obtenerPorId,
  obtenerProductos
} from "../models/products.models.js";

export const getAllProductsService = async (category) => {
    if(category){
        const products_q = await buscarPorConsulta(category)
        return products_q
    }else{
      const products = await obtenerProductos();
      console.log(products)
      return products
    }
}

export const getProductService = async (id) => {
  const product = await obtenerPorId(id)
  return product
}

export const createProductService = async (product) => {
  const new_product = await crearProducto(product);
  return new_product;
}

export const deleteProductService = async (id) => {
  const id_eliminado = await eliminarProducto(id);
  return id_eliminado;
}