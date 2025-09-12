import { Request, Response } from 'express';
import { findAllProductsService, findProductByIdService } from '../services/ProductService';

export async function getAllProductsHandler(req: Request, res: Response) {
  const products = await findAllProductsService();
  res.status(200).send(products);
  return;
}

export async function getProductByIdHandler(req: Request, res: Response) {
  const productId = req.params.id;
  const product = await findProductByIdService(productId);

  if (!product) {
    res.status(404).send('Produto não encontrado.');
    return;
  }

  res.status(200).send(product);
  return;
}