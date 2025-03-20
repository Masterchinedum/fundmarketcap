"use client"

import { DollarSign, BarChart3, Globe, Database, ChartBar } from "lucide-react"
import { formatNumber } from "@/lib/utils"

interface StatsOverviewProps {
  marketCap: number
  volume24h: number
  btcDominance: number
  ethDominance: number
  activeCryptocurrencies: number
  markets: number
}

export function StatsOverview({
  marketCap,
  volume24h,
  btcDominance,
  ethDominance,
  activeCryptocurrencies,
  markets,
}: StatsOverviewProps) {
  const stats = [
    {
      label: "Market Cap",
      value: `$${formatNumber(marketCap)}`,
      icon: DollarSign,
    },
    {
      label: "24h Volume",
      value: `$${formatNumber(volume24h)}`,
      icon: BarChart3,
    },
    {
      label: "BTC Dominance",
      value: `${btcDominance.toFixed(1)}%`,
      icon: ChartBar,
    },
    {
      label: "ETH Dominance",
      value: `${ethDominance.toFixed(1)}%`,
      icon: ChartBar,
    },
    {
      label: "Cryptocurrencies",
      value: formatNumber(activeCryptocurrencies),
      icon: Database,
    },
    {
      label: "Markets",
      value: formatNumber(markets),
      icon: Globe,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className="bg-card hover:border-primary/50 transition-colors p-4 rounded-lg border shadow-sm group"
        >
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <stat.icon className="h-4 w-4 mr-1 text-primary group-hover:text-primary/80 transition-colors" />
            <span>{stat.label}</span>
          </div>
          <p className="font-bold text-foreground group-hover:text-primary transition-colors">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}