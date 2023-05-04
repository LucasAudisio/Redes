import { Router } from 'express';
import { Usuario } from '../Usuario';
import { AccesoUsuario } from '../AccesosDB/AccesoUsuario';
import { MongoClient } from 'mongodb';
import { AccesoMensaje } from '../AccesosDB/AccesoMensaje';

const url: string = "mongodb://localhost:27017/Chat";
const client = new MongoClient(url);
const database = client.db("Chat");

var accesoUsuario: AccesoUsuario = new AccesoUsuario(url, database, database.collection("Usuario"))

var accesoMensaje: AccesoMensaje = new AccesoMensaje(url, database, database.collection("Mensaje"))


export const RutasUsuarios = Router();

//lista de usuarios
RutasUsuarios.get("/usuarios", (_req,_res) => {
    accesoUsuario.getUsuarios().then((v)=>{
        _res.send(v);
    })
})
  
//datos del usuario segun id
RutasUsuarios.get("/usuarios/:nombre", (_req,_res) => {
    accesoUsuario.getUsuario(_req.params.nombre).then((v)=>{
        _res.send(v);
    })
})
  
//subir nuevo usuario
RutasUsuarios.post("/usuarios", (_req,_res) => {
    accesoUsuario.getUsuario(_req.body.nombre).then((v)=>{
        if(v != undefined){
            _res.send("no se pudo crear");
            return;
        }
        else{
            const usuarioTemp = new Usuario(_req.body.nombre, _req.body.avatar, _req.body.estado, _req.body.contactosNombres);
            accesoUsuario.subirUsuario(usuarioTemp);
            _res.json(usuarioTemp);
        }
    })
})
  
//borrar usuario
RutasUsuarios.delete("/usuarios/:nombre", (_req,_res) => {
    accesoUsuario.getUsuario(_req.params.nombre).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            accesoUsuario.borrarUsuario(_req.params.nombre);
            _res.status(204).send();
        }
    })
})

//modificar todo el usuario
RutasUsuarios.put("/usuarios/:nombre", (_req,_res) => {
    accesoUsuario.getUsuario(_req.params.nombre).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            const usuarioTemp = new Usuario(_req.body.nombre, _req.body.avatar, 
                _req.body.estado, _req.body.contactosNombres);
            accesoUsuario.modificarUsuario(usuarioTemp);
            _res.json(usuarioTemp);
        }
    })
})

//modificar usuario
RutasUsuarios.patch("/usuarios/:nombre", (_req,_res) => {
    accesoUsuario.getUsuario(_req.params.nombre).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            var usuarioTemp = new Usuario(v.nombre, v.avatar, v.estado, v.contactosNombres);
            if(_req.body.contactosNombres){
                usuarioTemp.contactosNombres = _req.body.contactosNombres;
            }
            if(_req.body.avatar){
                usuarioTemp.avatar = _req.body.avatar;
            }
            if(_req.body.nombre){
                usuarioTemp.nombre = _req.body.nombre;
            } 
            if(_req.body.estado){
                usuarioTemp.estado = _req.body.estado;
            }
            accesoUsuario.modificarUsuario(usuarioTemp);
            _res.json(usuarioTemp);
        }
    })
})

//Recibir chat entre 2 ususarios
RutasUsuarios.get("/usuarios/:nombre1/:nombre2/recibirChat", (_req, _res) =>{
    accesoMensaje.chatEntre2Usuarios(_req.params.nombre1, _req.params.nombre2)
        .then((v) => {
            _res.json(v);
        })
})

//Buscar mensaje segun el texto
RutasUsuarios.get("/usuarios/:nombre/buscarMensaje/:mensaje", (_req, _res) => {
    accesoMensaje.mensajesSegunTexto(_req.params.nombre, _req.params.mensaje)
      .then((v) => {
        _res.json(v);
    });
})

//Buscar usuario que no este en contactos
RutasUsuarios.get("/usuarios/:nombre/buscarNuevoUsuario/:nombreUsuarioNuevo", (_req, _res) =>{
    accesoUsuario.buscarUsuarioNuevo(_req.params.nombre, _req.params.nombreUsuarioNuevo).then((v) => {
        _res.json(v);
    });
})
