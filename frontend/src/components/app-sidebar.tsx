import * as React from "react"
import {
  IconBox,
  IconCategory,
  IconDashboard,
  IconExchange,
  IconPackage,
  IconPrinter,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { useAuth } from "@/contexts/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Categorias",
      url: "/categorias",
      icon: IconCategory,
    },
    {
      title: "Produtos",
      url: "/produtos",
      icon: IconBox,
    },
    {
      title: "Lotes",
      url: "/lotes",
      icon: IconPackage,
    },
    {
      title: "Movimentações",
      url: "/movimentacoes",
      icon: IconExchange,
    },
    {
      title: "Etiquetas",
      url: "/etiquetas",
      icon: IconPrinter,
    },
  ]

  if (user?.perfil === "ADMIN") {
    navMain.push({
      title: "Usuários",
      url: "/usuarios",
      icon: IconUsers,
    })
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconBox className="size-5!" />
                <span className="text-base font-semibold">Sistema de Doações</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
