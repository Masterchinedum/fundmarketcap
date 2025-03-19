import { ArrowDown, ArrowUp, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { MarketTable, type Cryptocurrency } from "@/components/market/market-table"
import { Navbar } from "@/components/layout/navbar"

// Mock data for the example
const marketStats = {
  marketCap: 2570000000000,
  volume24h: 85700000000,
  btcDominance: 54.2,
  ethDominance: 17.8,
  activeCryptocurrencies: 28500,
  markets: 758
}

const trendingCryptos: Cryptocurrency[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 64231.50,
    priceChange24h: 2.4,
    priceChange7d: 12.8,
    marketCap: 1253000000000,
    volume24h: 38200000000,
    sparkline: [41200, 42000, 41800, 42500, 43100, 43800, 44200, 43900, 43500, 44100]
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3485.25,
    priceChange24h: -0.8,
    priceChange7d: 5.2,
    marketCap: 418000000000,
    volume24h: 21500000000,
    sparkline: [3200, 3250, 3300, 3280, 3350, 3400, 3380, 3450, 3480, 3485]
  },
  {
    id: "binancecoin",
    rank: 3,
    name: "Binance Coin",
    symbol: "BNB",
    price: 562.10,
    priceChange24h: 1.2,
    priceChange7d: -2.7,
    marketCap: 86500000000,
    volume24h: 1850000000,
    sparkline: [570, 565, 568, 572, 580, 575, 573, 565, 560, 562]
  },
  {
    id: "solana",
    rank: 4,
    name: "Solana",
    symbol: "SOL",
    price: 142.35,
    priceChange24h: 5.6,
    priceChange7d: 18.2,
    marketCap: 62300000000,
    volume24h: 3850000000,
    sparkline: [120, 125, 130, 128, 135, 138, 140, 138, 142, 142]
  },
  {
    id: "cardano",
    rank: 5,
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    priceChange24h: -1.5,
    priceChange7d: -3.2,
    marketCap: 16100000000,
    volume24h: 720000000,
    sparkline: [0.47, 0.46, 0.458, 0.455, 0.46, 0.455, 0.452, 0.445, 0.448, 0.45]
  },
  {
    id: "xrp",
    rank: 6,
    name: "XRP",
    symbol: "XRP",
    price: 0.58,
    priceChange24h: 0.8,
    priceChange7d: -1.2,
    marketCap: 31800000000,
    volume24h: 1250000000,
    sparkline: [0.57, 0.572, 0.575, 0.58, 0.585, 0.582, 0.578, 0.575, 0.58, 0.58]
  },
  {
    id: "polkadot",
    rank: 7,
    name: "Polkadot",
    symbol: "DOT",
    price: 7.25,
    priceChange24h: 3.2,
    priceChange7d: 8.6,
    marketCap: 9650000000,
    volume24h: 520000000,
    sparkline: [6.8, 6.9, 7.0, 7.1, 7.05, 7.12, 7.2, 7.18, 7.22, 7.25]
  }
]


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-background border-b">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Today&apos;s Cryptocurrency Prices by Market Cap
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The global crypto market cap is ${marketStats.marketCap / 1e12} trillion, a <span className="text-green-500">2.5%</span> increase over the last day.
              </p>
            </div>
            
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>Market Cap</span>
                </div>
                <p className="font-bold">${(marketStats.marketCap / 1e12).toFixed(2)}T</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  <span>24h Volume</span>
                </div>
                <p className="font-bold">${(marketStats.volume24h / 1e9).toFixed(1)}B</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>BTC Dominance</span>
                </div>
                <p className="font-bold">{marketStats.btcDominance}%</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>ETH Dominance</span>
                </div>
                <p className="font-bold">{marketStats.ethDominance}%</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Cryptocurrencies</span>
                </div>
                <p className="font-bold">{marketStats.activeCryptocurrencies}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Markets</span>
                </div>
                <p className="font-bold">{marketStats.markets}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Table Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <MarketTable 
              data={trendingCryptos} 
              title="Top Cryptocurrencies by Market Cap" 
              caption="Live prices updated every 5 minutes"
              showPagination={false}
            />
          </div>
        </section>
        
        {/* Market Highlights */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Market Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-3">Top Gainers (24h)</h3>
                <div className="space-y-3">
                  {trendingCryptos
                    .filter(c => c.priceChange24h > 0)
                    .sort((a, b) => b.priceChange24h - a.priceChange24h)
                    .slice(0, 3)
                    .map(crypto => (
                      <div key={crypto.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2">
                            <span className="text-xs">{crypto.symbol.charAt(0)}</span>
                          </div>
                          <span className="font-medium">{crypto.name}</span>
                        </div>
                        <div className="flex items-center text-green-500">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>{crypto.priceChange24h.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-3">Top Losers (24h)</h3>
                <div className="space-y-3">
                  {trendingCryptos
                    .filter(c => c.priceChange24h < 0)
                    .sort((a, b) => a.priceChange24h - b.priceChange24h)
                    .slice(0, 3)
                    .map(crypto => (
                      <div key={crypto.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2">
                            <span className="text-xs">{crypto.symbol.charAt(0)}</span>
                          </div>
                          <span className="font-medium">{crypto.name}</span>
                        </div>
                        <div className="flex items-center text-red-500">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span>{Math.abs(crypto.priceChange24h).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Stay up to date with crypto</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest market updates, news, and insights delivered to your inbox.
            </p>
            <form className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow rounded-l-md border-y border-l border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-r-md px-4 py-2 font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
