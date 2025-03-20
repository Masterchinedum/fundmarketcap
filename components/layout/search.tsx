"use client"

import { useState, useRef, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchProps {
  className?: string
}

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
}

export function Search({ className }: SearchProps) {
  const [isActive, setIsActive] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setIsActive(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Mock search function - would be replaced with real API call
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)

    // Simulate API call with mock data
    if (searchQuery.length > 1) {
      // Mock results - would be from real API
      const mockResults = [
        { id: '1', name: 'Bitcoin', symbol: 'BTC', price: '$64,231.50', change24h: '2.4%' },
        { id: '2', name: 'Ethereum', symbol: 'ETH', price: '$3,485.25', change24h: '-0.8%' },
        { id: '3', name: 'Binance Coin', symbol: 'BNB', price: '$562.10', change24h: '1.2%' }
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(mockResults)
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
    inputRef.current?.focus()
  }

  const handleItemClick = (id: string) => {
    // Navigate to coin detail page
    router.push(`/crypto/${id}`)
    setShowResults(false)
    setQuery("")
  }

  return (
    <div 
      ref={searchRef}
      className={cn(
        "relative",
        isActive ? "w-64 md:w-80" : "w-48 md:w-64",
        "transition-all duration-200 ease-in-out",
        className
      )}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="w-4 h-4 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="w-full py-2 pl-10 pr-10 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Search coins..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsActive(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:text-primary"
            onClick={handleClear}
          >
            <IoClose className="w-4 h-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Search results dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 border border-border bg-background rounded-md shadow-lg max-h-80 overflow-y-auto">
          <div className="p-2">
            {results.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-primary">{item.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{item.price}</div>
                  <div className={cn(
                    "text-xs",
                    parseFloat(item.change24h) >= 0 
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-red-500 dark:text-red-400"
                  )}>
                    {item.change24h}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}