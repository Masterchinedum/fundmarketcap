'use client'

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay
} from '@/components/ui/dialog'
import { LoginForm } from "@/components/auth/login-form"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export function LoginButton({
  children,
  mode = 'redirect',
  asChild = false,
}: LoginButtonProps) {
  const router = useRouter()
  
  function onClick() {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogOverlay className="backdrop-blur-sm bg-background/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent className="p-0 w-auto bg-transparent border-none shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span 
      onClick={onClick} 
      className={`cursor-pointer ${asChild ? "" : "inline-block"}`}
    >
      {children}
    </span>
  )
}