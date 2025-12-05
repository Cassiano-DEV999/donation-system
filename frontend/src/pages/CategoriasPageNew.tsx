
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconPlus, IconX } from "@tabler/icons-react";
import { PageCard } from "@/shared/components/layout";
import { Pagination } from "@/shared/components/data-display";
import { usePagination } from "@/shared/hooks";
import {
  useCategorias,
  useDeleteCategoria,
  useCategoriaFilters,
  useCategoriaDialog,
  CategoriaTable,
  CategoriaFiltersComponent,
  CategoriaDialog,
} from "@/features/categorias";

export function CategoriasPageNew() {
  const { page, pageSize, setPage, setPageSize } = usePagination();
  const { filters, activeFilters, updateFilter, applyFilters, clearFilters } =
    useCategoriaFilters();
  const { isOpen, editingCategoria, openCreate, openEdit, close } =
    useCategoriaDialog();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: categoriasData, isLoading } = useCategorias(
    activeFilters,
    page,
    pageSize
  );
  const deleteMutation = useDeleteCategoria();

  const handleSearch = () => {
    setPage(0);
    applyFilters();
  };

  const handleClearFilters = () => {
    clearFilters();
    setPage(0);
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteMutation.mutateAsync(deletingId);
        setDeleteDialogOpen(false);
        setDeletingId(null);
      } catch {
        // Erro já tratado pelo hook
      }
    }
  };

  const categorias = categoriasData?.content || [];
  const totalPages = categoriasData?.totalPages || 0;
  const totalElements = categoriasData?.totalElements || 0;

  const hasActiveFilters = !!activeFilters.nome;

  return (
    <>
      <PageCard
        title="Categorias"
        description="Gerencie as categorias de produtos"
        actions={
          <Button onClick={openCreate}>
            <IconPlus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        }
      >
        <div className="space-y-4">
          <CategoriaFiltersComponent
            filters={filters}
            onFilterChange={updateFilter}
            onClear={handleClearFilters}
            onSearch={handleSearch}
          />

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.nome && (
                <Badge variant="secondary" className="gap-1">
                  Nome: {activeFilters.nome}
                  <button
                    onClick={handleClearFilters}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          <CategoriaTable
            categorias={categorias}
            isLoading={isLoading}
            onEdit={openEdit}
            onDelete={handleDelete}
          />

          {categoriasData && categoriasData.totalPages > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalElements={totalElements}
              onPageChange={setPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      </PageCard>

      <CategoriaDialog
        open={isOpen}
        categoria={editingCategoria}
        onClose={close}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta categoria? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
