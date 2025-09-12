import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'O nome é obrigatório.',
    }).min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),

    email: z.string({
      required_error: 'O e-mail é obrigatório.',
    }).email({ message: 'Formato de e-mail inválido.' }),

    password: z.string({
      required_error: 'A senha é obrigatória.',
    }).regex(passwordRegex, {
      message: 'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.',
    }),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];

// SCHEMA PARA LOGIN

export const loginUserSchema = z.object ({ 
  body: z.object ({ 
    email: z.string ({ required_error: 'O e-mail é obrigatório.' })
    .email({ message: 'Formato de e-mail inválido' }),
    password: z.string({ required_error: 'A senha é obrigatória.' })
    .min( 1, 'A senha não pode estar vazia.' ),
   })
 })