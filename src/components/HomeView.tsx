import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

// Add SVG component for weather
const WeatherIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-16 h-16 text-yellow-400"
    fill="currentColor"
  >
    <path d="M12 7a5 5 0 012.606 9.296A6.002 6.002 0 0117.5 22H7a6 6 0 01-2.89-11.282A5 5 0 1112 7z"/>
    <circle cx="12" cy="5" r="3" fill="currentColor"/>
  </svg>
)

export default function HomeView() {
  const [time, setTime] = useState(new Date())
  const [weatherData] = useState({ temp: 22, condition: 'Clear' })
  const [todoItems] = useState([
    { id: 1, text: 'Team Meeting', time: '10:00 AM' },
    { id: 2, text: 'Gym Session', time: '5:30 PM' },
  ])

  // Optimize animations for Raspberry Pi
  const animationConfig = {
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...animationConfig}
      className="p-8"
    >
      {/* Time Display */}
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          {format(time, 'HH:mm:ss')}
        </h1>
        <p className="text-xl text-gray-400 mt-2">
          {format(time, 'EEEE, MMMM do')}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {/* Weather Card */}
        <motion.div 
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Weather</h2>
              <p className="text-4xl font-bold text-blue-400">{weatherData.temp}°C</p>
              <p className="text-gray-400">{weatherData.condition}</p>
            </div>
            <div className="text-6xl">
              <WeatherIcon />
            </div>
          </div>
        </motion.div>

        {/* Todo Card */}
        <motion.div 
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Today&apos;s Tasks</h2>
          <div className="space-y-4">
            {todoItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-2xl"
              >
                <span className="text-white">{item.text}</span>
                <span className="text-sm text-gray-400">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div 
          className="col-span-2 bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">System Status</h2>
          <div className="grid grid-cols-3 gap-4">
            {["CPU", "Memory", "Network"].map((metric, index) => (
              <div key={metric} className="text-center">
                <p className="text-gray-400 mb-2">{metric}</p>
                <motion.div 
                  className="w-full h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.3 
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}