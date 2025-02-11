// Import Elysia
import { Elysia } from 'elysia';

// Import controller
import { getUser } from '../controllers/UserController';

const Routes = new Elysia({ prefix: '/user' })

  // Route untuk mendapatkan semua user
  .get('/', async () => await getUser());

export default Routes;
