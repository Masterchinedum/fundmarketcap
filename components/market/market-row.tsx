"use client"

import Link from "next/link"
import { TableRow, TableCell } from "@/components/ui/table"
import { type Cryptocurrency } from "@/components/market/market-table"
import { formatNumber, formatPercent } from "@/lib/utils"
import { SparklineChart } from "@/components/market/sparkline-chart"

interface MarketRowProps {
  crypto: Cryptocurrency
}

export function MarketRow({ crypto }: MarketRowProps) {
  const priceChangeClass = (change: number) =>
    change >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{crypto.rank}</TableCell>
      <TableCell>
        <Link 
          href={`/crypto/${crypto.id}`}
          className="flex items-center gap-2 hover:text-primary"
        >
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs">{crypto.symbol.charAt(0)}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{crypto.name}</span>
            <span className="text-xs text-muted-foreground">{crypto.symbol}</span>
          </div>
        </Link>
      </TableCell>
      <TableCell className="text-right font-medium">
        ${formatNumber(crypto.price)}
      </TableCell>
      <TableCell className={`text-right ${priceChangeClass(crypto.priceChange24h)}`}>
        {formatPercent(crypto.priceChange24h)}
      </TableCell>
      <TableCell className={`text-right hidden md:table-cell ${priceChangeClass(crypto.priceChange7d)}`}>
        {formatPercent(crypto.priceChange7d)}
      </TableCell>
      <TableCell className="text-right hidden md:table-cell">
        ${formatNumber(crypto.marketCap)}
      </TableCell>
      <TableCell className="text-right hidden lg:table-cell">
        ${formatNumber(crypto.volume24h)}
      </TableCell>
      <TableCell className="text-right hidden lg:table-cell">
        <SparklineChart 
          data={crypto.sparkline} 
          color={crypto.priceChange7d >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-5))"} 
          width={120} 
          height={40} 
        />
      </TableCell>
    </TableRow>
  )
}