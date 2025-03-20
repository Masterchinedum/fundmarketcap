'use client'

import { useState } from "react"
import { logout } from "@/actions/logout"
import { toast } from "sonner"

interface LogoutButtonProps {
  children?: React.ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    try {
      setIsPending(true)
      await logout()
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Something went wrong!", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <span 
      onClick={handleLogout} 
      className={`cursor-pointer ${isPending ? 'opacity-70 pointer-events-none' : ''}`}
    >
      {children}
    </span>
  )
}