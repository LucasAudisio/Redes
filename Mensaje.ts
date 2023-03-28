import { estadoMensaje } from "./estadoMensaje";

export class Mensaje{
    idMensaje: Number;
    idUsuarioAutor: Number;
    idUsuarioReceptor: Number;
    mensaje: String;
    fecha: Date;
    estado: estadoMensaje;

    constructor(idMensaje: Number, idUsuarioAutor: Number, idUsuarioReceptor: Number, mensaje: String, fecha: Date, estado: estadoMensaje){
        this.idMensaje = idMensaje;
        this.estado = estado;
        this.fecha = fecha;
        this.idUsuarioReceptor = idUsuarioReceptor;
        this.idUsuarioAutor = idUsuarioAutor;
        this.mensaje = mensaje;
    }
}