import { Router } from 'express';
import { createUserHandler } from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import { createUserSchema } from '../schemas/user.schema';

const router = Router();


router.post('/register', validate(createUserSchema), createUserHandler);

export default router;