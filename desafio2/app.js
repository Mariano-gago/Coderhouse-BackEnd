//Imports
const path = require('path');
const fs = require('fs/promises');


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
            return this.#id = this.products[this.products.length-1].id+1;;
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
            //Obtengo el indice del producto indicado y modifico el objeto
            let prodIndex = this.products.findIndex(prod => prod.id === id);
            this.products[prodIndex] = {...getData, ...data};
            
            //Sobreescribo el archivo con los nuevos valores
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
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
            let prodIndex = getData.findIndex(prod => prod.id === id);

            console.log('proIndex', prodIndex);
            //Elimino el producto con metodo splice
            this.products.splice(prodIndex,1);
            //console.log('thisproducts', this.products);
            //Sobreescribo el archivo con el nuevo array de productos
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log('El producto fue eliminado!')
        } catch (error) {
            console.log('Error: no se pudo eliminar el producto', error);
        }
    }
}

/* Testing */

//Path
const pathJson = path.join(`${__dirname}/products.json`);
//console.log('path', pathJson);

//Instancia de clase ProductManager agregando el path
const gestionProduct = new ProductManager(pathJson);

// Instancia de la clase Products para crear los objetos
const remera = new Products('Remera', 'Manga larga blanca talle L', 5060, './remera', 1234, 50);
const musculosa = new Products('Musculosa', 'Blanca Lisa', 1200, './musculosa', 551, 80);
const gorra = new Products('Gorra', 'Negra con vicera', 2200, './gorra', 'abcg', 550);
const buso = new Products('Buso', 'Azul con capucha', 8500, './buso', 111, 100);

//Objeto con el mismo 'code' que el objeto anterior para testear validacion por codigo
const pantalon = new Products('Pantalon', 'Joggin gris','./pantalon', 5500, 111, 40);


// Agrega los objetos creados con el metodo addProduct
gestionProduct.addProduct(buso);
gestionProduct.addProduct(musculosa); 
gestionProduct.addProduct(remera);
gestionProduct.addProduct(gorra);
gestionProduct.addProduct(pantalon);//Producto con codigo repetido 

// Verificacion de arreglo con los productos agregados
gestionProduct.getProducts();

// Busqueda de producto por su id
gestionProduct.getProductById(2);
/*gestionProduct.getProductById(5); */ //id inexistente, indica error

//Actualizacion de producto por id
gestionProduct.updateProduct(1, {title: 'Campera', description: 'Unisex color blanco', thumbail: './campera' });

//Elimina producto por id
gestionProduct.deleteProduct(4);

