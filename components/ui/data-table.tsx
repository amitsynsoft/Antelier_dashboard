import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

export type Column<T> = {
  header: string
  accessorKey?: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string
  emptyState?: React.ReactNode
  pageSize?: number
  className?: string
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyState,
  pageSize = 5,
  className
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const totalPages = Math.ceil(data.length / pageSize) || 1

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [data.length])

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="overflow-x-auto rounded-lg border border-border/60 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground uppercase text-xs font-bold tracking-wider border-b border-border/60">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={cn("px-4 py-3.5 font-bold", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {paginatedData.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="hover:bg-muted/30 transition-colors group"
              >
                {columns.map((col, idx) => (
                  <td key={idx} className={cn("px-4 py-3.5 align-middle", col.className)}>
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                      ? String(item[col.accessorKey] ?? "")
                      : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
          <div>
            Showing <span className="font-semibold text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * pageSize, data.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{data.length}</span> results
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 font-mono font-medium text-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
