import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLotesSimples } from "@/features/lotes/api";
import type { MovimentacaoRequest, TipoMovimentacao } from "../types";

interface MovimentacaoFormProps {
  onSubmit: (data: MovimentacaoRequest) => void;
  isSubmitting: boolean;
}

const tiposMovimentacao: { value: TipoMovimentacao; label: string }[] = [
  { value: "ENTRADA", label: "Entrada" },
  { value: "SAIDA", label: "Saída" },
  { value: "AJUSTE_PERDA", label: "Ajuste Perda" },
  { value: "AJUSTE_GANHO", label: "Ajuste Ganho" },
];

export function MovimentacaoForm({
  onSubmit,
  isSubmitting,
}: MovimentacaoFormProps) {
  const { data: lotes } = useLotesSimples();

  const [formData, setFormData] = useState<{
    loteId: string;
    tipo: TipoMovimentacao | "";
    quantidade: string;
  }>({
    loteId: "",
    tipo: "",
    quantidade: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const movimentacaoData: MovimentacaoRequest = {
      loteId: parseInt(formData.loteId),
      tipo: formData.tipo as TipoMovimentacao,
      quantidade: parseInt(formData.quantidade),
    };

    onSubmit(movimentacaoData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="loteId">
            Lote <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.loteId}
            onValueChange={(value) =>
              setFormData({ ...formData, loteId: value })
            }
            required
          >
            <SelectTrigger id="loteId">
              <SelectValue placeholder="Selecione o lote" />
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
          <Label htmlFor="tipo">
            Tipo de Movimentação <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.tipo}
            onValueChange={(value) =>
              setFormData({ ...formData, tipo: value as TipoMovimentacao })
            }
            required
          >
            <SelectTrigger id="tipo">
              <SelectValue placeholder="Selecione o tipo" />
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
          <Label htmlFor="quantidade">
            Quantidade <span className="text-destructive">*</span>
          </Label>
          <Input
            id="quantidade"
            type="number"
            min="1"
            value={formData.quantidade}
            onChange={(e) =>
              setFormData({ ...formData, quantidade: e.target.value })
            }
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Criar Movimentação"}
        </Button>
      </div>
    </form>
  );
}
