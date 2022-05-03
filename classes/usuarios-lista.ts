import { Usuario } from "./usuario";

/**
 * Clase para la lista de usuarios
 */
export class UsuariosLista{


    private lista:Usuario[]=[];

    constructor(){}

    /**
     * Agregar un usuario
     * @param usuario 
     * @returns 
     */
    public agregar (usuario:Usuario):Usuario{
        console.log(usuario);
        this.lista.push(usuario);

        return usuario;
    }


    public actualizarNombre(id:string,nombre:string){

        for(let usuario of this.lista){
            if(usuario.id===id){
                usuario.nombre=nombre;
                break;
            }
        }

        console.log('==========Actualizando nombre usuario');
        console.log(this.lista);
    }


    /**
     * Obtener lista de usuarios
     * @returns 
     */
    public getLista():Usuario[]{
        return this.lista;
    }

    /**
     * Obtener usuario
     * @param id 
     * @returns 
     */
    public getUsuario(id:string){
        return this.lista.find(usuario=> usuario.id===id );
    }

    /**
     * Obtener los usuarios de una sala
     * @param sala 
     * @returns 
     */
    public getUsuariosSala(sala:string){
        return this.lista.filter(usuario =>{
            return usuario.sala===sala;
        });
    }


    /**
     * Borrar un usuario de la lista
     * @param id 
     * @returns 
     */
    public borrarUsuario(id:string){

        const usuarioTem= this.getUsuario(id);

        this.lista= this.lista.filter(usuario => usuario.id!==id);
        return usuarioTem;
    }


}