import { Request, Response } from 'express';
import { addItemToCartService, findUserCartService, updateItemQuantityService, removeItemFromCartService } from '../services/cart.service';

export async function addItemToCartHandler(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const { productId, quantity } = req.body;

  try {
    const updatedCart = await addItemToCartService(userId, productId, quantity);
    res.status(200).send(updatedCart);
    return;
  } catch (e: any) {
    if (e.message === 'Produto não encontrado.') {
      res.status(404).send({ message: e.message });
      return;
    }
    res.status(500).send({ message: 'Erro interno do servidor.' });
    return;
  }
};

export async function getUserCartHandler(req: Request, res: Response) {
  const userId = res.locals.user.userId;

  try {
    const cart = await findUserCartService(userId);
    res.status(200).send(cart);
    return;
  } catch (e: any) {
    res.status(500).send({ message: 'Erro interno do servidor.' });
    return;
  }
};

export async function updateItemQuantityHandler(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await updateItemQuantityService(userId, productId, quantity);
    res.status(200).send(updatedCart);
    return;
  } catch (e: any) {
    if (e.message === 'Item não encontrado no carrinho.') {
      res.status(404).send({ message: e.message });
      return;
    }
    res.status(500).send({ message: 'Erro interno do servidor.' });
    return;
  }
};

export async function removeItemFromCartHandler(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const { productId } = req.params;

  try {
    const updatedCart = await removeItemFromCartService(userId, productId);
    res.status(200).send(updatedCart);
    return;
  } catch (e: any) {
    if (e.message === 'Item não encontrado no carrinho.') {
      res.status(404).send({ message: e.message });
      return;
    }
    res.status(500).send({ message: 'Erro interno do servidor.' });
    return;
  }
};