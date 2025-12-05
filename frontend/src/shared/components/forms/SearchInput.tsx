

import { Input } from "@/components/ui/input";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar...",
  disabled = false,
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  const handleClear = () => {
    onChange("");
    onSearch?.();
  };

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="pl-9 pr-9"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={disabled}
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
          >
            <IconX className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
