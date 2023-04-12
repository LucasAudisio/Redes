import { Router } from 'express';
import { mensajes } from '../Api';
import { Mensaje } from '../Mensaje';

export const RutasMensajes = Router();

//lista con los datos de todos los mensajes
RutasMensajes.get("/mensajes", (_req,_res) => {
    _res.json(mensajes);
})

//datos del mensaje segun id
RutasMensajes.get("/mensajes/:id", (_req,_res) => {
    _res.json(mensajes.find(item => {
        return item.id == Number(_req.params.id);
    }));
})

//subir nuevo mensaje
RutasMensajes.post("/mensajes", (_req,_res) => {
    for(let i: number = 0; i < mensajes.length; i++){
        if(mensajes[i].id == Number(_req.body.id)){
            _res.send("no se pudo crear");
            return;
        } 
    }
    const mensajeTemp = new Mensaje(_req.body.id, _req.body.idUsuarioAutor, _req.body.idUsuarioReceptor, _req.body.mensaje, _req.body.fecha, _req.body.estado);
    mensajes.push(mensajeTemp);
    _res.json(mensajeTemp);
})

//borrar mensaje
RutasMensajes.delete("/mensajes/:id", (_req,_res) => {
    const mensajeTemp = mensajes.find(item => {
        return item.id == Number(_req.params.id);
    })
    if (mensajeTemp){
        mensajes.splice(mensajes.indexOf(mensajeTemp), 1)
    }
    _res.status(204).send();
})

//modificar todo el mensaje
RutasMensajes.put("/mensajes/:id", (_req,_res) => {
    const mensajeTemp = mensajes.find(item => {
        return item.id == Number(_req.params.id);
    })
    if (mensajeTemp){
        mensajeTemp.idUsuarioReceptor = _req.body.idUsuarioReceptor;
        mensajeTemp.idUsuarioAutor = _req.body.idUsuarioAutor;
        mensajeTemp.mensaje = _req.body.mensaje;
        mensajeTemp.fecha = _req.body.fecha;
        mensajeTemp.estado = _req.body.estado;
    }
    _res.json(mensajeTemp);
})

//modificar mensaje
RutasMensajes.patch("/mensajes/:id", (_req,_res) => {
    const mensajeTemp = mensajes.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (mensajeTemp){
        if(_req.body.estado){
            mensajeTemp.estado = _req.body.estado;
        }
        if(_req.body.fecha){
            mensajeTemp.fecha = _req.body.fecha;
        }
        if(_req.body.idUsuarioAutor){
            mensajeTemp.idUsuarioAutor = _req.body.idUsuarioAutor;
        }
        if(_req.body.idUsuarioReceptor){
            mensajeTemp.idUsuarioReceptor = _req.body.idUsuarioReceptor;
        }
        if(_req.body.mensaje){
            mensajeTemp.mensaje = _req.body.mensaje;
        }
        _res.json(mensajeTemp)
    }
    else{
        _res.status(404).send()
    }
})