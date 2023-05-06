import { Router } from "express";
import ProductManager from "../src/productManager.js";
import path from 'path';
import __dirname from 'path';

//Path
const pathJson = path.join(`${__dirname}/../db/products.json`);

const productRouter = Router();

//Instancia Clase ProductManager
const productsManager = new ProductManager(pathJson);

productRouter.get('/', async (req, res)=>{
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
});

productRouter.get('/:pid', async (req, res)=>{
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
            })
        }
    }catch (error){
        console.log(error);
    }
});

//Agregar Producto
productRouter.post('/', async (req, res)=>{
    try {
        const product = req.body;
        await productsManager.addProduct(product);

    res.status(201).json({
        message: 'Producto agregado',
        product: product
    });
    } catch (error) {
        console.log(error);
    }
});

productRouter.put('/:pid', async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const newProductData = req.body;
        await productsManager.updateProduct(pid, newProductData);
        res.status(201).json({
            message: "Producto actualizado correctamente"
        })
    } catch (error) {
        console.log(error);
    }
    
});

//Delete
productRouter.post('/:pid', async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const prodDelete = await productsManager.deleteProduct(pid);
        
        if(prodDelete){
            res.status(200).json("El producto fue eliminado");
        }else{
            res.status(400).json("No se pudo eliminar el producto")
        }
        
    } catch (error) {
        console.log("No se pudo eliminar el producto", error);
    };    
})



export {productRouter};