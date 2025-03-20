export default function AuthLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-background">
      {/* Logo/branding at the top of the content */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-primary mr-2">₣MC</span>
          <span className="font-semibold">FundMarketCap</span>
        </div>
      </div>
      
      {/* Clean, simple container for auth content */}
      <div className="w-full max-w-md px-4">
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          {children}
        </div>
      </div>
      
      {/* Simple footer */}
      <div className="mt-8 text-xs text-muted-foreground text-center">
        <span>© {new Date().getFullYear()} FundMarketCap • Track cryptocurrency and fund market data</span>
      </div>
    </div>
  )
}