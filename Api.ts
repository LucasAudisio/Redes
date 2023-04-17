import express from 'express';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from "./swagger.json"

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

export let mensajes:Array<Mensaje> = new Array<Mensaje>;
export let usuarios:Array<Usuario> = new Array<Usuario>;

//extensiones
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rutas
app.use(RutaDefault);
app.use(RutasMensajes);
app.use(RutasUsuarios);

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));