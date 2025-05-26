// src/controllers/user.controller.ts

import { Request, Response } from 'express';
import { CreateUserInput } from '../schemas/user.schema';
import { createUserService } from '../services/UserService';

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