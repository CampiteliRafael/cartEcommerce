import { Request, Response } from 'express';
import { CreateUserInput } from '../schemas/user.schema';
import { createUserService } from '../services/UserService';
import { loginUserService } from '../services/UserService';
import { loginUserSchema } from '../schemas/user.schema';
import { z } from 'zod';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUserService(req.body);

    res.status(201).send(user);
    return;

  } catch (e: any) {
    if (e.message.includes('User already exists')) {
      res.status(409).send(e.message);
      return;
    }
    res.status(500).send(e.message);
    return;
  }
}

type LoginUserInput = z.infer<typeof loginUserSchema>['body'];

export async function loginUserHandler(req: Request<{}, {}, LoginUserInput>, res: Response) {
  try {
    const accessToken = await loginUserService(req.body);

    res.status(200).send({ accessToken });
    return;
  } catch (e: any) {
    res.status(401).send(e.message);
    return;
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  
  const user = res.locals.user;
  
  if (!user) {
    res.status(404).send('Usuário não encontrado');
    return;
  }

  res.status(200).send(user);
  return;
}