import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconPlus, IconX } from "@tabler/icons-react";
import { PageCard } from "@/shared/components/layout/PageCard";
import { SearchInput } from "@/shared/components/forms/SearchInput";
import { Pagination } from "@/shared/components/data-display/Pagination";
import { usePagination } from "@/shared/hooks/usePagination";
import { Badge } from "@/components/ui/badge";
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
  UsuarioTable,
  UsuarioFiltersComponent,
  UsuarioDialog,
} from "@/features/usuarios/components";
import { useUsuarios, useDeleteUsuario } from "@/features/usuarios/api";
import { useUsuarioFilters, useUsuarioDialog } from "@/features/usuarios/hooks";

const perfilLabels: Record<string, string> = {
  ADMIN: "Admin",
  VOLUNTARIO: "Voluntário",
};

export function UsuariosPageNew() {
  const { page, pageSize, goToPage, setPageSize } = usePagination();
  const {
    filters,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    clearFilter,
  } = useUsuarioFilters();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useUsuarios(
    { ...filters, nome: searchTerm || filters.nome },
    { page, size: pageSize }
  );

  const { isOpen, editingUsuario, openCreate, openEdit, close } =
    useUsuarioDialog();
  const deleteMutation = useDeleteUsuario();

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
        title="Usuários"
        description="Gerencie os usuários do sistema (Admin)"
        actions={
          <Button onClick={openCreate}>
            <IconPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar por nome..."
              />
            </div>
            <UsuarioFiltersComponent
              tempFilters={tempFilters}
              onFilterChange={setTempFilters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.perfil && (
                <Badge variant="secondary" className="gap-1">
                  Perfil: {perfilLabels[filters.perfil]}
                  <button
                    onClick={() => clearFilter("perfil")}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          <UsuarioTable
            usuarios={data?.content || []}
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

      <UsuarioDialog
        isOpen={isOpen}
        onClose={close}
        editingUsuario={editingUsuario}
      />

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode
              ser desfeita.
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
