//Imports
import CartManager from "../models/cartManager.js";
import ProductManager from "../models/productManager.js";
import __dirname from "../utils.js";

//Path
const pathJsonCarts = `${__dirname}/Db/carts.json`;
const pathJsonProducts = `${__dirname}/Db/products.json`;

//Instancia Clases
const cartManager = new CartManager(pathJsonCarts);
const productManager = new ProductManager(pathJsonProducts);

//Funcions Crear Carrito
const createCart = async (req, res)=>{
    try {
        const cart = {
            products:[]
        };
        await cartManager.createCart(cart);
        res.status(200).json({message: 'Cart Created!'});
    } catch (error) {
        console.log('Error: ', error);
    };
};

//Funcion para obtener carrito por id
const getCartById = async (req, res)=>{
    try {
        const cid = parseInt(req.params.cid);
        const getCarts = await cartManager.getCartById(cid)
        res.send(getCarts);
    } catch (error) {
        console.log('Error: ', error);
    };
};

//Funcion para agregar un producto al carrito
const addToCart = async (req, res)=>{
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const getCart = await cartManager.getCartById(cid);
        const getProd = await productManager.getProductById(pid);
        const productAdd = {
            id: getProd.id,
            quantity: 1
        };
        cartManager.addToCart(getCart, productAdd);
        res.status(200).json({
                message: 'Product added to cart'
                });
    } catch (error) {
        console.log('Error: ', error);
    };
};

//Export funciones
export {createCart,
        getCartById,
        addToCart};

