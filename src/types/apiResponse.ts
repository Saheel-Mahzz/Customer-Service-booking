export interface IListReponse<T> {
  count: number;
  prev: string | null;
  next: string | null;
  results: T[];
}
