import { ReactNode, useMemo, useState } from "react";
import { TableProps } from "../../types";
import "./DataTable.css";
import TableSkeleton from "../../Skeleton";

const DataTable = <T extends object>({ data, columns, pageSize = 5, loading }: TableProps<T>) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const totalPages = Math.ceil(data.length / pageSize);

    const sortedData = useMemo(() => {
        if (!sortKey) {
            return data;
        }
        return [...data].sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];

            if (valueA < valueB) {
                return sortOrder === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortKey, sortOrder]);

    const paginatedData = useMemo(() => {
        const startIndex = (pageNumber - 1) * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [pageNumber, pageSize, sortedData]);

    function onNext() {
        setPageNumber((page) => Math.min(totalPages, page + 1));
    }

    function onPrev() {
        setPageNumber((page) => Math.max(1, page - 1));
    }

    return (
        <div className="container">
            <div className="rounded">
                <table className="table" role="table">
                    <thead>
                        <tr key={-1} className="headrow">
                            {columns.map((column) => (
                                <th key={String(column.key)} className="headcell" scope="col">
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <TableSkeleton cols={columns.length} />
                        ) : (
                            paginatedData.map((row, idx) => (
                                <tr key={idx} className="bodyrow">
                                    {columns.map((column) => (
                                        <td key={String(column.key)} className="bodycell">
                                            {row[column.key] as ReactNode}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination" aria-live="polite">
                <button onClick={onPrev} disabled={pageNumber === 1} aria-label="Go to Previous Page">
                    Previous
                </button>
                <span>
                    Page {pageNumber} of {totalPages}
                </span>
                <button onClick={onNext} disabled={pageNumber === totalPages} aria-label="Go to Next Page">
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;
