'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import io, { Socket } from 'socket.io-client'
import HomeView from '../components/HomeView'
import WeatherView from '../components/WeatherView'
import WorkoutView from '../components/WorkoutView'
import TransportView from '../components/TransportView'

interface LayoutState {
  currentView: 'home' | 'workout' | 'transport' | 'weather'
  data: Record<string, unknown>
}

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [state, setState] = useState<LayoutState>({
    currentView: 'home',
    data: {}
  })

  useEffect(() => {
    const newSocket = io('http://localhost:8000')
    setSocket(newSocket)

    newSocket.on('VIEW_CHANGE', (data) => {
      setState({
        currentView: data.view,
        data: data.data
      })
    })

    // Handle fullscreen
    const handleFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      }
    }

    // Auto fullscreen on Raspberry Pi
    if (navigator.userAgent.includes('Linux')) {
      handleFullscreen()
    }

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {state.currentView === 'home' && <HomeView />}
        {state.currentView === 'workout' && <WorkoutView data={state.data} />}
        {state.currentView === 'transport' && <TransportView data={state.data} />}
        {state.currentView === 'weather' && <WeatherView data={state.data} />}
      </AnimatePresence>
    </div>
  )
} 