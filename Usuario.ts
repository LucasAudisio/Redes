export class Usuario{
    id: Number;
    nombre: String;
    avatar: String;
    estado: String;

    constructor(id: Number, nombre: String, avatar: String, estado: String){
        this.avatar = avatar;
        this.estado = estado;
        this.id = id;
        this.nombre = nombre;
    }
}