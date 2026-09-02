import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Column } from "@/features/booking/types/columns.type";

interface IList<T> {
  columns: Column<T>[];
  rows: T[];
  startIndex?: number;
  cell?: (row: T, index?: number) => React.ReactNode;
}

function getNestedValue<T>(
  obj: T,
  path: string,
): string | boolean | null | undefined {
  const result = path
    ?.split(".")
    .reduce<Record<string, unknown> | unknown>((acc, curr) => {
      if (acc && typeof acc === "object" && curr in acc) {
        return (acc as Record<string, unknown>)[curr];
      }
      return undefined;
    }, obj);

  return result as string | boolean | null | undefined;
}

export function List<T extends object>({
  columns,
  rows,
  startIndex,
}: IList<T>) {
  if (rows.length === 0)
    return (
      <div className="flex items-center justify-center text-3xl mt-7">
        No bookings yet...
      </div>
    );
  return (
    <>
    
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden my-7">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className=" h-12 font-semibold text-slate-700 uppercase text-xs tracking-wide"
                >
                  {col?.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="transition-colors hover:bg-green-50/50 border-b"
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="
                py-4
                text-sm
                text-slate-700
              "
                  >
                    {col?.cell
                      ? col.cell?.(row, rowIndex + (startIndex ?? 0))
                      : getNestedValue(row, col?.accessorKey as string)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
