import { estadoMensaje } from "./estadoMensaje";

export class Mensaje{
    id: Number;
    idUsuarioAutor: Number;
    idUsuarioReceptor: Number;
    mensaje: String;
    fecha: {
        año: number,
        mes: number,
        dia: number,
        minuto: number
    };
    estado: estadoMensaje;

    constructor(id: Number, idUsuarioAutor: Number, idUsuarioReceptor: Number, mensaje: String, fecha: {
        año: number,
        mes: number,
        dia: number,
        minuto: number
    }, estado: estadoMensaje){
        this.id = id;
        this.estado = estado;
        this.fecha = fecha;
        this.idUsuarioReceptor = idUsuarioReceptor;
        this.idUsuarioAutor = idUsuarioAutor;
        this.mensaje = mensaje;
    }
}