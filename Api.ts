import express from 'express';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from "./swagger.json"

//Rutas
import { RutaDefault } from './Rutas/RutaDefault';
import { RutasUsuarios } from './Rutas/RutasUsuarios';
import { RutasMensajes } from './Rutas/RutasMensajes';

const app: express.Application = express();

const port = 3001;

//clave jwt
export let claveSecreta: string = "Mbapapu";

//extensiones
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rutas
app.use(RutaDefault);
app.use(RutasMensajes);
app.use(RutasUsuarios);

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));