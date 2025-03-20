'use client'

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RegisterSchema, registerSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [pending, startTransition] = useTransition()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  function onRegisterSubmit(values: RegisterSchema) {
    setError('')
    setSuccess('')

    startTransition(() => {
      register(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper 
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial 
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField 
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe" 
                      className="bg-background focus-visible:ring-primary focus-visible:ring-2 transition-all"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField 
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*******"
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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}