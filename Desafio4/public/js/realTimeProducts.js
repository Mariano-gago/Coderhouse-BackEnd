const productSocket = io();

//Dom
const form = document.querySelector('#form')
const inputTitle = document.querySelector('#title');
const inputDescription = document.querySelector('#description');
const inputCode = document.querySelector('#code');
const inputPrice = document.querySelector('#price');
const inputStock = document.querySelector('#stock');
const inputCategory = document.querySelector('#category');
const inputImage = document.querySelector('#image');
const btnAdd = document.querySelector('#btnAdd');
const btnDel = document.querySelector('#btnDel');
const productContainer = document.querySelector("#productContainer");

//Funcion para formar el objeto con los datos ingresados en el formulario
const dataForm = ()=>{
    let product = {
        title : inputTitle.value,
        description : inputDescription.value,
        code : inputCode.value,
        price : inputPrice.value,
        stock : inputStock.value,
        category : inputCategory.value,
        thumbail : inputImage.value,
        status: true
    } 
    return product;
};

//Funcion para validar los datos ingresados del formulario
const validation = ()=>{
    if(inputTitle.value && inputDescription.value && inputCode.value && inputCategory.value && inputPrice.value && inputStock.value){
        console.log('Datos Completos');
        return true;
    }else{
        alert('Datos Incompletos');
        return false;
    }
}

//Prevent default
form.addEventListener('submit', (e)=>{
    e.preventDefault();
});

//Evento click en agregar producto
btnAdd.addEventListener('click', ()=>{
    if(validation()){
        //Emite el producto 
        productSocket.emit('productReceived', dataForm() );
        console.log('producto enviado');
    }
})
//Recibe respuesta e imprime los productos
productSocket.on('addedProducts', data =>{
    let productList = ''
    data.forEach((product)=>{
        productList = `
        <div class=" my-5 ms-5 card text-center" data-code=${product.code} style="width: 18rem;">
        <img src="${product.thumbail}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Codigo: ${product.code}</p>
            <p class="card-text">Precio: ${product.price}</p>
            <p class="card-text">Stock: ${product.stock}</p>
            <p class="card-text">Categoria: ${product.category}</p>
        </div>
    </div>
        `
    });
    productContainer.innerHTML += productList;
});


//Evento click para eliminar producto
btnDel.addEventListener('click', ()=>{
    const code  = inputCode.value;
    if(code === ""){
        return Swal.fire('Inserte el codigo del producto a eliminar');
    }
    //Emite el codigo para eliminar el producto
    productSocket.emit('productToDelete', code);
});

//Recibe respuesta y elimina el producto por el codigo
productSocket.on('deletedProduct', (data) =>{
    const title = inputTitle.value;
    const elementDelete = (data)=>{
        const productToDelete = document.querySelector(`[data-code="${data}"]`);
        productToDelete.parentNode.removeChild(productToDelete);
    };
    elementDelete(data);
    Swal.fire(`El producto ${title} fue eliminado con exito!`);
});


