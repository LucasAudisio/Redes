export class Mensaje{
    idUsuarioAutor: Number;
    idUsuarioReceptor: Number;
    mensaje: String;
    fecha: String;
    estado: String;

    constructor(idUsuarioAutor: Number, idUsuarioReceptor: Number, mensaje: String, fecha:String, estado: String){
        this.estado = estado;
        this.fecha = fecha;
        this.idUsuarioReceptor = idUsuarioReceptor;
        this.idUsuarioAutor = idUsuarioAutor;
        this.mensaje = mensaje;
    }
}