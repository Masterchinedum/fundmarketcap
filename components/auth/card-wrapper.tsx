'use client'

import { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Header } from "@/components/auth/header"
import { Social } from "./social"
import { BackButton } from "@/components/auth/back-button"

interface CardWrapperProps {
  children: ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] border border-border bg-card shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
      <CardHeader className="pb-4 space-y-2">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="space-y-4">
        {children}   
      </CardContent>

      {showSocial && (
        <CardFooter className="flex flex-col space-y-4 pt-2 px-6 pb-6 border-t">
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <span className="relative bg-card px-2 text-xs uppercase text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="px-6 py-4 bg-muted/20">
        <BackButton 
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  )
}