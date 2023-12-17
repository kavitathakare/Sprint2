import { Base } from './base.model';

export interface User extends Base {
  id: number;
}

export function getUserDisplay(user: User): number {
  if (!user) return 0;

  return user.id;
}
