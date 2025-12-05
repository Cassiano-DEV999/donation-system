import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { PageCard } from "@/shared/components/layout/PageCard";
import { SearchInput } from "@/shared/components/forms/SearchInput";
import { Pagination } from "@/shared/components/data-display/Pagination";
import { usePagination } from "@/shared/hooks/usePagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Badge } from "@/components/ui/badge";
import { IconX } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LoteTable,
  LoteFiltersComponent,
  LoteDialog,
} from "@/features/lotes/components";
import { useLotes, useDeleteLote } from "@/features/lotes/api";
import { useLoteFilters, useLoteDialog } from "@/features/lotes/hooks";

export function LotesPageNew() {
  const { page, pageSize, goToPage, setPageSize } = usePagination();
  const {
    filters,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    clearFilter,
  } = useLoteFilters();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);

  const { data, isLoading } = useLotes(
    { ...filters, produtoId: debouncedSearch ? undefined : filters.produtoId },
    { page, size: pageSize }
  );

  const { isOpen, editingLote, openCreate, openEdit, close } = useLoteDialog();
  const deleteMutation = useDeleteLote();

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async () => {
    if (deletingId) {
      await deleteMutation.mutateAsync(deletingId);
      setDeletingId(null);
    }
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <>
      <PageCard
        title="Lotes"
        description="Gerencie os lotes de entrada de produtos"
        actions={
          <Button onClick={openCreate}>
            <IconPlus className="mr-2 h-4 w-4" />
            Novo Lote
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar lotes..."
              />
            </div>
            <LoteFiltersComponent
              tempFilters={tempFilters}
              onFilterChange={setTempFilters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.produtoId && (
                <Badge variant="secondary" className="gap-1">
                  Produto: {filters.produtoId}
                  <button
                    onClick={() => clearFilter("produtoId")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.dataEntradaInicio && (
                <Badge variant="secondary" className="gap-1">
                  Data Início: {filters.dataEntradaInicio}
                  <button
                    onClick={() => clearFilter("dataEntradaInicio")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.dataEntradaFim && (
                <Badge variant="secondary" className="gap-1">
                  Data Fim: {filters.dataEntradaFim}
                  <button
                    onClick={() => clearFilter("dataEntradaFim")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.comEstoque !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  {filters.comEstoque ? "Com estoque" : "Sem estoque"}
                  <button
                    onClick={() => clearFilter("comEstoque")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          <LoteTable
            lotes={data?.content || []}
            isLoading={isLoading}
            onEdit={openEdit}
            onDelete={setDeletingId}
          />

          {data && data.totalPages > 0 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              onPageChange={goToPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      </PageCard>

      <LoteDialog isOpen={isOpen} onClose={close} editingLote={editingLote} />

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este lote? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
