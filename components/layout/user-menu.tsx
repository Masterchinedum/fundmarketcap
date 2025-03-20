"use client"

import { useState } from "react"
import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { RiDashboardLine } from "react-icons/ri"
import { FiHelpCircle } from "react-icons/fi"
import { LuLogOut } from "react-icons/lu"
import { MdOutlineStar } from "react-icons/md"

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
          <Avatar className="h-8 w-8 ring-2 ring-background">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium text-foreground">
            {user.name || user.email?.split('@')[0]}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link 
              href="/profile" 
              onClick={() => setOpen(false)}
              className="flex items-center text-foreground hover:text-foreground"
            >
              <CgProfile className="mr-2 h-4 w-4 text-primary" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              href="/portfolio" 
              onClick={() => setOpen(false)}
              className="flex items-center text-foreground hover:text-foreground"
            >
              <RiDashboardLine className="mr-2 h-4 w-4 text-primary" />
              <span>My Portfolio</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              href="/watchlist" 
              onClick={() => setOpen(false)}
              className="flex items-center text-foreground hover:text-foreground"
            >
              <MdOutlineStar className="mr-2 h-4 w-4 text-primary" />
              <span>My Watchlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              href="/settings" 
              onClick={() => setOpen(false)}
              className="flex items-center text-foreground hover:text-foreground"
            >
              <IoSettingsOutline className="mr-2 h-4 w-4 text-primary" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              href="/help" 
              onClick={() => setOpen(false)}
              className="flex items-center text-foreground hover:text-foreground"
            >
              <FiHelpCircle className="mr-2 h-4 w-4 text-primary" />
              <span>Help &amp; Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-foreground hover:text-foreground focus:text-foreground"
          >
            <LuLogOut className="mr-2 h-4 w-4 text-primary" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}