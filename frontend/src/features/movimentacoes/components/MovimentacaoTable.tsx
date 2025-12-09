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
import {
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconAdjustments,
} from "@tabler/icons-react";
import { LoadingSpinner } from "@/shared/components/data-display/LoadingSpinner";
import { EmptyState } from "@/shared/components/data-display/EmptyState";
import { formatDateTime } from "@/shared/lib/formatters";
import type { MovimentacaoResponse, TipoMovimentacao } from "../types";

interface MovimentacaoTableProps {
  movimentacoes: MovimentacaoResponse[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

const getTipoConfig = (tipo: TipoMovimentacao) => {
  const configs = {
    ENTRADA: {
      label: "Entrada",
      variant: "default" as const,
      icon: IconArrowDown,
    },
    SAIDA: {
      label: "Saída",
      variant: "destructive" as const,
      icon: IconArrowUp,
    },
    AJUSTE_PERDA: {
      label: "Ajuste Perda",
      variant: "secondary" as const,
      icon: IconAdjustments,
    },
    AJUSTE_GANHO: {
      label: "Ajuste Ganho",
      variant: "secondary" as const,
      icon: IconAdjustments,
    },
  };
  return configs[tipo];
};

export function MovimentacaoTable({
  movimentacoes,
  isLoading,
  onDelete,
}: MovimentacaoTableProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (movimentacoes.length === 0) {
    return <EmptyState title="Nenhuma movimentação encontrada" />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Lote</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movimentacoes.map((mov) => {
            const tipoConfig = getTipoConfig(mov.tipo);
            const Icon = tipoConfig.icon;

            return (
              <TableRow key={mov.id}>
                <TableCell className="font-mono text-sm">
                  {formatDateTime(mov.dataHora)}
                </TableCell>
                <TableCell>
                  <Badge variant={tipoConfig.variant} className="gap-1">
                    <Icon className="h-3 w-3" />
                    {tipoConfig.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {mov.lote.itens
                        .map((item) => item.produtoNome)
                        .join(", ")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Estoque: {mov.lote.quantidadeAtual}{" "}
                      {mov.lote.unidadeMedida}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{mov.quantidade}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{mov.usuario.nome}</span>
                    <span className="text-xs text-muted-foreground">
                      {mov.usuario.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(mov.id)}
                  >
                    <IconTrash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
