'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MapPin, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useAuth } from '@/hooks/use-auth'

interface LocationPermissionProps {
  onLocationUpdate?: (latitude: number, longitude: number) => void
  showCard?: boolean
}

export function LocationPermission({ onLocationUpdate, showCard = true }: LocationPermissionProps) {
  const { user } = useAuth()
  const { latitude, longitude, error, loading, getCurrentPosition } = useGeolocation()
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle')
  const [updateError, setUpdateError] = useState<string | null>(null)

  const updateUserLocation = useCallback(async (lat: number, lng: number) => {
    if (!user) return

    setUpdateStatus('updating')
    setUpdateError(null)

    try {
      const response = await fetch('/api/users/location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update location')
      }

      setUpdateStatus('success')
      onLocationUpdate?.(lat, lng)
    } catch (error) {
      console.error('Error updating location:', error)
      setUpdateError('Failed to save location')
      setUpdateStatus('error')
    }
  }, [user, onLocationUpdate])

  // Update location in database when coordinates are available
  useEffect(() => {
    if (latitude !== null && longitude !== null && user) {
      updateUserLocation(latitude, longitude)
    }
  }, [latitude, longitude, user]) // Removed updateUserLocation from dependencies to avoid circular reference

  const handleRequestLocation = () => {
    setUpdateStatus('idle')
    setUpdateError(null)
    getCurrentPosition()
  }

  const getStatusIcon = () => {
    if (loading || updateStatus === 'updating') {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    if (updateStatus === 'success') {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    if (error || updateStatus === 'error') {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
    return <MapPin className="h-4 w-4" />
  }

  const getStatusText = () => {
    if (loading) return 'Getting your location...'
    if (updateStatus === 'updating') return 'Saving location...'
    if (updateStatus === 'success') return 'Location saved successfully!'
    if (error) return error
    if (updateError) return updateError
    return 'Share your location for personalized content'
  }

  const content = (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <span className="text-sm font-medium">{getStatusText()}</span>
      </div>

      {(error || updateError) && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            {error || updateError}
          </AlertDescription>
        </Alert>
      )}

      {updateStatus === 'success' && latitude && longitude && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Location updated successfully
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleRequestLocation}
        disabled={loading || updateStatus === 'updating'}
        className="w-full"
        variant={updateStatus === 'success' ? 'outline' : 'default'}
      >
        {loading || updateStatus === 'updating' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loading ? 'Getting Location...' : 'Saving...'}
          </>
        ) : (
          <>
            <MapPin className="mr-2 h-4 w-4" />
            {updateStatus === 'success' ? 'Update Location' : 'Allow Location Access'}
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        We use your location to show nearby restaurants and personalized content. 
        Your location is stored securely and can be updated anytime.
      </p>
    </div>
  )

  if (!showCard) {
    return content
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Access
        </CardTitle>
        <CardDescription>
          Enable location services to discover restaurants and content near you
        </CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}