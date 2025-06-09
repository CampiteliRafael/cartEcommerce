import { Router } from 'express';
import { createUserHandler, loginUserHandler } from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = Router();


router.post('/register', validate(createUserSchema), createUserHandler);
router.post('/login', validate(loginUserSchema), loginUserHandler);

export default router;