import { Base } from './base.model';
import { Teacher } from './teacher.model';

export interface Faculty extends Base {
  name: string;
  description: string;
  email: string;
  dean: Teacher;
}

export function getFacultyDisplay(faculty: Faculty): string {
  if (!faculty) return '';

  return faculty.name;
}
