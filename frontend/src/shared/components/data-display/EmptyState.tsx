
import { IconPackageOff } from "@tabler/icons-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "Nenhum dado encontrado",
  description = "Não há informações para exibir no momento.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-muted-foreground">
        {icon || <IconPackageOff className="h-16 w-16" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
