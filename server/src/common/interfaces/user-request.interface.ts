import { Request } from 'express';
import { User } from 'src/users/users.model';

export interface UserRequest extends Request {
  user: User;
}
