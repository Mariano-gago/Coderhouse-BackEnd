//imports
import  express  from "express";
import { productRouter } from "../src/routers/product.router.js";
import {cartRouter} from "../src/routers/cart.router.js";
import __dirname from "./utils.js";


//Views + handlebars + websocket
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import viewsRouter from './routers/views.router.js';
import {sockets} from './socket.js';

//Port
const port = process.env.PORT || 8080;

const app = express();
const httpServer = app.listen(port, ()=> console.log(`Listening on ${port}`));
//Instancia WebSocket
const socketServer = new Server(httpServer);

//handlebars configuracion
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*EndPoints*/
//EndPoint Products
app.use('/api/products', productRouter);
//EndPoint Carts
app.use('/api/carts', cartRouter);


//View endpoints
app.get('/', viewsRouter);
app.get('/realtimeproducts', viewsRouter);

sockets(socketServer);