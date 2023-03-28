import express from 'express';
import { Usuario } from './Usuario';
import { Mensaje } from './Mensaje';
import { estadoUsuario } from './estadoUsuario';
import { estadoMensaje } from './estadoMensaje';

const app: express.Application = express(); 

const port = 3000;

let mensajes:Array<Mensaje> = new Array<Mensaje>
let usuarios:Array<Usuario> = new Array<Usuario>

usuarios.push(new Usuario(0, "nombre0", "avatar0", estadoUsuario.Conectado, [1, 2, 3]));
usuarios.push(new Usuario(1, "nombre1", "avatar1", estadoUsuario.Desconectado, [0, 4, 3]));
usuarios.push(new Usuario(2, "nombre2", "avatar2", estadoUsuario.Ausente, [0, 3, 5]));
usuarios.push(new Usuario(3, "nombre3", "avatar3", estadoUsuario.Conectado, [2, 4, 5]));
usuarios.push(new Usuario(4, "nombre4", "avatar4", estadoUsuario.Ausente, [0, 3, 2]));

mensajes.push(new Mensaje(0, 0, 1, "mensaje0", new Date(2023, 3, 15, 14, 23, 6), estadoMensaje.Leido));
mensajes.push(new Mensaje(1, 1, 2, "mensaje1", new Date(2023, 3, 15, 15, 25, 6), estadoMensaje.NoEnviado));
mensajes.push(new Mensaje(2, 2, 3, "mensaje2", new Date(2023, 3, 15, 16, 26, 6), estadoMensaje.NoRecibido));
mensajes.push(new Mensaje(3, 3, 4, "mensaje3", new Date(2023, 3, 15, 17, 27, 6), estadoMensaje.Recibido));
mensajes.push(new Mensaje(4, 4, 0, "mensaje4", new Date(2023, 3, 15, 18, 28, 6), estadoMensaje.Leido));
mensajes.push(new Mensaje(5, 3, 2, "mensaje5", new Date(2023, 3, 15, 19, 29, 6), estadoMensaje.Recibido));
mensajes.push(new Mensaje(6, 4, 3, "mensaje6", new Date(2023, 3, 15, 12, 30, 6), estadoMensaje.NoEnviado));
mensajes.push(new Mensaje(7, 3, 4, "mensaje7", new Date(2023, 3, 15, 13, 29, 6), estadoMensaje.NoRecibido));


app.use(express.json());

app.get('/', (_req , _res) => _res.send('Bienvenido a mi api para chat! Chat (Usuario, Mensaje) (MongoDB)'));

//lista con los datos de todos los usuarios
app.get("/usuarios", (_req,_res) => {
  _res.json(usuarios);
})

//datos del usuario segun id
app.get("/usuarios/:id", (_req,_res) => {
    _res.json(usuarios.find(item => {
        console.log(item.estado);
        return item.id == Number(_req.params.id)
    }));
})

//subir nuevo usuario
app.post("/usuarios", (_req,_res) => {
    for(let i: number = 0; i < usuarios.length; i++){
        if(usuarios[i].id == Number(_req.body.id)){
            _res.send("no se pudo crear")
        } 
    }
    const usuarioTemp = new Usuario(_req.body.id, _req.body.nombre, _req.body.avatar, _req.body.estado, _req.body.contactosIDS);
    usuarios.push(usuarioTemp);
    _res.json(usuarioTemp);
})

//borrar usuario
app.delete("/usuarios/:id", (_req,_res) => {
    const usuarioTemp = usuarios.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (usuarioTemp){
      delete usuarios[usuarios.indexOf(usuarioTemp)]
    }
    _res.status(204).send()
})

//modificar todo el usuario
app.put("/usuarios/:id", (_req,_res) => {
    const usuarioTemp = usuarios.find(item => {
        return item.id == Number(_req.params.id);
    })
    if (usuarioTemp){
        usuarioTemp.contactosIDS = _req.body.contactosIDS;
        usuarioTemp.estado = _req.body.estado;
        usuarioTemp.avatar = _req.body.avatar;
        usuarioTemp.nombre = _req.body.nombre;
    }
    _res.json(usuarioTemp);
})

//modificar usuario
app.patch("/usuarios/:id", (_req,_res) => {
    const usuarioTemp = usuarios.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (usuarioTemp){
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
        _res.json(usuarioTemp)
    }
    else{
        _res.status(404).send()
    }
})

//lista con los datos de todos los mensajes
app.get("/mensajes", (_req,_res) => {
    _res.json(mensajes);
})

//datos del mensaje segun id
app.get("/mensajes/:id", (_req,_res) => {
    _res.json(mensajes.find(item => {
        return item.idMensaje == Number(_req.params.id)
    }));
})

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
