//Imports
import fs from 'fs/promises';

class ProductManager{
    // Variable privada Id
    #id = 0;
    constructor(path){
        this.path = path;
        this.products = [];
    };

    //Metodo para agregar productos
    addProduct = async (product)=>{
        try {
            const allProd = await this.getProducts();
            //Id Autoincrementable
            if(allProd.length === 0){
                this.#id = 1;
            }else{
                this.#id = allProd[allProd.length-1].id+1;
            }
            //Destructuracion del objeto
            const {title, description, price, thumbail, code, stock, category, status} = product;
            //Comparacion de codigo existente
            const usedCode = allProd.some(prod => prod.code === code);
            //Validacion de codigo y datos ingresado
            if(usedCode){
                    console.log(`El codigo ${code} ya esta en uso`)
                }else if(title && description && price && thumbail && stock && category && thumbail ){
                    allProd.push({
                        id: this.#id,
                        title,
                        description,
                        price,
                        thumbail,
                        code,
                        stock,
                        category,
                        status: true
                });
                console.log('thisproducts', allProd);
                console.log(`The product with title ${title} was add success`);
                //Guarda el array de productos en archivo
                await fs.writeFile(this.path, JSON.stringify(allProd, null, 2));
            }else{
                console.log(`Missing fields to complete`);
            }
        } catch (error) {
                console.log(error);
        };
    };

    //Metodo que retorna el array de productos
    getProducts = async ()=>{
        try {
            //Obtengo los productos del archivo
            const productList = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(productList);
        } catch (error) {
            console.log("Error: Can't read the file", error);
        } 
    }

    //Metodo busqueda de producto por id
    getProductById = async (id)=>{
        //Utilizo el metodo getProducts() para obtener los productos del archivo
        const data = await this.getProducts();
        //Busco el producto por el id ingresado
        const foundProduct = data.find(product => product.id === id);
        if(foundProduct){
            console.log('The product selected is:', foundProduct);
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
            console.log('Product update succefully');
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
            if(product){
                let index = getData.findIndex(prod => prod.id === id);
                getData.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(getData, null, 2));
                console.log('Product delete!');
                return true;
            }else{
                console.log(`The product with id: ${id}, doesn't exist`);
                return false;
            }
        } catch (error) {
            console.log("Error: can't delete product", error);
        };
    };
};

export default ProductManager;


