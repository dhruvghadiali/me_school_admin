import { useMemo, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, FilterIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@MEShadcnComponents/sheet";
import { Button } from "@MEShadcnComponents/button";
import PropTypes from "prop-types";
import MEDatePicker from "../form/input/meDatePicker.js";

// Simple, shadcn-styled data table
const MEDataTable = ({ columns, rows, emptyText = "No data available" }) => {
  const [sortConfig, setSortConfig] = useState({ field: null, direction: "asc" });

  // Normalize column definitions to support both {field, headerName} and {key, header}
  const resolvedColumns = useMemo(() => {
    return (columns || []).map((col) => {
      const key = col.field ?? col.key;
      const header = col.headerName ?? col.header ?? key;
      return { ...col, _key: key, _header: header };
    });
  }, [columns]);

  const [filters, setFilters] = useState({});

  // Apply per-column text filters (case-insensitive). Supports custom predicate.
  const filteredRows = useMemo(() => {
    const data = Array.isArray(rows) ? rows : [];

    const getType = (col) => col?.filterType ?? "stringColumnFilter";
    const isSameDay = (d1, d2) => {
      if (!(d1 instanceof Date) || Number.isNaN(d1.getTime())) return false;
      const d = d2 instanceof Date ? d2 : new Date(d2);
      if (!(d instanceof Date) || Number.isNaN(d.getTime())) return false;
      return (
        d1.getFullYear() === d.getFullYear() &&
        d1.getMonth() === d.getMonth() &&
        d1.getDate() === d.getDate()
      );
    };

    // Build active filters aware of type
    const activeFilters = resolvedColumns
      .filter((c) => c.filter)
      .map((c) => ({ key: c._key, type: getType(c), value: filters[c._key] }))
      .filter(({ type, value }) => {
        if (type === "dateColumnFilter") return value instanceof Date;
        const s = value?.toString()?.trim();
        return !!s && s.length > 0;
      });

    if (activeFilters.length === 0) return data;

    return data.filter((row) => {
      for (const { key, value: query, type } of activeFilters) {
        const col = resolvedColumns.find((c) => c._key === key);
        const rowVal = row?.[key];
        // Custom predicate takes precedence
        if (typeof col?.filterPredicate === "function") {
          if (!col.filterPredicate(rowVal, query, row)) return false;
          continue;
        }
        if (type === "dateColumnFilter") {
          if (!isSameDay(query, rowVal)) return false;
          continue;
        }
        const v = rowVal == null ? "" : String(rowVal);
        if (!v.toLowerCase().includes(String(query).toLowerCase())) return false;
      }
      return true;
    });
  }, [rows, filters, resolvedColumns]);

  const sortedRows = useMemo(() => {
    const base = filteredRows || [];
    if (!sortConfig.field) return base;
    const field = sortConfig.field;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    const data = [...base];
    return data.sort((a, b) => {
      const av = a?.[field];
      const bv = b?.[field];
      if (av == null && bv == null) return 0;
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      if (typeof av === "number" && typeof bv === "number") {
        return av === bv ? 0 : (av > bv ? 1 : -1) * dir;
      }
      const ad = Date.parse(av);
      const bd = Date.parse(bv);
      if (!Number.isNaN(ad) && !Number.isNaN(bd)) {
        return ad === bd ? 0 : (ad > bd ? 1 : -1) * dir;
      }
      const as = String(av);
      const bs = String(bv);
      return as.localeCompare(bs) * dir;
    });
  }, [filteredRows, sortConfig]);

  // Pagination: page size options 15, 25, 50; default 15
  const PAGE_SIZE_OPTIONS = [15, 25, 50];
  const [pageSize, setPageSize] = useState(15);
  const [pageIndex, setPageIndex] = useState(0); // 0-based

  const totalRows = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const pagedRows = useMemo(() => {
    const start = pageIndex * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, pageIndex, pageSize]);

  // Reset page when filters or pageSize change to keep within bounds
  useMemo(() => {
    if (pageIndex > totalPages - 1) setPageIndex(0);
  }, [totalPages]);

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filterDraftAll, setFilterDraftAll] = useState({});

  const openFilterSheet = () => {
    // initialize draft with current filters
    const initialDraft = {};
    resolvedColumns.forEach((c) => {
      if (c.filter) initialDraft[c._key] = filters[c._key] ?? "";
    });
    setFilterDraftAll(initialDraft);
    setFilterSheetOpen(true);
  };

  const applyFilter = () => {
    setFilters((prev) => ({ ...prev, ...filterDraftAll }));
    setFilterSheetOpen(false);
  };

  const clearAllFilters = () => {
    setFilters({});
    setFilterDraftAll({});
    setFilterSheetOpen(false);
  };

  const onHeaderClick = (col) => {
    if (!col.sortable) return;
    setSortConfig((prev) => {
      const field = col._key ?? col.field ?? col.key;
      if (prev.field === field) {
        return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { field, direction: "asc" };
    });
  };

  // Compute responsive min-width per column based on header text length
  const getColStyle = (col) => {
    const headerText = typeof col._header === "string" ? col._header : "";
    const baseCh = 10; // minimum character width
    const lenCh = Math.max(baseCh, headerText.length + 4);
    // allow explicit width/minWidth overrides (number -> px, string -> as-is)
    const toCss = (v) => (typeof v === "number" ? `${v}px` : v);
    const style = {};
    if (col.width) {
      style.width = toCss(col.width);
      // lock minWidth to the same value to avoid shrinking on mobile/tablet
      if (!col.minWidth) style.minWidth = toCss(col.width);
    }
    if (col.minWidth) style.minWidth = toCss(col.minWidth);
    if (!style.minWidth && !style.width) style.minWidth = `${lenCh}ch`;
    return style;
  };

  return (
    <div className="w-full rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between p-2 sm:p-3 border-b border-border bg-muted/40">
        <div className="text-xs sm:text-sm text-muted-foreground">
          {(() => {
            const count = resolvedColumns
              .filter((c) => c.filter)
              .map((c) => ({ type: c.filterType ?? "stringColumnFilter", value: filters[c._key] }))
              .filter(({ type, value }) =>
                type === "dateColumnFilter"
                  ? value instanceof Date
                  : !!value?.toString()?.trim()
              ).length;
            return count > 0 ? `${count} active filter(s)` : "";
          })()}
        </div>
        <Button variant="outline" className="inline-flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2" onClick={openFilterSheet}>
          <FilterIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="min-w-full table-fixed text-xs sm:text-sm">
          <colgroup>
            {resolvedColumns.map((col) => (
              <col key={col._key} style={getColStyle(col)} />
            ))}
          </colgroup>
          <thead className="bg-muted text-muted-foreground sticky top-0 z-10">
            <tr>
              {resolvedColumns.map((col) => (
                <th
                  key={col._key}
                  className={`px-2 sm:px-3 py-2 text-left align-middle ${col.headerClass || ""} ${col.sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => onHeaderClick(col)}
                  style={getColStyle(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col._header}
                    {sortConfig.field === col._key && (
                      sortConfig.direction === "asc" ? (
                        <ChevronUpIcon className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedRows && pagedRows.length > 0 ? (
              pagedRows.map((row, idx) => (
                <tr key={row.id ?? idx} className="border-t odd:bg-muted/30">
                  {resolvedColumns.map((col) => (
                    <td
                      key={col._key}
                      className={`px-2 sm:px-3 py-2 align-middle wrap-break-word md:whitespace-nowrap ${col.cellClass || ""}`}
                      style={getColStyle(col)}
                    >
                      {typeof col.cellRenderer === "function"
                        ? col.cellRenderer(row)
                        : typeof col.cell === "function"
                        ? col.cell(row)
                        : row[col._key] ?? ""}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-3 py-6 text-center text-muted-foreground"
                  colSpan={resolvedColumns.length}
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex items-center justify-between gap-3 p-2 sm:p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground">Rows per page:</span>
          <select
            className="rounded-md border border-input bg-transparent px-2 py-1 text-xs sm:text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            value={pageSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPageSize(val);
              setPageIndex(0);
            }}
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-muted-foreground">
            {totalRows === 0
              ? "0 of 0"
              : `${pageIndex * pageSize + 1}-${Math.min((pageIndex + 1) * pageSize, totalRows)} of ${totalRows}`}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="px-2 py-1"
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
              disabled={pageIndex === 0}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              className="px-2 py-1"
              onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
              disabled={pageIndex >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetContent side="right" className="[&>button]:cursor-pointer">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-3 mr-4 ml-4">
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 pl-2">
            {resolvedColumns.filter((c) => c.filter).map((c) => {
              const type = c.filterType ?? "stringColumnFilter";
              return (
                <div key={c._key} className="space-y-2">
                  <div className="text-sm font-medium text-foreground">{c._header}</div>
                  {type === "dateColumnFilter" ? (
                    <MEDatePicker
                      label={""}
                      placeholder={"Select date"}
                      // todayClassName="bg-danger/20 text-danger ring-1 ring-danger rounded-full"
                      selectedDate={filterDraftAll[c._key] ?? ""}
                      onSelect={(date) =>
                        setFilterDraftAll((prev) => ({ ...prev, [c._key]: date }))
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      value={filterDraftAll[c._key] ?? ""}
                      onChange={(e) =>
                        setFilterDraftAll((prev) => ({ ...prev, [c._key]: e.target.value }))
                      }
                      placeholder={c.filterPlaceholder ?? "Type to filter"}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    />
                  )}
                </div>
              );
            })}
            </div>
            <div className="flex gap-2 pr-2 pl-2 mt-6">
              <Button onClick={applyFilter} className="px-3">Apply</Button>
              <Button variant="secondary" onClick={() => setFilterSheetOpen(false)} className="px-3">Cancel</Button>
              <Button variant="ghost" className="px-3 text-danger hover:bg-danger/10" onClick={clearAllFilters}>Clear All</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

MEDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      key: PropTypes.string,
      headerName: PropTypes.node,
      header: PropTypes.node,
      headerClass: PropTypes.string,
      cellClass: PropTypes.string,
      sortable: PropTypes.bool,
      filter: PropTypes.bool,
      filterType: PropTypes.oneOf(["stringColumnFilter", "dateColumnFilter"]),
      filterPlaceholder: PropTypes.string,
      filterPredicate: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      cellRenderer: PropTypes.func,
      cell: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyText: PropTypes.string,
};

export default MEDataTable;
