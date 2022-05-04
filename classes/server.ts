
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO   from 'socket.io';
import http from 'http';
import * as socket from '../socktes/sockets';

export default class Servidor{


    private static _instance:Servidor;


    //Servidor
    public app:express.Application;
    public port:number;

    //Para sockets
    public io:socketIO.Server;

    private httpServer:http.Server;

    private constructor(){

        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer= new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, {
			cors: {
				origin: true,
				credentials: true
			}
		});

        this.escucharSockets();
    }

    //PAtron singleton
    public static get instance(){
        return this._instance || (this._instance= new this());
    }

    private escucharSockets(){
        console.log('Escuchando Sockets');

        this.io.on('connection',cliente=>{
            //Cuando se conecta alguien en automatico socket genera un id
            //console.log(cliente.id);

            //Conectar cliente
            socket.conectarCliente(cliente,this.io);

            //Obtener usuarios
            socket.obtenerUsuarios(cliente,this.io);

            //Mensajes
            socket.mensaje(cliente,this.io);

            //Desconectar
            socket.desconectar(cliente,this.io);

             //login
             socket.login(cliente,this.io);

             

        });

    }

    start(callback:Function){
        this.httpServer.listen(this.port,callback());
    }


}