import { Collection, Db, FindCursor } from "mongodb";
import { Usuario } from "../Usuario";

export class AccesoUsuario{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }

    public async getUsuario(id:number) {
        const filtro = { id: id };
        const usuario = await this.collection.findOne(filtro);
        return usuario;
    }

    public async getUsuarios(){
        return await this.collection.find().toArray();
    }

    public async subirUsuario(usuario: Usuario){
        this.collection.insertOne(JSON.parse(JSON.stringify(usuario)));
    }

    public async modificarUsuario(usuario: Usuario){
        const filtro = { id: usuario.id };
        this.collection.findOneAndReplace(filtro, JSON.parse(JSON.stringify(usuario)));
    }

    public async borrarUsuario(id: number){
        //eliminar de los contactos
        const query = JSON.parse('{"$pull": {"contactosIDS": {"$eq":' + id + '}}}');
        this.collection.updateMany({}, query);
        //eliminar de la base de datos
        const filtro = { id: id };
        this.collection.findOneAndDelete(filtro);
    }

    public async buscarUsuarioNuevo(id: number, nombre: String){
        const usuario = await this.collection.findOne({"id": id});
        return await this.collection.find({$and: [{"nombre": {$regex: "e", $options: "i"}}, {"id": {$nin: usuario?.contactosIDS}}]}).toArray();
    }
}