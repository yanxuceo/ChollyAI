'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import io from 'socket.io-client'
import HomeView from '../components/HomeView'
import WeatherView from '../components/WeatherView'
import WorkoutView from '../components/WorkoutView'
import TransportView from '../components/TransportView'

interface WorkoutData {
  type: string
  duration: number
  calories: number
  steps?: number
  heartRate?: number
}

interface LayoutState {
  currentView: 'home' | 'workout' | 'transport' | 'weather'
  data: WorkoutData | null
}

export default function Home() {
  const [state, setState] = useState<LayoutState>({
    currentView: 'home',
    data: null
  })
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:8000')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Connected to server')
    })

    newSocket.on('VIEW_CHANGE', (data) => {
      console.log('Received view change:', data)
      setState({
        currentView: data.view,
        data: data.data
      })
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const changeView = (view: string) => {
    console.log('Changing view to:', view)
    socket?.emit('message', { view })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-4 right-4 flex gap-4 z-50">
        <button 
          onClick={() => changeView('home')}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Home
        </button>
        <button 
          onClick={() => changeView('workout')}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Workout
        </button>
        <button 
          onClick={() => changeView('weather')}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Weather
        </button>
        <button 
          onClick={() => changeView('transport')}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Transport
        </button>
      </nav>

      {/* Views */}
      <AnimatePresence mode="wait" initial={false}>
        {state.currentView === 'home' && <HomeView />}
        {state.currentView === 'workout' && <WorkoutView data={state.data as WorkoutData} />}
        {state.currentView === 'transport' && <TransportView data={state.data} />}
        {state.currentView === 'weather' && <WeatherView data={state.data} />}
      </AnimatePresence>
    </div>
  )
} 