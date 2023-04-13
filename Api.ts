import express from 'express';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from "./swagger.json"
fdsfsdfsdfdsfds
//Clases
import { Usuario } from './Usuario';
import { Mensaje } from './Mensaje';
import { estadoUsuario } from './estadoUsuario';
import { estadoMensaje } from './estadoMensaje';

//Rutas
import { RutaDefault } from './Rutas/RutaDefault';
import { RutasUsuarios } from './Rutas/RutasUsuarios';
import { RutasMensajes } from './Rutas/RutasMensajes';

const app: express.Application = express();

const port = 3000;

export let mensajes:Array<Mensaje> = new Array<Mensaje>
export let usuarios:Array<Usuario> = new Array<Usuario>

usuarios.push(new Usuario(0, "nombre0", "avatar0", estadoUsuario.Conectado, [1,2,4]));
usuarios.push(new Usuario(1, "nombre1", "avatar1", estadoUsuario.Desconectado, [0,2,4]));
usuarios.push(new Usuario(2, "nombre2", "avatar2", estadoUsuario.Ausente, [0,3,4]));
usuarios.push(new Usuario(3, "nombre3", "avatar3", estadoUsuario.Conectado, [0,2,4]));
usuarios.push(new Usuario(4, "nombre4", "avatar4", estadoUsuario.Ausente, [0,2,1]));

mensajes.push(new Mensaje(0, 0, 1, "mensaje0", new Date(2023, 3, 15, 14, 23, 6), estadoMensaje.Leido));
mensajes.push(new Mensaje(1, 1, 2, "mensaje1", new Date(2023, 3, 15, 15, 25, 6), estadoMensaje.NoEnviado));
mensajes.push(new Mensaje(2, 2, 3, "mensaje2", new Date(2023, 3, 15, 16, 26, 6), estadoMensaje.NoRecibido));
mensajes.push(new Mensaje(3, 3, 4, "mensaje3", new Date(2023, 3, 15, 17, 27, 6), estadoMensaje.Recibido));
mensajes.push(new Mensaje(4, 4, 0, "mensaje4", new Date(2023, 3, 15, 18, 28, 6), estadoMensaje.Leido));
mensajes.push(new Mensaje(5, 3, 2, "mensaje5", new Date(2023, 3, 15, 19, 29, 6), estadoMensaje.Recibido));
mensajes.push(new Mensaje(6, 4, 3, "mensaje6", new Date(2023, 3, 15, 12, 30, 6), estadoMensaje.NoEnviado));
mensajes.push(new Mensaje(7, 3, 4, "mensaje7", new Date(2023, 3, 15, 13, 29, 6), estadoMensaje.NoRecibido));

//extensiones
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rutas
app.use(RutaDefault);
app.use(RutasMensajes);
app.use(RutasUsuarios);

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));