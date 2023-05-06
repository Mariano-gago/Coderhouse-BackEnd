//Imports
import fs from 'fs/promises';


//Clase para crear objeto productos
class Products{
    constructor(title, description,price, thumbail, code, stock, category){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbail = thumbail;
        this.code = code;
        this.stock = stock;
        this.category = category;
        
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
            const {title, description, price, thumbail, code, stock, category} = product;
            //Comparacion de codigo existente
            const usedCode = this.products.some(prod => prod.code === code);
            //Validacion de codigo y datos ingresado
            if(usedCode){
                    console.log(`El codigo ${code} ya esta en uso`)
                }else if(title && description && price && thumbail && stock && category ){
                    this.products.push({
                        id: this.#getId(),
                        title,
                        description,
                        price,
                        thumbail,
                        code,
                        stock,
                        category
                        
                });
                console.log('thisproducts', this.products);
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
            //console.log(product);
            if(product){
                let index = getData.findIndex(prod => prod.id === id);
                getData.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(getData, null, 2));
                console.log('El producto fue eliminado!');
                return true;
            }else{
                console.log(`El producto con el id ${id}, no existe`);
                return false;
            }
        } catch (error) {
            console.log('Error: no se pudo eliminar el producto', error);
        }
    }
}

export default ProductManager;


