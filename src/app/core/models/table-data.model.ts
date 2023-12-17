import { PageRequest } from './page-request.model';

export interface TableData {
  request: PageRequest;
  select?: number;
  length?: number;
}
