import { SearchInput } from "@/shared/components/forms";
import { Button } from "@/components/ui/button";
import { IconFilter, IconX } from "@tabler/icons-react";
import type { CategoriaFilters } from "../types";

interface CategoriaFiltersProps {
  filters: CategoriaFilters;
  onFilterChange: <K extends keyof CategoriaFilters>(
    key: K,
    value: CategoriaFilters[K]
  ) => void;
  onClear: () => void;
  onSearch: () => void;
}

export function CategoriaFiltersComponent({
  filters,
  onFilterChange,
  onClear,
  onSearch,
}: CategoriaFiltersProps) {
  const hasActiveFilters = !!filters.nome;

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <IconFilter className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Filtros</h3>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <SearchInput
            value={filters.nome || ""}
            onChange={(value) => onFilterChange("nome", value)}
            onSearch={onSearch}
            placeholder="Buscar por nome..."
          />
        </div>

        {hasActiveFilters && (
          <Button variant="outline" size="icon" onClick={onClear}>
            <IconX className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
