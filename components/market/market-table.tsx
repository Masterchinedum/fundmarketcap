"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { 
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MarketRow } from "@/components/market/market-row"

export interface Cryptocurrency {
  id: string
  rank: number
  name: string
  symbol: string
  price: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  sparkline: number[]
}

interface MarketTableProps {
  data: Cryptocurrency[]
  title?: string
  caption?: string
  limit?: number
  showPagination?: boolean
}

export function MarketTable({ 
  data, 
  title, 
  caption, 
  limit = 10, 
  showPagination = true 
}: MarketTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Cryptocurrency>("rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" 
      ? Number(aValue) - Number(bValue) 
      : Number(bValue) - Number(aValue)
  })

  const paginatedData = sortedData.slice((page - 1) * limit, page * limit)
  const totalPages = Math.ceil(data.length / limit)

  const handleSort = (column: keyof Cryptocurrency) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const renderSortIcon = (column: keyof Cryptocurrency) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" 
      ? <ChevronUp className="ml-1 h-4 w-4 text-primary" /> 
      : <ChevronDown className="ml-1 h-4 w-4 text-primary" />
  }

  return (
    <div className="w-full">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="rounded-md border">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] hover:text-primary transition-colors" onClick={() => handleSort("rank")}>
                <div className="flex items-center cursor-pointer group">#
                  {renderSortIcon("rank")}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("name")}>
                <div className="flex items-center cursor-pointer">Name
                  {renderSortIcon("name")}
                </div>
              </TableHead>
              <TableHead className="text-right" onClick={() => handleSort("price")}>
                <div className="flex items-center justify-end cursor-pointer">Price
                  {renderSortIcon("price")}
                </div>
              </TableHead>
              <TableHead className="text-right" onClick={() => handleSort("priceChange24h")}>
                <div className="flex items-center justify-end cursor-pointer">24h %
                  {renderSortIcon("priceChange24h")}
                </div>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell" onClick={() => handleSort("priceChange7d")}>
                <div className="flex items-center justify-end cursor-pointer">7d %
                  {renderSortIcon("priceChange7d")}
                </div>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell" onClick={() => handleSort("marketCap")}>
                <div className="flex items-center justify-end cursor-pointer">Market Cap
                  {renderSortIcon("marketCap")}
                </div>
              </TableHead>
              <TableHead className="text-right hidden lg:table-cell" onClick={() => handleSort("volume24h")}>
                <div className="flex items-center justify-end cursor-pointer">Volume (24h)
                  {renderSortIcon("volume24h")}
                </div>
              </TableHead>
              <TableHead className="text-right hidden lg:table-cell">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((crypto) => (
              <MarketRow key={crypto.id} crypto={crypto} />
            ))}
          </TableBody>
        </Table>
      </div>
      
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}