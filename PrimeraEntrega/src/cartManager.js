//Imports
import fs from 'fs/promises';


class CartManager{
    static id = 0;

    constructor(path){
        this.id = CartManager.id++;
        this.path = path;
    }

    getCarts = async()=>{
        const fileContent = await fs.readFile(this.path, 'utf-8');
        const fileContentParse = JSON.parse(fileContent);
        try{
            if(fileContentParse.length === 0){
                console.log('No hay carritos');
            }
            return fileContentParse;
        }catch(error){
            console.log('Error: ', error);
        }
    }

    addCart = async(cart)=>{
        const fileContent = await fs.readFile(this.path, 'utf-8');
        const fileContentParse = JSON.parse(fileContent);

        let newCart = {id: CartManager.id++, ...cart};
        let idUsed = await fileContentParse.some(c => c.id === newCart.id);

        try{
            if(idUsed){
                let arrayCid = fileContentParse.map(cart => [cart.id]).flat();
                let cidMayor = Math.max(...arrayCid);
                newCart.id = cidMayor + 1;
                fileContentParse.push(newCart);
            }else{
                fileContentParse.push(newCart);
            };
            console.log('Carrito Creado');
            await fs.writeFile(this.path, JSON.stringify(fileContentParse, null, 2));
        }catch(error){
            console.log('Error: no se creo el carrito', error);
        };
    };

    addToCart = async(cart, product)=>{
        const fileContent = await fs.readFile(this.path, 'utf-8');
        const fileContentParse = JSON.parse(fileContent);

        try {
            let cartFoundIndex = fileContentParse.findIndex(c => c.id === cart.id)
            let productFoundIndex =fileContentParse[cartFoundIndex].products.findeIndex(p => p.id === product.id);
            let productnotExist = true;

            if(fileContentParse[cartFoundIndex].products[productFoundIndex]){
                fileContentParse[cartFoundIndex].products[productFoundIndex].quantity = fileContentParse[cartFoundIndex].products[productFoundIndex].quantity + 1;
                await fs.writeFile(this.path, JSON.stringify(fileContentParse, null, 2));
                console.log('Producto agregado al carrito');
            };
        } catch (error) {
            console.log("Error: ", error);
        };
        
    };

    getCartById = async (id)=>{
        const fileContent = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        let cartFound = fileContent.find(cart=> cart.id === id);
        try {
            if(cartFound){
                console.log(`Carrito con el id ${id} encontrado`);
                console.log('Carrito', cartFound);
                return cartFound;
            }else{
                console.log(`No se encuentra Carrito con id ${id}`);
            }
        } catch (error) {
            console.log("Error", error)
        }
    }
}
