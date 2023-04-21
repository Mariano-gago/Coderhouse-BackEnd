
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
    constructor(){
        this.products = [];
    }

    //Metodo privado para id autoincrmentable
    #getId = ()=>{
        if(this.products.length === 0){
            return this.#id = 1;
        }else{
            return this.#id = this.products.length + 1;
        }
    }

    //Metodo para agregar productos
    addProduct = (product)=>{
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
                })
            console.log(`El producto ${title} fue agregado con exito`);
        }else{
            console.log(`El faltan campos por completar`);
        }
    }

    //Metodo que retorna el array de productos
    getProducts = ()=>{
        return this.products;
    }

    //Metodo busqueda de producto por id
    getProductById = (id)=>{
        const foundProduct = this.products.find(product => product.id === id);
        if(foundProduct){
            console.log('El producto seleccionado es:', foundProduct);
        }else{
            console.log('Error: Not Found');
        }
    }
}

/* Testing */

// Instancia de la clase Products para crear los objetos
const remera = new Products('Remera', 'Manga larga blanca talle L', 5060, './remera', 1234, 50);
const buso = new Products('Buso', 'Azul con capucha', 8500, './buso', 111, 100);

//Objeto con el mismo 'code' que el objeto anterior para testear validacion por codigo
const pantalon = new Products('Pantalon', 'Joggin gris','./pantalon', 5500, 111, 40);

//Instancia de clase ProductManager
const gestionProduct = new ProductManager();

// Verificacion de arreglo vacio
console.log(gestionProduct.getProducts());

// Agrega los objetos creados con el metodo addProduct
gestionProduct.addProduct(remera);
gestionProduct.addProduct(buso);
gestionProduct.addProduct(pantalon);//Producto con codigo repetido

// Verificacion de arreglo con los productos agregados
console.log(gestionProduct.getProducts());

// Busqueda de producto por su id
gestionProduct.getProductById(2);
gestionProduct.getProductById(5); //id inexistente, indica error
