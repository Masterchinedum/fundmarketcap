import { CheckCircledIcon } from '@radix-ui/react-icons'

interface FormSuccessProps {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className="flex items-center gap-2 bg-emerald-500/10 rounded-md text-sm text-emerald-500 p-3 transition-all animate-in fade-in-50 duration-100">
      <CheckCircledIcon className="size-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}