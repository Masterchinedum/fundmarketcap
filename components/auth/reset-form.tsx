'use client'

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ResetSchema, resetSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod'
import { reset } from "@/actions/reset"

export function ResetForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [pending, startTransition] = useTransition()

  const form = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    }
  })

  function onResetSubmit(values: ResetSchema) {
    setError('')
    setSuccess('')

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
    })
  }

  return (
    <CardWrapper 
      headerLabel="Forgot your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onResetSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com" 
                      className="bg-background focus-visible:ring-primary focus-visible:ring-2 transition-all"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            disabled={pending} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}