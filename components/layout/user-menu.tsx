"use client"

import { useState } from "react"
import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { RiDashboardLine } from "react-icons/ri"
import { FiHelpCircle } from "react-icons/fi"
import { LuLogOut } from "react-icons/lu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { LogoutButton } from "@/components/auth/logout-button"
import { useCurrentUser } from "@/hooks/use-current-user"

export function UserMenu() {
  const user = useCurrentUser()
  const [open, setOpen] = useState(false)

  if (!user) {
    return null
  }

  // Get first letter of name or email for avatar fallback
  const getInitials = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase()
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 focus:outline-none">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium">
            {user.name || user.email?.split('@')[0]}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" onClick={() => setOpen(false)}>
              <CgProfile className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/portfolio" onClick={() => setOpen(false)}>
              <RiDashboardLine className="mr-2 h-4 w-4" />
              <span>My Portfolio</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/watchlist" onClick={() => setOpen(false)}>
              <RiDashboardLine className="mr-2 h-4 w-4" />
              <span>My Watchlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" onClick={() => setOpen(false)}>
              <IoSettingsOutline className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" onClick={() => setOpen(false)}>
              <FiHelpCircle className="mr-2 h-4 w-4" />
              <span>Help &amp; Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LuLogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}