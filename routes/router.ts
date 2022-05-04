import {Router,Response,Request} from 'express';
import { Socket } from 'socket.io';
import Servidor from '../classes/server';
import { usuariosConectados } from '../socktes/sockets';

//para crear api end points
const router = Router();

//Controlador
router.get('/mensajes',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        mensaje:'Todo esta bien'
    });

});


router.post('/mensajes',(req:Request,res:Response)=>{


    const cuerpo= req.body.cuerpo;
    const de    = req.body.de;

    const payload={
        de,
        cuerpo
    }
    const server = Servidor.instance;
    server.io.emit('mensaje-nuevo',payload);

    res.json({
        ok:true,
        cuerpo,
        de

    });

});


router.post('/mensajes/:id',(req:Request,res:Response)=>{


    const cuerpo= req.body.cuerpo;
    const de    = req.body.de;
    const id    = req.params.id;


    const payload={
        de,
        cuerpo
    }


    const server = Servidor.instance;
    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        id

    });

});


//Servicio para obtener todos los ID´s de los usuarios
router.get('/usuarios',(req:Request,res:Response)=>{

    const server=Servidor.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });


});


//Obtener usuarios y nombres
router.get('/usuarios/detalle',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    });


});


export default router;