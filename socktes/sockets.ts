/**
 * Logica para los sockets
 */

import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";



export const usuariosConectados= new UsuariosLista(); 


export const conectarCliente=(cliente:Socket)=>{

    const usuario= new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

}

/**
 * Metodo que escucha cuando se desconecta un usuario
 * @param cliente 
 */
export const desconectar=(cliente:Socket)=>{

    cliente.on('disconnect',()=>{
        console.log('cliente desconectado');

        const usu=usuariosConectados.borrarUsuario(cliente.id);
        console.log("========="+usu?.id);

    });

}

/**
 * Escuchar mensaje
 * @param cliente 
 */
export const mensaje=(cliente:Socket,io:socketIO.Server)=>{

    cliente.on('mensaje',(payload:{de:string,cuerpo:string})=>{

        console.log('mensaje recibido: ',payload);

        io.emit('mensaje-nuevo',payload);

    });

}


/**
 * Metodo cuando ingresa un usario
 * @param cliente 
 */
export const login=( cliente:Socket )=>{

    cliente.on('configurar-usuario',(payload:{nombre:string},callback:Function)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        //La respuesta a Angular
        callback({
            ok:true,
            mensaje:'Usuario '+payload.nombre
        });

    });
}

