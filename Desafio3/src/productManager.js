//Imports
//import path from 'path';
import fs from 'fs/promises';


//Clase para crear objeto productos
class Products{
    constructor(title, description,price, thumbail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbail = thumbail;
        this.code = code;
        this.stock = stock;
    }
}


//Clase ProductManager
class ProductManager{
    // Variable privada Id
    #id = 0;
    constructor(path){
        this.path = path;
        this.products = [];
    }

    //Metodo privado para id autoincrmentable
    #getId = ()=>{
        if(this.products.length === 0){
            return this.#id = 1;
        }else{
            return this.#id = this.products[this.products.length-1].id+1;
        }
    }

    //Metodo para agregar productos
    addProduct = async (product)=>{
        try {
            //Destructuracion del objeto
            const {title, description, price, thumbail, code, stock} = product;
            //Comparacion de codigo existente
            const usedCode = this.products.some(prod => prod.code === code);
            //Validacion de codigo y datos ingresado
            if(usedCode){
                    console.log(`El codigo ${code} ya esta en uso`)
                }else if(title && description && price && thumbail && stock){
                    this.products.push({
                        id: this.#getId(),
                        title,
                        description,
                        price,
                        thumbail,
                        code,
                        stock
                });
                console.log(`El producto ${title} fue agregado con exito`);
                //Guarda el array de productos en archivo
                await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            }else{
                console.log(`Faltan campos por completar`);
            }
        } catch (error) {
                console.log(error);
        }
    }

    //Metodo que retorna el array de productos
    getProducts = async ()=>{
        try {
            //Obtengo los productos del archivo
            const productList = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(productList);
        } catch (error) {
            console.log('Error: No se pudo leer el archivo', error);
        } 
    }

    //Metodo busqueda de producto por id
    getProductById = async (id)=>{
        //Utilizo el metodo getProducts() para obtener los productos del archivo
        const data = await this.getProducts();
        //Busco el producto por el id ingresado
        const foundProduct = data.find(product => product.id === id);
        if(foundProduct){
            console.log('El producto seleccionado es:', foundProduct);
            return foundProduct;
        }else{
            console.log('Error: Not Found');
        }
    }

    //Metodo Actualiza el producto por el id
    updateProduct = async (id, data)=>{
        try {
            //Utilizo el metodo getProductById() para obtener el archivo a actualizar
            const getData = await this.getProductById(id);
            //Utilizo el metodo getProducts() para obtener todos los productos
            const allData = await this.getProducts();
            //Obtengo el indice del producto indicado y modifico el objeto
            let prodIndex = allData.findIndex(prod => prod.id === id);
            allData[prodIndex] = {...getData,...data};
            //Sobreescribo el archivo con los nuevos valores
            await fs.writeFile(this.path, JSON.stringify(allData, null, 2));
            console.log('Producto actualizado correctamente');
        } catch (error) {
            console.log('Error: No se pudo actualizar el producto', error);
        }
    }

    //Metodo para eliminar un producto
    deleteProduct = async (id)=>{        
        try {
            //Obtengo los productos del archivo con el metodo getProducts y busco el indice por el id
            const getData = await this.getProducts();
            let product = getData.find(product => product.id == id);
            console.log(product);
            if(product){
                let index = getData.findIndex(prod => prod.id === id);
                getData.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(getData, null, 2));
                console.log('El producto fue eliminado!')
            }else{
                console.log(`El producto con el id ${id}, no existe`);
            }
        } catch (error) {
            console.log('Error: no se pudo eliminar el producto', error);
        }
    }
}

export default ProductManager;

/* Testing */

//Path
//const pathJson = `./products.json`;
//console.log('path', pathJson);

//async function test(){
    //Instancia de clase ProductManager agregando el path
//const gestionProduct = new ProductManager(pathJson);

// Instancia de la clase Products para crear los objetos
/*const andesIpa = new Products('Andes Origen', 'Ipa Andina', 1850, './AndesIpa', 'Aipa1', 1000);
const bud = new Products('Budwaiser', 'Tradicional rubia', 1100, './bud', 'bud1', 500);
const stella = new Products('Stella Artois Noir', 'Cerveza negra', 2000, './stellaNoir', 'noir1', 550);
const patagonia = new Products('Patagonia Weisse', 'Cerveza de trigo', 2350, './weisse', 'pwei', 250);
const heineken = new Products('Heineken', 'Cerveza Lager', 1600, './heineken', 'hei23', 500);
const corona = new Products('Corona', 'Cerveza Mexicana', 1950, './corona', 'cor123', 1200);
const quilmes = new Products('Quilmes Stout', 'Cerveza Negra', 850, './quilStout', 'stout5', 500);
const aguila = new Products('Peñon del Aguila', 'Cerveza Cordobeza', 950, './paguila', 'agui', 300);
const schneider = new Products('Schneider', 'Cerveza Lager', 900, './schneider', 'sche', 300);
const imperial = new Products('Imperial Ipa', 'Cerveza Ipa', 2100, './impipa', 'impipa', 400); */

//Objeto con el mismo 'code' que el objeto anterior para testear validacion por codigo
//const imperialGolden = new Products('Imperial Golden', 'Cerveza Golden',2500 , './impGold', 'impipa', 300);


// Agrega los objetos creados con el metodo addProduct
/*await gestionProduct.addProduct(andesIpa);
await gestionProduct.addProduct(bud); 
await gestionProduct.addProduct(stella);
await gestionProduct.addProduct(patagonia);
await gestionProduct.addProduct(heineken);
await gestionProduct.addProduct(corona);
await gestionProduct.addProduct(quilmes);
await gestionProduct.addProduct(aguila);
await gestionProduct.addProduct(schneider);
await gestionProduct.addProduct(imperial);
//await gestionProduct.addProduct(imperialGolden); */

// Verificacion de arreglo con los productos agregados
//await gestionProduct.getProducts();

// Busqueda de producto por su id
//await gestionProduct.getProductById(9);
//gestionProduct.getProductById(11);  //id inexistente, indica error

//Actualizacion de producto por id
//await gestionProduct.updateProduct(10, {price: 123, title: 'Imperial' });

//Elimina producto por id
//await gestionProduct.deleteProduct(4);
//}

//test();
