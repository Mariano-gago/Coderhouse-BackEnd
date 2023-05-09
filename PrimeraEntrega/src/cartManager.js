//Imports
import fs from 'fs/promises';
import path from 'path';
import __dirname from 'path';

//Path
const pathJson = path.join(`${__dirname}/../Db/carts.json`);

class CartManager{
    static id = 0;
    constructor(){
        this.id = CartManager.id++;
    }
    //Metodo para leer los datos del archivo carts.json
    #readFile = async ()=>{
        try {
            const fileContent = await fs.readFile(pathJson, 'utf-8');
            const fileContentParse = JSON.parse(fileContent);
            console.log(fileContentParse);
            return fileContentParse;
        } catch (error) {
            console.log("Error: can't read the file", error);
        }
    }

    //Metodo para obtener los carritos
    getCarts = async()=>{
        //Lectura de archivo carts.json
        const data = this.#readFile();
        try{
            if(data.length === 0){
                console.log('No carts');
            }
            return data;
        }catch(error){
            console.log('Error: ', error);
        }
    }

    //Metodo para crear un carrito
    createCart = async(cart)=>{
        //Lectura de archivo carts.json
        const data = await this.#readFile();
        //Creacion de nuevo objeto con el id y el carrito
        let newCart = {id: CartManager.id++, ...cart};
        //Busco los ids
        let idUsed = await data.some(c => c.id === newCart.id);
        try{
            if(idUsed){
                let arrayCid = data.map(cart => [cart.id]).flat();
                //Numero maximo para utilizar como id
                let cidMayor = Math.max(...arrayCid);
                newCart.id = cidMayor + 1;
                data.push(newCart);
            }else{
                data.push(newCart);
            };
            console.log('Cart Created!');
            await fs.writeFile(pathJson, JSON.stringify(data, null, 2));
        }catch(error){
            console.log('Error: not created cart', error);
        };
    };

    //Metodo para agregar productos al carrito indicado
    addToCart = async(cart, product)=>{
        const data = await this.#readFile();
        try {
            //Indice de Carrito
            let cartFoundIndex = data.findIndex(c => c.id === cart.id);
            //Busco el indice del producto dentro del carrito
            let productFoundIndex =data[cartFoundIndex].products.findIndex(p => p.id === product.id);
            let productNotExist = true;
            //Validacion de productos dentro del carrito para aumentar la cantidad en caso de que ya se encuentre el producto agregado
            if(data[cartFoundIndex].products[productFoundIndex]){
                data[cartFoundIndex].products[productFoundIndex].quantity = data[cartFoundIndex].products[productFoundIndex].quantity + 1;
                await fs.writeFile(pathJson, JSON.stringify(data, null, 2));
                console.log('Product add to cart');
            }else if(productNotExist){
                data[cartFoundIndex].products.push(product);
                await fs.writeFile(pathJson, JSON.stringify(data, null, 2));
                console.log('Product add to cart');
            }
        } catch (error) {
            console.log("Error: ", error);
        };
        
    };

    //Metodo para obtener el carrito por su id
    getCartById = async (id)=>{
        const data = await this.#readFile();
        let cartFound = data.find(cart=> cart.id === id);
        try {
            if(cartFound){
                console.log(`Cart with id: ${id} found`);
                console.log('Cart', cartFound);
                return cartFound;
            }else{
                console.log(`Not cart found with id: ${id}`);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };
};

export default CartManager;