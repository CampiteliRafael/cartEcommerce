import { Router } from 'express';
import { getAllProductsHandler, getProductByIdHandler } from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProductsHandler);
router.get('/:id', getProductByIdHandler);

export default router;