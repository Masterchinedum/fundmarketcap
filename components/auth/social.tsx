'use client'

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  function onClick(provider: 'google' | 'github') {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <Button 
        variant="outline"
        onClick={() => onClick('google')}
        className="w-full bg-background hover:bg-background/80 border-border hover:border-primary/30 transition-all h-11 flex items-center justify-center"
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        <span className="font-medium">Continue with Google</span>
      </Button>
      <Button 
        variant="outline"
        onClick={() => onClick('github')}
        className="w-full bg-background hover:bg-background/80 border-border hover:border-primary/30 transition-all h-11 flex items-center justify-center"
      >
        <FaGithub className="h-5 w-5 mr-2" />
        <span className="font-medium">Continue with GitHub</span>
      </Button>
    </div>
  )
}