import { Base } from './base.model';
import { User } from './user.model';

export interface Teacher extends Base {
  user: User | string;
  firstName: string;
  lastName: string;
}

export function getTeacherDisplay(teacher: Teacher): any {
  if (!teacher) return 0;

  return `${teacher.firstName} ${teacher.lastName}`;
}
