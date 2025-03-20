"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaChartLine } from "react-icons/fa"
import { LuGauge } from "react-icons/lu"
import { BsNewspaper } from "react-icons/bs"
import { MdOutlineStar } from "react-icons/md"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Search } from "@/components/layout/search"
import { UserMenu } from "@/components/layout/user-menu"
import { useCurrentUser } from "@/hooks/use-current-user"

const routes = [
  {
    label: "Markets",
    href: "/markets",
    icon: FaChartLine,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: LuGauge,
  },
  {
    label: "Watchlist",
    href: "/watchlist",
    icon: MdOutlineStar,
  },
  {
    label: "News",
    href: "/news",
    icon: BsNewspaper,
  },
]

export function Navbar() {
  const user = useCurrentUser()
  const pathname = usePathname()
  
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="mr-4 md:hidden">
          <MobileNav routes={routes} />
        </div>
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary mr-2">₣MC</span>
          <span className="hidden md:inline-block font-semibold text-foreground">FundMarketCap</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4 mr-2" />
              {route.label}
            </Link>
          ))}
        </nav>
        
        {/* Search Bar */}
        <div className="hidden sm:flex ml-auto mr-4">
          <Search />
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <LoginButton mode="modal" asChild>
              <Button size="sm">Sign in</Button>
            </LoginButton>
          )}
        </div>
      </div>
    </div>
  )
}