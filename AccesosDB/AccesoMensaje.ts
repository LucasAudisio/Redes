import { Collection, Db } from "mongodb";
import { Mensaje } from "../Mensaje";

export class AccesoMensaje{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }

    public async getMensaje(id:number) {
        const filtro = { id: id };
        const mensaje = await this.collection.findOne(filtro);
        return mensaje;
    }

    public async getMensajes(){
        return await this.collection.find().toArray();
    }

    public async subirMensaje(mensaje: Mensaje){
        this.collection.insertOne(JSON.parse(JSON.stringify(mensaje)));
    }

    public async modificarMensaje(mensaje: Mensaje){
        const filtro = { id: mensaje.id };
        this.collection.findOneAndReplace(filtro, JSON.parse(JSON.stringify(mensaje)));
    }

    public async borrarMensaje(id: number){
        const filtro = { id: id };
        this.collection.findOneAndDelete(filtro);
    }

    public async chatEntre2Usuarios(id1: number, id2: number){
        return await this.collection.find({$or: [
            {"idUsuarioReceptor": id1, "idUsuarioAutor": id2},
            {"idUsuarioReceptor": id2, "idUsuarioAutor": id1}]}).toArray();
    }

    public async mensajesSegunTexto(idUsuario: number, mensaje: String){
        return await this.collection.find({$and: [
                {$or: [{"idUsuarioReceptor": idUsuario}, 
                    {"idUsuarioAutor": idUsuario}]},
                {"mensaje": {$regex: mensaje}}]}).toArray();
    }
}