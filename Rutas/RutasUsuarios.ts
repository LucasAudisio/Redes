import { Router } from 'express';
import { usuarios } from '../Api';
import { Usuario } from '../Usuario';
import { mensajes } from '../Api';
import { Mensaje } from '../Mensaje';
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
RutasUsuarios.get("/usuarios/:id", (_req,_res) => {
    accesoUsuario.getUsuario(Number(_req.params.id)).then((v)=>{
        _res.send(v);
    })
})
  
//subir nuevo usuario
RutasUsuarios.post("/usuarios", (_req,_res) => {
    accesoUsuario.getUsuario(Number(_req.body.id)).then((v)=>{
        if(v != undefined){
            _res.send("no se pudo crear");
            return;
        }
        else{
            const usuarioTemp = new Usuario(_req.body.id, _req.body.nombre, _req.body.avatar, _req.body.estado, _req.body.contactosIDS);
            accesoUsuario.subirUsuario(usuarioTemp);
            _res.json(usuarioTemp);
        }
    })
})
  
//borrar usuario
RutasUsuarios.delete("/usuarios/:id", (_req,_res) => {
    accesoUsuario.getUsuario(Number(_req.params.id)).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            accesoUsuario.borrarUsuario(Number(_req.params.id));
            _res.status(204).send();
        }
    })
})

//modificar todo el usuario
RutasUsuarios.put("/usuarios/:id", (_req,_res) => {
    accesoUsuario.getUsuario(Number(_req.params.id)).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            const usuarioTemp = new Usuario(Number(_req.params.id), _req.body.nombre, _req.body.avatar, 
                _req.body.estado, _req.body.contactosIDS);
            console.log(usuarioTemp);
            accesoUsuario.modificarUsuario(usuarioTemp);
            _res.json(usuarioTemp);
        }
    })
})

//modificar usuario
RutasUsuarios.patch("/usuarios/:id", (_req,_res) => {
    accesoUsuario.getUsuario(Number(_req.params.id)).then((v)=>{
        if(v == undefined){
            _res.send("no existe");
            return;
        }
        else{
            var usuarioTemp = new Usuario(v.id, v.nombre, v.avatar, v.estado, v.contactosIDS);
            if(_req.body.contactosIDS){
                usuarioTemp.contactosIDS = _req.body.contactosIDS;
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
RutasUsuarios.get("/usuarios/:idReceptor/:idAutor/recibirChat", (_req, _res) =>{
    accesoMensaje.chatEntre2Usuarios(Number(_req.params.idAutor), Number(_req.params.idReceptor))
        .then((v) => {
            _res.json(v);
        })
})

//Buscar mensaje segun el texto
RutasUsuarios.get("/usuarios/:idUsuario/buscarMensaje/:mensaje", (_req, _res) => {
    accesoMensaje.mensajesSegunTexto(Number(_req.params.idUsuario), _req.params.mensaje)
      .then((v) => {
        console.log(v)
        _res.json(v);
    });
})

//Buscar usuario que no este en contactos
RutasUsuarios.get("/usuarios/:idUsuario/buscarNuevoUsuario/:nombreUsuario", (_req, _res) =>{
    accesoUsuario.buscarUsuarioNuevo(Number(_req.params.idUsuario), _req.params.nombreUsuario).then((v) => {
        //console.log(JSON.parse(JSON.stringify(v)))
        _res.json(v);
    });
    
    /*var usuarioAniadiendo: Usuario | undefined;
    for(let i:number = 0; i < usuarios.length; i++){
        if(usuarios[i].id == Number(_req.params.idUsuario)){
            usuarioAniadiendo = usuarios[i];
        }
    }

    var usuariosEncontrados: Array<Usuario> = new Array<Usuario>;

    if(usuarioAniadiendo){
        for(let i:number = 0; i < usuarios.length;i++){
            if(usuarios[i].nombre.includes(_req.params.nombreUsuario) && 
            !usuarioAniadiendo.contactosIDS.includes(usuarios[i].id) &&
            usuarios[i] != usuarioAniadiendo){
                usuariosEncontrados.push(usuarios[i]);
            }
        }
        _res.json(usuariosEncontrados);
    }
    else{
        _res.status(404).send();
    }*/
})
