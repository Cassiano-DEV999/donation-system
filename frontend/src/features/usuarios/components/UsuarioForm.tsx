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
import type { UsuarioRequest, UsuarioResponse, PerfilUsuario } from "../types";

interface UsuarioFormProps {
  initialData?: UsuarioResponse;
  onSubmit: (data: UsuarioRequest) => void;
  isSubmitting: boolean;
}

const perfis: { value: PerfilUsuario; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "VOLUNTARIO", label: "Voluntário" },
];

export function UsuarioForm({
  initialData,
  onSubmit,
  isSubmitting,
}: UsuarioFormProps) {
  const [formData, setFormData] = useState(() => ({
    nome: initialData?.nome || "",
    email: initialData?.email || "",
    senha: "",
    perfil: initialData?.perfil || ("" as PerfilUsuario | ""),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioData: UsuarioRequest = {
      nome: formData.nome,
      email: formData.email,
      perfil: formData.perfil as PerfilUsuario,
      ...(formData.senha && { senha: formData.senha }),
    };

    onSubmit(usuarioData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nome">
            Nome <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome completo"
            required
            maxLength={200}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="email@exemplo.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="senha">
            Senha {!initialData && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id="senha"
            type="password"
            value={formData.senha}
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
            placeholder={
              initialData
                ? "Deixe em branco para manter"
                : "Mínimo 6 caracteres"
            }
            required={!initialData}
            minLength={6}
          />
          {initialData && (
            <p className="text-xs text-muted-foreground">
              Deixe em branco para manter a senha atual
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="perfil">
            Perfil <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.perfil}
            onValueChange={(value) =>
              setFormData({ ...formData, perfil: value as PerfilUsuario })
            }
            required
          >
            <SelectTrigger id="perfil">
              <SelectValue placeholder="Selecione o perfil" />
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : initialData ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
