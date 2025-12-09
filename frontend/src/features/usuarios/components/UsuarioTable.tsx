import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconEdit, IconTrash, IconShield, IconUser } from "@tabler/icons-react";
import { LoadingSpinner } from "@/shared/components/data-display/LoadingSpinner";
import { EmptyState } from "@/shared/components/data-display/EmptyState";
import type { UsuarioResponse, PerfilUsuario } from "../types";

interface UsuarioTableProps {
  usuarios: UsuarioResponse[];
  isLoading: boolean;
  onEdit: (usuario: UsuarioResponse) => void;
  onDelete: (id: number) => void;
}

const getPerfilConfig = (perfil: PerfilUsuario) => {
  const configs = {
    ADMIN: {
      label: "Admin",
      variant: "default" as const,
      icon: IconShield,
    },
    VOLUNTARIO: {
      label: "Voluntário",
      variant: "secondary" as const,
      icon: IconUser,
    },
  };
  return configs[perfil];
};

export function UsuarioTable({
  usuarios,
  isLoading,
  onEdit,
  onDelete,
}: UsuarioTableProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (usuarios.length === 0) {
    return <EmptyState title="Nenhum usuário encontrado" />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Perfil</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((usuario) => {
            const perfilConfig = getPerfilConfig(usuario.perfil);
            const Icon = perfilConfig.icon;

            return (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  <Badge variant={perfilConfig.variant} className="gap-1">
                    <Icon className="h-3 w-3" />
                    {perfilConfig.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(usuario)}
                    >
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(usuario.id)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
