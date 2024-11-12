import { Button } from "@/components/ui/button";
import { VercelLogo } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AppContextProviders } from "@/contexts";
import { I18nProviderClient } from "@/locales/client";
import { Handshake, Home, LineChart, Package, Package2, PanelLeft, Settings, ShoppingCart, Users2 } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { ReactElement } from "react";
import { Menu } from "../../../components/library/(navigation)/menu";
import { NavItem } from "../../../components/library/(navigation)/nav-item";
import SocialAccounts from "../../../components/library/(navigation)/social-accounts";
import { User } from "../../../components/library/(navigation)/user";
import WorkspacesSwitcher from "../../../components/library/(navigation)/workspaces-switcher";
import Providers from "./providers";

export default async function DashboardLayout({ params, children }: { params: Promise<{ locale: string }>; children: ReactElement }) {
  const { locale } = await params;

  return (
    <SessionProvider>
      <I18nProviderClient locale={locale}>
        <AppContextProviders>
          <Providers>
            <main className="flex min-h-screen w-full flex-col bg-muted/40">
              <DesktopNav />
              <div className="flex flex-col sm:pl-14 h-screen">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 py-3">
                  <MobileNav />
                  <div className="gap-4 hidden md:flex">
                    <WorkspacesSwitcher />
                    <SocialAccounts />
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 text-center z-50">
                    <div className="flex-2 flex items-center justify-center">
                      <Menu />
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center space-x-2 ml-auto z-50 gap-2">
                    <User />
                  </div>
                </header>
                <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40 overflow-y-auto bg-gray-200">{children}</main>
              </div>
            </main>
          </Providers>
        </AppContextProviders>
      </I18nProviderClient>
    </SessionProvider>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        <NavItem href="" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/workspaces" label="Workspaces">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/social-accounts" label="Social Accounts">
          <Handshake className="h-5 w-5" />
        </NavItem>

        <NavItem href="/customers" label="Customers">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="#" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="#" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground">
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}