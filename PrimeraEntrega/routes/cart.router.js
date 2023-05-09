//Imports
import { Router } from "express";
import {addToCart, createCart, getCartById} from '../controllers/cartsControllers.js';


//Router
const cartRouter = Router();

//Router crear Carrito
cartRouter.post('/', createCart);

//Router obtener carrito por su id
cartRouter.get('/:cid', getCartById);

//Router agregar producto al carrito seleccionado
cartRouter.post('/:cid/product/:pid', addToCart);

export {cartRouter};