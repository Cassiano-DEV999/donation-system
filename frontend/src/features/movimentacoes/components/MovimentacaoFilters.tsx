import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconFilter, IconX } from "@tabler/icons-react";
import { useLotesSimples } from "@/features/lotes/api";
import type { MovimentacaoFilters, TipoMovimentacao } from "../types";

interface MovimentacaoFiltersProps {
  tempFilters: MovimentacaoFilters;
  onFilterChange: (filters: MovimentacaoFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

const tiposMovimentacao: { value: TipoMovimentacao; label: string }[] = [
  { value: "ENTRADA", label: "Entrada" },
  { value: "SAIDA", label: "Saída" },
  { value: "AJUSTE_PERDA", label: "Ajuste Perda" },
  { value: "AJUSTE_GANHO", label: "Ajuste Ganho" },
];

export function MovimentacaoFiltersComponent({
  tempFilters,
  onFilterChange,
  onApply,
  onReset,
}: MovimentacaoFiltersProps) {
  const { data: lotes } = useLotesSimples();

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
            <Label>Lote</Label>
            <Select
              value={tempFilters.loteId?.toString() || ""}
              onValueChange={(value) =>
                onFilterChange({
                  ...tempFilters,
                  loteId: value ? parseInt(value) : undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os lotes" />
              </SelectTrigger>
              <SelectContent>
                {lotes?.map((lote) => (
                  <SelectItem key={lote.id} value={lote.id.toString()}>
                    {lote.descricaoProdutos} (Estoque: {lote.quantidadeAtual})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Tipo de Movimentação</Label>
            <Select
              value={tempFilters.tipo || ""}
              onValueChange={(value) =>
                onFilterChange({
                  ...tempFilters,
                  tipo: (value as TipoMovimentacao) || undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                {tiposMovimentacao.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Data Início</Label>
            <Input
              type="date"
              value={tempFilters.dataInicio || ""}
              onChange={(e) =>
                onFilterChange({
                  ...tempFilters,
                  dataInicio: e.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Data Fim</Label>
            <Input
              type="date"
              value={tempFilters.dataFim || ""}
              onChange={(e) =>
                onFilterChange({
                  ...tempFilters,
                  dataFim: e.target.value,
                })
              }
            />
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
