export interface DataRes<T> {
  statusCode: number;
  message: string;
  data: T;
}
