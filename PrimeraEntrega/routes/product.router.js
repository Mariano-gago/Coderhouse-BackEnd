//Imports
import { Router } from "express";
import {addProducts, deleteProduct, getAllProducts, getProductById, updateProduct} from "../controllers/productsControllers.js";


const productRouter = Router();

//Router obtener todos los Productos o con limite de cantidad 
productRouter.get('/', getAllProducts);

//Router obtener producto por id
productRouter.get('/:pid', getProductById);

//Agregar Producto
productRouter.post('/', addProducts);

//Actualizar Producto
productRouter.put('/:pid', updateProduct);

//Borrar Producto
productRouter.post('/:pid', deleteProduct);

export {productRouter};