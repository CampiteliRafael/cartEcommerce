import { Router } from 'express';
import { createUserHandler, loginUserHandler, getCurrentUserHandler } from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = Router();


router.post('/register', validate(createUserSchema), createUserHandler);
router.post('/login', validate(loginUserSchema), loginUserHandler);
router.get('/me', authMiddleware, getCurrentUserHandler);

export default router;