import { estadoUsuario } from "./estadoUsuario";

export class Usuario{
    nombre: String;
    contra: String
    avatar: String;
    estado: estadoUsuario;
    contactosNombres: Array<String>;

    constructor(nombre: String, contra: string, avatar: String, estado: estadoUsuario, contactosNombres: Array<String>){
        this.avatar = avatar;
        this.contra = contra;
        this.estado = estado;
        this.nombre = nombre;
        this.contactosNombres = contactosNombres;
    }
}