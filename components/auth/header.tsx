interface HeaderProps {
  label: string
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col gap-3 items-center justify-center">
      <div className="flex items-center justify-center">
        <span className="text-xl font-bold text-primary mr-2">₣MC</span>
        <span className="font-semibold">FundMarketCap</span>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {label}
      </p>
      <div className="w-8 h-1 bg-primary/20 rounded-full my-1"></div>
    </div>
  )
}