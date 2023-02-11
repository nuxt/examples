import { randomUUID } from 'uncrypto';

export interface User {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  password: string;
}

export async function findUserByEmail(email: string): Promise<User> {
  const storage = useStorage();
  const key = getUserKey(email!);
  return await storage.getItem(key);
}

export async function createUser(user: Partial<User>) {
  const storage = useStorage();
  const key = getUserKey(user.email!);
  if (await storage.hasItem(key)) {
    throw createError({ message: "Email already exists!", statusCode: 409 })
  }
  return await storage.setItem(key, {
      id: randomUUID(),
      ...user,
  });
}

export async function updateUserByEmail(email: string, updates: Partial<User>) {
  const storage = useStorage();
  const user = await findUserByEmail(email);
  const key = getUserKey(user.email!);
  return await storage.setItem(key, {
      ...user,
      ...updates,
  });
}

function getUserKey(email: string) {
  return `db:auth:users:${encodeURIComponent(email)}`;
}
