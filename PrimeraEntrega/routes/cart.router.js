import CartManager  from "../src/cartManager.js";
import ProductManager from "../src/productManager.js";
import { Router } from "express";
import path from "path";
import __dirname from "path";
import {addToCart, createCart, getCartById} from '../controllers/cartsControllers.js';


const pathJson = path.join(`${__dirname}/../db/carts.json`);

const cartRouter = Router();
const cartManager = new CartManager();
const producManager = new ProductManager(pathJson);

cartRouter.post('/', createCart);

cartRouter.get('/:cid', getCartById);

cartRouter.post('/:cid/product/:pid', addToCart);

export {cartRouter};