
"use client";

import { cn } from "@/lib/utils";
import { BrainCircuit, Menu, User as UserIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function Header() {
  const pathname = usePathname();
  const { user, logout, loading: authLoading } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/papers", label: "Papers" },
    { href: "/history", label: "History" },
    { href: "/contact", label: "Contact" },
  ];

  const showNav = !pathname.includes("/login") && !pathname.includes("/register");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            GATE AI Prep
          </span>
        </Link>

        {/* Desktop Navigation */}
        {showNav && (
          <nav className="hidden items-center gap-4 text-sm lg:flex lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {authLoading ? (
             <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            showNav && (
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link href="/login">Login</Link>
              </Button>
            )
          )}

          {/* Mobile Navigation */}
          {showNav && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                      <BrainCircuit className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline">GATE AI Prep</span>
                  </Link>
                  <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                          <span className="sr-only">Close</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-foreground/80",
                          pathname === item.href
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
