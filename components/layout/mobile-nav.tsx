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
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {routes.map((route) => (
            <SheetClose asChild key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 text-lg rounded-md hover:bg-accent",
                  pathname === route.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}