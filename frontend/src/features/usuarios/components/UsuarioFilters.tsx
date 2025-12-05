import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconFilter, IconX } from "@tabler/icons-react";
import type { UsuarioFilters, PerfilUsuario } from "../types";

interface UsuarioFiltersProps {
  tempFilters: UsuarioFilters;
  onFilterChange: (filters: UsuarioFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

const perfis: { value: PerfilUsuario; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "VOLUNTARIO", label: "Voluntário" },
];

export function UsuarioFiltersComponent({
  tempFilters,
  onFilterChange,
  onApply,
  onReset,
}: UsuarioFiltersProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <IconFilter className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
          <DialogDescription>
            Aplique filtros para refinar sua pesquisa
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Perfil</Label>
            <Select
              value={tempFilters.perfil || ""}
              onValueChange={(value) =>
                onFilterChange({
                  ...tempFilters,
                  perfil: (value as PerfilUsuario) || undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os perfis" />
              </SelectTrigger>
              <SelectContent>
                {perfis.map((perfil) => (
                  <SelectItem key={perfil.value} value={perfil.value}>
                    {perfil.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onReset}>
            <IconX className="mr-2 h-4 w-4" />
            Limpar
          </Button>
          <Button onClick={onApply}>Aplicar Filtros</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
