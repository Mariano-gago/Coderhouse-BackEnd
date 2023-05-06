
//imports
import  express  from "express";
import { productRouter } from "./routes/product.router.js";

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.send('<h1>Primera Entrega del Proyecto Final</h1>')
});

app.use('/api/products', productRouter);



app.listen(port, console.log(`Listen on port ${port}`));
