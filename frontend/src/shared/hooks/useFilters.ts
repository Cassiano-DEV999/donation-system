
import { useState, useCallback } from "react";

export function useFilters<T extends Record<string, unknown>>(
  initialFilters: T
) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<T>(initialFilters);

  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<T>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    setActiveFilters(filters);
  }, [filters]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setActiveFilters(initialFilters);
  }, [initialFilters]);

  const clearFilters = useCallback(() => {
    const cleared = Object.keys(initialFilters).reduce(
      (acc, key) => ({
        ...acc,
        [key]: "",
      }),
      {} as T
    );
    setFilters(cleared);
    setActiveFilters(cleared);
  }, [initialFilters]);

  return {
    filters,
    activeFilters,
    updateFilter,
    updateFilters,
    applyFilters,
    resetFilters,
    clearFilters,
    setFilters,
  };
}
