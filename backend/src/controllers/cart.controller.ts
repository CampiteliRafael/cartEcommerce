import { Request, Response } from 'express';
import { addItemToCartService } from '../services/cart.service';

export async function addItemToCartHandler(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const { productId, quantity } = req.body;

  try {
    const updatedCart = await addItemToCartService(userId, productId, quantity);
    res.status(200).send(updatedCart);
    return;
  } catch (e: any) {
    if (e.message === 'Produto não encontrado.') {
      res.status(404).send(e.message);
      return;
    }
    res.status(500).send('Erro interno do servidor.');
    return;
  }
}