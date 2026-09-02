export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (row: T, index?: number) => React.ReactNode;
}
