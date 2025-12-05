

import { useState, useCallback } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function usePagination({
  initialPage = 0,
  initialPageSize = 10,
  onPageChange,
  onPageSizeChange,
}: UsePaginationProps = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      onPageChange?.(newPage);
    },
    [onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setPageSize(newSize);
      setPage(0); // Reset to first page when changing size
      onPageSizeChange?.(newSize);
    },
    [onPageSizeChange]
  );

  const nextPage = useCallback(() => {
    handlePageChange(page + 1);
  }, [page, handlePageChange]);

  const previousPage = useCallback(() => {
    if (page > 0) {
      handlePageChange(page - 1);
    }
  }, [page, handlePageChange]);

  const goToPage = useCallback(
    (targetPage: number) => {
      if (targetPage >= 0) {
        handlePageChange(targetPage);
      }
    },
    [handlePageChange]
  );

  const reset = useCallback(() => {
    handlePageChange(0);
  }, [handlePageChange]);

  return {
    page,
    pageSize,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    nextPage,
    previousPage,
    goToPage,
    reset,
  };
}
