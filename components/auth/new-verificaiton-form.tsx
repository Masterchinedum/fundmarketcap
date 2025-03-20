'use client'

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircledIcon } from "@radix-ui/react-icons"

import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { newVerification } from "@/actions/new-verification"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function NewVerificationForm() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const token = searchParams.get('token')

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError('Missing verification token!')
      setIsLoading(false)
      return
    }

    try {
      const data = await newVerification(token)
      setSuccess(data.success)
      setError(data.error)
    } catch (error) {
      setError('Something went wrong with the verification process!', error)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper 
      headerLabel="Email Verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col items-center w-full justify-center space-y-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <BeatLoader color="#3B82F6" />
            <p className="text-sm text-muted-foreground">Verifying your email...</p>
          </div>
        )}

        {!isLoading && success && (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-emerald-500/20 rounded-full p-2">
              <CheckCircledIcon className="text-emerald-500 size-8" />
            </div>
            <FormSuccess message={success} />
            <Button asChild className="mt-4 w-full">
              <Link href="/auth/login">Continue to Login</Link>
            </Button>
          </div>
        )}

        {!isLoading && error && (
          <div className="space-y-4">
            <FormError message={error} />
            <Button 
              variant="outline" 
              onClick={onSubmit} 
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </CardWrapper>
  )
}