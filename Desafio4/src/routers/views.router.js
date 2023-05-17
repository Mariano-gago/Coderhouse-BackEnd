import { Router } from "express";
import ProductManager from "../models/productManager.js";
import __dirname from "../utils.js";

const pathJson = `${__dirname}/Db/products.json`;
const viewsRouter = Router();
const productManager = new ProductManager(pathJson);

//Vista Home
viewsRouter.get('/', async (req,res)=>{
    let products = await productManager.getProducts();
    res.render('home', {products});
});

//Vista realtimeproducts
viewsRouter.get('/realtimeproducts', async (req, res)=>{
    let products = await productManager.getProducts();
    res.render('realtimeproducts', {products});
});


export default viewsRouter;