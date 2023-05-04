import { estadoUsuario } from "./estadoUsuario";

export class Usuario{
    nombre: String;
    avatar: String;
    estado: estadoUsuario;
    contactosNombres: Array<String>;

    constructor(nombre: String, avatar: String, estado: estadoUsuario, contactosNombres: Array<String>){
        this.avatar = avatar;
        this.estado = estado;
        this.nombre = nombre;
        this.contactosNombres = contactosNombres;
    }
}