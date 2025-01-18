'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import io from 'socket.io-client'
import HomeView from '../components/HomeView'
import WeatherView from '../components/WeatherView'
import WorkoutView from '../components/WorkoutView'
import TransportView from '../components/TransportView'

interface WorkoutData {
  type: string
  duration: number
  calories: number
}

interface WeatherData {
  temperature: number
  condition: string
}

interface TransportData {
  route: string
  nextArrival: string
  status: string
}

interface LayoutState {
  currentView: 'home' | 'workout' | 'transport' | 'weather'
  data: WorkoutData | WeatherData | TransportData | null
}

export default function Home() {
  const [state, setState] = useState<LayoutState>({
    currentView: 'home',
    data: null
  })

  useEffect(() => {
    const newSocket = io('http://localhost:8000')

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
        {state.currentView === 'workout' && <WorkoutView data={state.data as WorkoutData} />}
        {state.currentView === 'transport' && <TransportView data={state.data as TransportData} />}
        {state.currentView === 'weather' && <WeatherView data={state.data as WeatherData} />}
      </AnimatePresence>
    </div>
  )
} 