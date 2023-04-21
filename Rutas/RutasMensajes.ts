import { Router } from 'express';
import { Mensaje } from '../Mensaje';
import { MongoClient } from 'mongodb';
import { AccesoMensaje } from '../AccesosDB/AccesoMensaje';

const url: string = "mongodb://localhost:27017/Chat";
const client = new MongoClient(url);
const database = client.db("Chat");

var accesoMensaje: AccesoMensaje = new AccesoMensaje(url, database, database.collection("Mensaje"))


export const RutasMensajes = Router();

//lista con los datos de todos los mensajes
RutasMensajes.get("/mensajes", (_req,_res) => {
    accesoMensaje.getMensajes().then((v)=>{
        _res.send(v);
    })
})

//datos del mensaje segun id
RutasMensajes.get("/mensajes/:id", (_req,_res) => {
    accesoMensaje.getMensaje(Number(_req.params.id)).then((v)=>{
        _res.send(v);
    })
})

//subir nuevo mensaje
RutasMensajes.post("/mensajes", (_req,_res) => {
    accesoMensaje.getMensaje(Number(_req.body.id)).then((v)=>{
        if(v != undefined){
            _res.send("no se pudo crear");
            return;
        }
        else{
            const mensajeTemp = new Mensaje(_req.body.id, _req.body.idUsuarioAutor, _req.body.idUsuarioReceptor,
                _req.body.mensaje, _req.body.fecha, _req.body.estado);
            accesoMensaje.subirMensaje(mensajeTemp);
            _res.json(mensajeTemp);
        }
    })
})

//borrar mensaje
RutasMensajes.delete("/mensajes/:id", (_req,_res) => {
    accesoMensaje.getMensaje(Number(_req.params.id)).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            accesoMensaje.borrarMensaje(Number(_req.params.id));
            _res.status(204).send();
        }
    })
})

//modificar todo el mensaje
RutasMensajes.put("/mensajes/:id", (_req,_res) => {
    accesoMensaje.getMensaje(Number(_req.params.id)).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            const mensajeTemp = new Mensaje(Number(_req.params.id), _req.body.idUsuarioAutor, _req.body.idUsuarioReceptor,
                _req.body.mensaje, _req.body.fecha, _req.body.estado);
            accesoMensaje.modificarMensaje(mensajeTemp);
            _res.json(mensajeTemp);
        }
    })
})

//modificar mensaje
RutasMensajes.patch("/mensajes/:id", (_req,_res) => {
    accesoMensaje.getMensaje(Number(_req.params.id)).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            var mensajeTemp = new Mensaje(v.id, v.idUsuarioAutor, v.idUsuarioReceptor, v.mensaje,
                 v.fecha, v.estado);
            if(_req.body.idUsuarioAutor){
                mensajeTemp.idUsuarioAutor = _req.body.idUsuarioAutor;
            }
            if(_req.body.idUsuarioReceptor){
                mensajeTemp.idUsuarioReceptor = _req.body.idUsuarioReceptor;
            }
            if(_req.body.mensaje){
                mensajeTemp.mensaje = _req.body.mensaje;
            }
            if(_req.body.fecha){
                mensajeTemp.fecha = _req.body.fecha;
            }
            if(_req.body.estado){
                mensajeTemp.estado = _req.body.estado;
            }
            accesoMensaje.modificarMensaje(mensajeTemp);
            _res.json(mensajeTemp);
        }
    })
})

