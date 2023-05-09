//imports
import  express  from "express";
import { productRouter } from "./routes/product.router.js";
import {cartRouter} from "./routes/cart.router.js";

const app = express();
//Port
const port = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//EndPoints
app.get('/', (req, res)=>{
    res.send('<h1>Primera Entrega del Proyecto Final</h1>')
});

//EndPoint Products
app.use('/api/products', productRouter);
//EndPoint Carts
app.use('/api/carts', cartRouter);

app.listen(port, console.log(`Listen on port ${port}`));
