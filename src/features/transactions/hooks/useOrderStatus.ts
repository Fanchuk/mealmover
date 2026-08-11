'use client'

import { useEffect, useRef, useState } from 'react'
import { pusherClient } from '@/src/lib/pusher'

export function useOrderStatus(orderId: string, initialStatus: string) {
  const [status, setStatus] = useState(initialStatus)
  const initialRef = useRef(initialStatus)

  useEffect(() => {
    initialRef.current = initialStatus
    setStatus(initialStatus)
  }, [initialStatus])

  useEffect(() => {
    const channel = pusherClient.subscribe(`order-${orderId}`)

    channel.bind('status-update', (data: { status: string }) => {
      console.log('📡 Pusher:', data.status)
      setStatus(data.status)
    })

    return () => {
      channel.unbind_all()
      pusherClient.unsubscribe(`order-${orderId}`)
    }
  }, [orderId])

  return status
}