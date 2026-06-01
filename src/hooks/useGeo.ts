'use client'

import { useState, useEffect } from 'react'

export function useGeo() {
  const [isUAE, setIsUAE] = useState(false)
  const [geoLoading, setGeoLoading] = useState(true)

  useEffect(() => {
    fetch('/api/geo')
      .then(r => r.json())
      .then((d: { isUAE: boolean }) => { if (d.isUAE) setIsUAE(true) })
      .catch(() => {})
      .finally(() => setGeoLoading(false))
  }, [])

  return { isUAE, geoLoading }
}
