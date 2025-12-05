import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useProdutosSimples } from "@/features/produtos/api";
import type { LoteRequest, LoteResponse, UnidadeMedida } from "../types";

interface LoteFormProps {
  initialData?: LoteResponse;
  onSubmit: (data: LoteRequest) => void;
  isSubmitting: boolean;
}

interface ItemFormData {
  produtoId: string;
  quantidade: string;
  dataValidade: string;
  tamanho: string;
  voltagem: string;
}

export function LoteForm({
  initialData,
  onSubmit,
  isSubmitting,
}: LoteFormProps) {
  const { data: produtos } = useProdutosSimples();

  const [formData, setFormData] = useState(() => ({
    dataEntrada:
      initialData?.dataEntrada || new Date().toISOString().split("T")[0],
    unidadeMedida: initialData?.unidadeMedida || ("" as UnidadeMedida | ""),
    observacoes: initialData?.observacoes || "",
  }));

  const [itens, setItens] = useState<ItemFormData[]>(() =>
    initialData?.itens.length
      ? initialData.itens.map((item) => ({
          produtoId: item.produtoId.toString(),
          quantidade: item.quantidade.toString(),
          dataValidade: item.dataValidade || "",
          tamanho: item.tamanho || "",
          voltagem: item.voltagem || "",
        }))
      : [
          {
            produtoId: "",
            quantidade: "",
            dataValidade: "",
            tamanho: "",
            voltagem: "",
          },
        ]
  );

  const addItem = () => {
    setItens([
      ...itens,
      {
        produtoId: "",
        quantidade: "",
        dataValidade: "",
        tamanho: "",
        voltagem: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (itens.length > 1) {
      setItens(itens.filter((_, i) => i !== index));
    }
  };

  const updateItem = (
    index: number,
    field: keyof ItemFormData,
    value: string
  ) => {
    const newItens = [...itens];
    newItens[index] = { ...newItens[index], [field]: value };
    setItens(newItens);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const loteData: LoteRequest = {
      itens: itens
        .filter((item) => item.produtoId && item.quantidade)
        .map((item) => ({
          produtoId: parseInt(item.produtoId),
          quantidade: parseInt(item.quantidade),
          dataValidade: item.dataValidade || undefined,
          tamanho: item.tamanho || undefined,
          voltagem: item.voltagem || undefined,
        })),
      dataEntrada: formData.dataEntrada,
      unidadeMedida: formData.unidadeMedida as UnidadeMedida,
      observacoes: formData.observacoes || undefined,
    };

    onSubmit(loteData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="dataEntrada">
            Data de Entrada <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dataEntrada"
            type="date"
            value={formData.dataEntrada}
            onChange={(e) =>
              setFormData({ ...formData, dataEntrada: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="unidadeMedida">
            Unidade de Medida <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.unidadeMedida}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                unidadeMedida: value as UnidadeMedida,
              })
            }
            required
          >
            <SelectTrigger id="unidadeMedida">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UNIDADE">Unidade</SelectItem>
              <SelectItem value="QUILOGRAMA">Quilograma</SelectItem>
              <SelectItem value="LITRO">Litro</SelectItem>
              <SelectItem value="PACOTE">Pacote</SelectItem>
              <SelectItem value="CAIXA">Caixa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) =>
              setFormData({ ...formData, observacoes: e.target.value })
            }
            placeholder="Observações sobre o lote..."
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>
            Itens do Lote <span className="text-destructive">*</span>
          </Label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <IconPlus className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
        </div>

        {itens.map((item, index) => (
          <div key={index} className="space-y-2 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium">Item {index + 1}</span>
              {itens.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label>
                  Produto <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={item.produtoId}
                  onValueChange={(value) =>
                    updateItem(index, "produtoId", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {produtos?.map((produto) => (
                      <SelectItem
                        key={produto.id}
                        value={produto.id.toString()}
                      >
                        {produto.nome} ({produto.categoria.nome})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>
                    Quantidade <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantidade}
                    onChange={(e) =>
                      updateItem(index, "quantidade", e.target.value)
                    }
                    placeholder="0"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Data de Validade</Label>
                  <Input
                    type="date"
                    value={item.dataValidade}
                    onChange={(e) =>
                      updateItem(index, "dataValidade", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>Tamanho</Label>
                  <Input
                    value={item.tamanho}
                    onChange={(e) =>
                      updateItem(index, "tamanho", e.target.value)
                    }
                    placeholder="Ex: P, M, G"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Voltagem</Label>
                  <Input
                    value={item.voltagem}
                    onChange={(e) =>
                      updateItem(index, "voltagem", e.target.value)
                    }
                    placeholder="Ex: 110V, 220V"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : initialData ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
