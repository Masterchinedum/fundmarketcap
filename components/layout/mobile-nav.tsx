"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

interface MobileNavProps {
  routes: {
    href: string
    label: string
    icon: React.FC<{ className?: string }>
  }[]
}

export function MobileNav({ routes }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="px-2 py-6">
          <Link href="/" className="flex items-center mb-6" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold text-primary mr-2">₣MC</span>
            <span className="font-semibold text-foreground">FundMarketCap</span>
          </Link>
          <nav className="flex flex-col gap-1">
            {routes.map((route) => (
              <SheetClose asChild key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                    pathname === route.href
                      ? "text-primary font-medium bg-accent"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}