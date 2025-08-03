import { Router } from 'express';
import { addItemToCartHandler, getUserCartHandler } from '../controllers/cart.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import { addItemToCartSchema } from '../schemas/cart.schema';

const router = Router();

router.use(authMiddleware);

router.post('/items', validate(addItemToCartSchema), addItemToCartHandler);
router.get('/', getUserCartHandler);

export default router;