import express from 'express';
import { Usuario } from './Usuario';
import { Mensaje } from './Mensaje';

const app: express.Application = express(); 

const port = 3000;

let mensajes:Array<Mensaje> = new Array<Mensaje>
let usuarios:Array<Usuario> = new Array<Usuario>

usuarios.push(new Usuario(0, "nombre0", "avatar0", "estado0"));
usuarios.push(new Usuario(1, "nombre1", "avatar1", "estado1"));
usuarios.push(new Usuario(2, "nombre2", "avatar2", "estado2"));
usuarios.push(new Usuario(3, "nombre3", "avatar3", "estado3"));
usuarios.push(new Usuario(4, "nombre4", "avatar4", "estado4"));

app.use(express.json());

app.get('/', (_req , _res) => _res.send('Bienvenido a mi api para chat! Chat (Usuario, Mensaje) (MongoDB)'));

//lista con los datos de todos los usuarios
app.get("/usuarios", (_req,_res) => {
  _res.json(usuarios);
})

//datos del usuario segun id
app.get("/usuarios/:id", (_req,_res) => {
    _res.json(usuarios.find(item => {
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
    const usuarioTemp = new Usuario(_req.body.id, _req.body.nombre, _req.body.avatar, _req.body.estado);
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
        return item.id == Number(_req.params.id)
    })
    if (usuarioTemp){
        usuarioTemp.estado = _req.body.estado
        usuarioTemp.avatar = _req.body.avatar
        usuarioTemp.nombre = _req.body.nombre
    }
    _res.json(usuarioTemp);
})

//modificar usuario
app.patch("/usuarios/:id", (_req,_res) => {
    const usuarioTemp = usuarios.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (usuarioTemp){
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

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
