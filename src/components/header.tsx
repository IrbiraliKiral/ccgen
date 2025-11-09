"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCreditCard, FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Generate",
      href: "/",
      icon: FaCreditCard,
    },
    {
      label: "Find Bins",
      href: "/bins",
      icon: FaSearch,
    },
  ];

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaCreditCard className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Card Generator</span>
          </Link>

          <nav className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

