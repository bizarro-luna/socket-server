import Servervidor from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";
import  router  from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';


const server =  Servervidor.instance;

//bodyParser
server.app.use(bodyParser.urlencoded({extended:true}));    
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({origin:true,credentials:true}));


//Rutas de servicio
server.app.use('/',router);



server.start(()=>{
    console.log(`Servicio inicializado en el puerto ${SERVER_PORT}`);
});
