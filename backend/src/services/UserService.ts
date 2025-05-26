import { CreateUserInput } from '../schemas/user.schema';
export async function createUserService(input: CreateUserInput) {

  const fakeUserFromDb = {
    ...input,
    _id: 'mock-user-id-123', 
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { password, ...userWithoutPassword } = fakeUserFromDb;
  
  return userWithoutPassword;
}