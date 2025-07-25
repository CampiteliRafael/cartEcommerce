import { z } from 'zod';

export const addItemToCartSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'O ID do produto é obrigatório.' }),
    quantity: z
      .number({ required_error: 'A quantidade é obrigatória.' })
      .min(1, 'A quantidade deve ser de no mínimo 1.'),
  }),
});