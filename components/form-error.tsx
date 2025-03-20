import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className="flex items-center gap-2 bg-destructive/10 rounded-md text-sm text-destructive p-3 transition-all animate-in fade-in-50 duration-100">
      <ExclamationTriangleIcon className="size-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}