import { PageCard } from "@/shared/components/layout/PageCard";
import { EntradaRapidaForm } from "@/features/doacoes/components";

export function DoacoesPage() {
  return (
    <PageCard
      title="Entrada Rápida de Doações"
      description="Registre múltiplos itens doados de uma só vez. Cada item será transformado automaticamente em um lote individual."
    >
      <EntradaRapidaForm />
    </PageCard>
  );
}
