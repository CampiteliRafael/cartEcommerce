import { Router } from 'express';
import { addItemToCartHandler, getUserCartHandler, updateItemQuantityHandler } from '../controllers/cart.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import { addItemToCartSchema, updateItemQuantitySchema } from '../schemas/cart.schema';

const router = Router();

router.use(authMiddleware);

router.post('/items', validate(addItemToCartSchema), addItemToCartHandler);
router.get('/', getUserCartHandler);
router.put('/items/:productId', validate(updateItemQuantitySchema), updateItemQuantityHandler);

export default router;