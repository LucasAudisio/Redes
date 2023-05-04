import { estadoMensaje } from "./estadoMensaje";

export class Mensaje{
    id: Number;
    nombreAutor: string;
    nombreReceptor: string;
    mensaje: String;
    fecha: {
        año: number,
        mes: number,
        dia: number,
        minuto: number
    };
    estado: estadoMensaje;

    constructor(id: Number, nombreAutor: string, nombreReceptor: string, mensaje: String, fecha: {
        año: number,
        mes: number,
        dia: number,
        minuto: number
    }, estado: estadoMensaje){
        this.id = id;
        this.estado = estado;
        this.fecha = fecha;
        this.nombreReceptor = nombreReceptor;
        this.nombreAutor = nombreAutor;
        this.mensaje = mensaje;
    }
}