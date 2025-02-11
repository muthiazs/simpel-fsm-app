//import elysia
import { Elysia } from 'elysia';

//import routes
import Routes from './prisma/src/routes';

//initiate elysia
const app = new Elysia();

//route home
app.get('/', () => 'Hello Elysia!');

//add routes
app.group('/api', (app) => app.use(Routes))

//start server on port 3000
app.listen(3001);
 
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);