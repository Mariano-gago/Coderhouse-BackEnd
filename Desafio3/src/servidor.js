//Imports
import ProductManager from './productManager.js';
import express from 'express';

//Instancia Clase ProductManager
const productManager = new ProductManager('src/products.json');

//Puerto
const PORT = 8080;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Endpoints GET
app.get('/', (req, res)=>{
    res.send('<h1><strong>Desafio 3 Servidor Express</strong></h1>')
});

app.get('/products', async (req, res)=>{
    try {
        //Obtengo los productos del ProductManager
        const allProducts = await productManager.getProducts();
        //Extraigo el valor limite
        const {limit}= req.query;
        //Determino el caracter ingresado y muestro los productos
        if(limit === ""){
            res.status(200).send(
                {status: "ok",
                message: allProducts
                });
        }else{
            res.send(allProducts.slice(0, limit));
        }
    } catch (error) {
        console.log('Error: No se pudo obtener los productos', error);
    }
});

app.get('/products/:pid', async (req, res)=>{
    try {
        //Convierto el string ingresado en numero
        const pid = parseInt(req.params.pid);
        //Valido si el valor ingresado en un numero
        if(isNaN(pid)){
            return res.status(400).json({
                message: 'El valor ingresado es incorrecto'
                });
        }
        //Obtengo el producto con el metodo getProductById
        const prodSelect = await productManager.getProductById(pid);
        //Validacion, si existe retorno el producto
        if(!prodSelect){
            res.status(404).json({
                message: 'El producto buscado no existe'
                });
        }else{
            res.status(200).json(prodSelect);
        }
    } catch (error) {
        console.log('Error: No se pudo obtener el producto elegido', error)
    }
});


app.listen(PORT, ()=> console.log(`Server in port ${PORT}`));
