import { getAllProductsService, getProductService,createProductService,deleteProductService } from "../services/products.services.js";


export async function getAllProducts(req, res) {
    const category = req.query.category;
    try{
        const products = await getAllProductsService(category);
        if(products.length > 0){
            res.status(200).send({
                message: "Productos encontrados",
                data: products
            })
        }else{
            res.status(404).send({
                message: "Producto/s no encontrado/s"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "Error interno"
        })
    }
}

export async function getProduct(req, res) {
    const id = req.params.id;
    if(id){
        try{
            const product = await getProductService(id);
            console.log(product)
            if(product){
                res.send({
                    message: "Producto encontrado",
                    data: product
                })
            }else{
                res.status(404).send({
                    message: "Producto no encontrado"
                })
            }
        }catch(error){
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        res.status(400).send({
            message: "el id del producto es necesario"
        })
    }
}

export async function createProduct(req, res) {
    const product=req.body;
    if(product){
        try{
            const new_product = await createProductService(product)
            res.status(200).send({
                message: "Producto creado correctamente",
                data:new_product
                
            })
        } catch(error){
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        res.status(400).send({
            message: "Los datos del producto son necesarios"
        })
    }
}

export async function deleteProduct(req, res) {
    const id = req.params.id;
    if(id){
        try{
            const id_eliminado = await deleteProductService(id);
            console.log(id_eliminado)
            if(id_eliminado){
                res.send({
                    message: "Producto eliminado",
                    data: id
                })
            }else{
                res.status(404).send({
                    message: "Producto no encontrado"
                })
            }
        }catch(error){
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        res.status(400).send({
            message: "el id del producto es necesario"
        })
    }
}