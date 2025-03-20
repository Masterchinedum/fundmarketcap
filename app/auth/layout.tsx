export default function AuthLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/20 to-background">
      <div className="absolute top-8 left-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary mr-2">₣MC</span>
          <span className="font-semibold text-foreground hidden sm:inline-block">FundMarketCap</span>
        </div>
      </div>
      
      <div className="w-full max-w-md px-4">
        <div className="backdrop-blur-sm bg-background/70 p-4 sm:p-6 rounded-xl shadow-xl border border-border/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} FundMarketCap • Track cryptocurrency and fund market data</span>
      </div>
    </div>
  )
}