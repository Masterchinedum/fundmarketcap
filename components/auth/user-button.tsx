'use client'

import Link from "next/link"
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
} from '@/components/ui/avatar'

import { CgProfile } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { RiDashboardLine } from "react-icons/ri"
import { MdOutlineStar } from "react-icons/md"
import { LuLogOut } from "react-icons/lu"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./logout-button"

export function UserButton() {
  const user = useCurrentUser()

  // Get first letter of name or email for avatar fallback
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase()
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 focus:outline-none">
          <Avatar className="h-8 w-8 ring-2 ring-background">
            <AvatarImage src={user?.image || ''} alt={user?.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center cursor-pointer">
              <CgProfile className="mr-2 h-4 w-4 text-primary" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/portfolio" className="flex items-center cursor-pointer">
              <RiDashboardLine className="mr-2 h-4 w-4 text-primary" />
              <span>My Portfolio</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/watchlist" className="flex items-center cursor-pointer">
              <MdOutlineStar className="mr-2 h-4 w-4 text-primary" />
              <span>My Watchlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center cursor-pointer">
              <IoSettingsOutline className="mr-2 h-4 w-4 text-primary" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 hover:text-red-500">
            <LuLogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}