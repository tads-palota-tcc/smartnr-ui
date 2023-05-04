export interface Page<T> {
  content: T[];
  size?: number;
  totalElements: number;
  totalPages?: number;
  number?: number;
  last?: boolean;
  first?: boolean;
}