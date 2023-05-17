//Imports
import ProductManager from "../models/productManager.js";
import __dirname from "../utils.js";

//Path
const pathJson = `${__dirname}/Db/products.json`;

//Instancia Clase ProductManager
const productsManager = new ProductManager(pathJson);

//Funcion obtener todos los productos y limitados por cantidad
const getAllProducts = async (req, res)=>{
    try {
        const products = await productsManager.getProducts();
        const {limit} = req.query;
        if(!limit){
            res.status(200).json({
                message: products
            });
        }else{
            res.json({message: products.slice(0,limit)});
        }
    } catch (error) {
        console.log("No se pudo obtener los productos", error);
    }
};

//Funcion para agregar Productos
const addProducts = async (req, res)=>{
    try {
        const product = req.body;
        await productsManager.addProduct(product);
        res.status(201).json({
            message: 'Producto agregado',
            product: product
        });
    } catch (error) {
        console.log(error);
    };
}

//Funcion para actualizar productos
const updateProduct = async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const newProductData = req.body;
        await productsManager.updateProduct(pid, newProductData);
        res.status(201).json({
            message: "Producto actualizado correctamente"
        });
    } catch (error) {
        console.log(error);
    };
}

//Funcion para obtener un producto por id
const getProductById = async (req, res)=>{
    try{
        const pid = parseInt(req.params.pid) ;
        const foundProduct = await productsManager.getProductById(pid);
        if(foundProduct){
            res.status(200).json({
                message: foundProduct
            });
        }else{
            res.status(404).json({
                message:'No existe el producto indicado'
            });
        };
    }catch (error){
        console.log(error);
    };
};

//Funcion para borrar productos
const deleteProduct = async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const prodDelete = await productsManager.deleteProduct(pid);
        if(prodDelete){
            res.status(200).json("El producto fue eliminado");
        }else{
            res.status(400).json("No se pudo eliminar el producto");
        };
        
    } catch (error) {
        console.log("No se pudo eliminar el producto", error);
    };    
};

//Exports funciones
export {addProducts,
        updateProduct,
        deleteProduct,
        getProductById,
        getAllProducts};