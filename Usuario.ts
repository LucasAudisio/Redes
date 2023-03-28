import { estadoUsuario } from "./estadoUsuario";

export class Usuario{
    id: Number;
    nombre: String;
    avatar: String;
    estado: estadoUsuario;
    contactosIDS: Array<Number>;

    constructor(id: Number, nombre: String, avatar: String, estado: estadoUsuario, contactosIDS: Array<Number>){
        this.avatar = avatar;
        this.estado = estado;
        this.id = id;
        this.nombre = nombre;
        this.contactosIDS = contactosIDS;
    }
}