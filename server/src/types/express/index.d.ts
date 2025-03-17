import { UserPayload } from '../../src/auth/interfaces/user-payload.interface'; // Укажите правильный путь

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Добавляем свойство user в Request
    }
  }
}