import ProductManager from "./models/productManager.js";
import __dirname from "./utils.js";

const pathJson = `${__dirname}/Db/products.json`;

//Instancia del Product Manager
const prodManager = new ProductManager(pathJson);

//Servidor Socket
const sockets = (socketServer)=>{
    let addProduct = [];
    socketServer.on('connection', (socket)=>{

        //Recepcion ingreso de producto del Front End (realTimeProducts.js)
        socket.on('productReceived',async (data)=>{
            await prodManager.addProduct(data);
            addProduct.push(data);
            //Emite respuesta del producto ya ingresado
            socketServer.emit('addedProducts', addProduct);
        });

        //Recepcion solicitud de eliminado de producto indicado por codigo
        socket.on('productToDelete', async (data)=>{
            const products = await prodManager.getProducts();
            const productDelete = products.find(prod => prod.code === data);
            if(!Boolean(productDelete)){
                return console.log(`Product with ${data} not founded`);
            }
            await prodManager.deleteProduct(productDelete.id);
            //Emite respuesta del producto eliminado
            socketServer.emit('deletedProduct',data );
        });
    });
};

export {sockets};

