import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Categoria, CategoriaFormData } from "../types";

interface CategoriaFormProps {
  categoria?: Categoria | null;
  onSubmit: (data: CategoriaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CategoriaForm({
  categoria,
  onSubmit,
  onCancel,
  isLoading = false,
}: CategoriaFormProps) {
  const [formData, setFormData] = useState(() => ({
    nome: categoria?.nome || "",
    descricao: categoria?.descricao || "",
    icone: categoria?.icone || "",
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      return;
    }

    const data: CategoriaFormData = {
      nome: formData.nome,
      descricao: formData.descricao || undefined,
      icone: formData.icone || undefined,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome *</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          placeholder="Nome da categoria"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) =>
            setFormData({ ...formData, descricao: e.target.value })
          }
          placeholder="Descrição da categoria"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icone">Ícone (opcional)</Label>
        <Input
          id="icone"
          value={formData.icone}
          onChange={(e) => setFormData({ ...formData, icone: e.target.value })}
          placeholder="Ex: 📦"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : categoria ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
