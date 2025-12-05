import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconBox } from "@tabler/icons-react";
import { useProdutos } from "@/features/produtos/api";
import { useMontarKit } from "../api";

interface MontagemKitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MontagemKitDialog({ isOpen, onClose }: MontagemKitDialogProps) {
  const { data: produtosData } = useProdutos(
    { isKit: "true" },
    { page: 0, size: 1000 }
  );
  const montarKitMutation = useMontarKit();

  const [formData, setFormData] = useState({
    produtoKitId: "",
    quantidade: "",
  });

  const kits = produtosData?.content.filter((p) => p.isKit) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await montarKitMutation.mutateAsync({
      produtoKitId: parseInt(formData.produtoKitId),
      quantidade: parseInt(formData.quantidade),
    });

    setFormData({ produtoKitId: "", quantidade: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconBox className="h-5 w-5" />
            Montagem de Kit
          </DialogTitle>
          <DialogDescription>
            Selecione um kit e a quantidade para montagem. O sistema irá
            consumir os componentes do estoque automaticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="produtoKitId">
                Kit <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.produtoKitId}
                onValueChange={(value) =>
                  setFormData({ ...formData, produtoKitId: value })
                }
                required
              >
                <SelectTrigger id="produtoKitId">
                  <SelectValue placeholder="Selecione o kit" />
                </SelectTrigger>
                <SelectContent>
                  {kits.map((kit) => (
                    <SelectItem key={kit.id} value={kit.id.toString()}>
                      {kit.nome} ({kit.componentes.length} componentes)
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
                placeholder="Quantos kits montar?"
                required
              />
            </div>

            {formData.produtoKitId && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium mb-1">Componentes do Kit:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {kits
                    .find((k) => k.id.toString() === formData.produtoKitId)
                    ?.componentes.map((comp, idx) => (
                      <li key={idx}>
                        {comp.nome} - {comp.quantidade}x
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={montarKitMutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={montarKitMutation.isPending}>
              {montarKitMutation.isPending ? "Montando..." : "Montar Kit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
