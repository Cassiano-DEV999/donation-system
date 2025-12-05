

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements?: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
  disabled = false,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationProps) {
  const canGoPrevious = currentPage > 0 && !disabled;
  const canGoNext = currentPage < totalPages - 1 && !disabled;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 py-4">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {totalElements !== undefined && (
            <>
              Página {currentPage + 1} de {totalPages || 1} • Total:{" "}
              {totalElements} itens
            </>
          )}
          {totalElements === undefined && (
            <>
              Página {currentPage + 1} de {totalPages || 1}
            </>
          )}
        </div>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Itens por página:
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                onPageSizeChange(parseInt(value));
                onPageChange(0); // Reset to first page when changing size
              }}
              disabled={disabled}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
        >
          <IconChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
        >
          Próxima
          <IconChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
