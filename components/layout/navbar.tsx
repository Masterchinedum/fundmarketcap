"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FaChartLine, FaSearch } from "react-icons/fa"
import { LuGauge } from "react-icons/lu"
import { BsNewspaper } from "react-icons/bs"
import { MdOutlineStar } from "react-icons/md"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"
import { UserButton } from "@/components/auth/user-button"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
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
  const [isSearchActive, setIsSearchActive] = useState(false)
  const user = useCurrentUser()
  const pathname = usePathname()
  
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="mr-4 md:hidden">
          <MobileNav routes={routes} />
        </div>
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary mr-2">₣MC</span>
          <span className="hidden md:inline-block font-semibold">FundMarketCap</span>
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
        <div className={cn(
          "hidden sm:flex relative ml-auto mr-4 transition-all duration-200 ease-in-out",
          isSearchActive ? "w-72" : "w-48"
        )}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search coins..."
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <UserButton />
          ) : (
            <LoginButton mode="modal" asChild>
              <Button variant="default" size="sm">Sign in</Button>
            </LoginButton>
          )}
        </div>
      </div>
    </div>
  )
}