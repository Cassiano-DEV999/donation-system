

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
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { Produto } from "../types";
import { LoadingSpinner, EmptyState } from "@/shared/components/data-display";

interface ProdutoTableProps {
  produtos: Produto[];
  isLoading: boolean;
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void;
}

export function ProdutoTable({
  produtos,
  isLoading,
  onEdit,
  onDelete,
}: ProdutoTableProps) {
  if (isLoading) {
    return <LoadingSpinner text="Carregando produtos..." />;
  }

  if (!produtos || produtos.length === 0) {
    return (
      <EmptyState
        title="Nenhum produto encontrado"
        description="Cadastre o primeiro produto para começar."
      />
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Código de Barras</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell className="font-medium">{produto.nome}</TableCell>
              <TableCell>{produto.categoria?.nome || "-"}</TableCell>
              <TableCell>{produto.codigoBarrasFabricante || "-"}</TableCell>
              <TableCell>
                {produto.isKit ? (
                  <Badge variant="secondary">Kit</Badge>
                ) : (
                  <Badge variant="outline">Produto</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(produto)}
                  >
                    <IconEdit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(produto.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <IconTrash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
