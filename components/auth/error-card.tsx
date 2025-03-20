import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Authentication Error"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <div className="bg-destructive/15 rounded-full p-3">
          <ExclamationTriangleIcon className="text-destructive size-8" />
        </div>
        <p className="text-base text-center text-muted-foreground">
          There was a problem with your authentication request.
        </p>
        <p className="text-sm text-center text-muted-foreground">
          Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-2 mt-2">
          <Button asChild variant="outline">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}