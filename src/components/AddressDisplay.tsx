'use client'

import { useState, useEffect } from 'react'
import { getCachedAddress, getShortAddress, type Address } from '@/utils/geocoding'
import { MapPin, Loader2 } from 'lucide-react'

interface AddressDisplayProps {
  latitude: number
  longitude: number
  showIcon?: boolean
  className?: string
  shortFormat?: boolean
}

export function AddressDisplay({ 
  latitude, 
  longitude, 
  showIcon = true, 
  className = '',
  shortFormat = true 
}: AddressDisplayProps) {
  const [address, setAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchAddress = async () => {
      try {
        setLoading(true)
        setError(false)
        
        const result = await getCachedAddress(latitude, longitude)
        
        if (isMounted) {
          setAddress(result)
          setError(!result)
        }
      } catch (err) {
        if (isMounted) {
          setError(true)
          console.error('Failed to fetch address:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchAddress()

    return () => {
      isMounted = false
    }
  }, [latitude, longitude])

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showIcon && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        <span className="text-muted-foreground">Loading location...</span>
      </div>
    )
  }

  if (error || !address) {
    // Don't show coordinates as fallback, just hide the component
    return null
  }

  const displayText = shortFormat ? getShortAddress(address) : address.formattedAddress

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <MapPin className="h-4 w-4 text-muted-foreground" />}
      <span className="text-foreground" title={address.formattedAddress}>
        {displayText}
      </span>
    </div>
  )
}