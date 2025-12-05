

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1 p-6">
            {title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
