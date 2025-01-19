'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { format } from 'date-fns'

// Add this glowing border animation
const GlowingBorder = ({ children, color = "blue" }) => (
  <div className="relative group">
    <motion.div
      className={`absolute inset-0 rounded-2xl bg-gradient-to-r 
        ${color === "blue" ? "from-blue-500/50 to-purple-500/50" : 
         color === "orange" ? "from-orange-500/50 to-red-500/50" : 
         "from-green-500/50 to-teal-500/50"}
      `}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      ease: "easeInOut"
      }}
      style={{ filter: 'blur(20px)', zIndex: -1 }}
    />
    {children}
  </div>
)

// Replace WorldTimeWidget with PhotoFrame
const PhotoFrame = () => (
  <GlowingBorder color="purple">
    <motion.div 
      className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10
        shadow-[inset_0_0_20px_rgba(147,51,234,0.2)]"
      whileHover={{ scale: 1.02 }}
    >
      {/* Photo Container */}
      <motion.div 
        className="relative overflow-hidden rounded-lg aspect-[4/3]
          border-2 border-white/10 shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-purple-400/50"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-purple-400/50"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/50"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-purple-400/50"></div>
        
        {/* The photo */}
        <motion.img
          src="/img/IMG_2823.JPG"
          alt="Memory"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{
            scale: [1.1, 1.05],
            rotate: [-1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Optional caption */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white/90
          bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-sm font-medium">Beautiful Memories</p>
          <p className="text-xs text-white/70">Winter 2024</p>
        </div>
      </motion.div>
    </motion.div>
  </GlowingBorder>
)

// Update the SmartHomeWidget to include Quick Actions
const SmartHomeWidget = ({ indoor }) => (
  <GlowingBorder color="green">
        <motion.div 
      className="bg-black/60 backdrop-blur-xl rounded-2xl p-3 border border-white/10
        shadow-[inset_0_0_20px_rgba(34,197,94,0.2)]"
          whileHover={{ scale: 1.02 }}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Smart Home</h2>
          <span className="text-xl">🏠</span>
        </div>

        {/* Temperature, Humidity and Heating in one row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-black/30 rounded-xl p-2">
            <span className="text-xs text-gray-400">Room</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">{indoor.roomTemp}</span>
              <span className="text-xs text-gray-400">°C</span>
            </div>
          </div>
          <div className="bg-black/30 rounded-xl p-2">
            <span className="text-xs text-gray-400">Humidity</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">{indoor.humidity}</span>
              <span className="text-xs text-gray-400">%</span>
            </div>
          </div>
          <div className="bg-black/30 rounded-xl p-2">
            <span className="text-xs text-gray-400">Heating</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">21.5</span>
              <span className="text-xs text-gray-400">°C</span>
            </div>
          </div>
        </div>

        {/* Light Controls - Side by side with small switches */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/30 rounded-xl p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Living Room</span>
                <span className="text-yellow-400 text-xs">💡</span>
              </div>
              <motion.button 
                className="w-8 h-4 rounded-full bg-green-500/20 flex items-center px-0.5"
                whileHover={{ scale: 1.05 }}
              >
              <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  layout
                />
              </motion.button>
            </div>
          </div>
          <div className="bg-black/30 rounded-xl p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Bedroom</span>
                <span className="text-yellow-400 text-xs">💡</span>
              </div>
              <motion.button 
                className="w-8 h-4 rounded-full bg-gray-700/50 flex items-center justify-end px-0.5"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full bg-gray-400"
                  layout
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
              </motion.div>
  </GlowingBorder>
)

// Update WeatherWidget to show only outdoor data
const WeatherWidget = ({ data, historyEvent }) => (
  <GlowingBorder color="orange">
    <motion.div 
      className="h-full bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10
        shadow-[inset_0_0_20px_rgba(237,137,54,0.2)]
        relative overflow-hidden"
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <div className="relative z-10 space-y-4">
        <h2 className="text-2xl font-bold text-white">Weather Forecast</h2>
        
        {/* Today and Next 2 Days Forecast */}
        <div className="grid grid-cols-3 gap-4">
          {/* Today's Weather */}
          <div className="col-span-1 bg-black/30 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-2">Today</p>
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">{data.temp}</span>
                  <span className="text-lg text-gray-400 ml-1">°C</span>
                </div>
                <p className="text-sm text-gray-400">{data.condition}</p>
              </div>
              <WeatherIcon condition={data.condition} className="w-12 h-12" />
            </div>
            <div className="flex gap-4 text-gray-400 text-xs mt-3">
              <div>
                <span>Humidity</span>
                <p className="font-semibold">{data.humidity}% 💧</p>
              </div>
              <div>
                <span>Wind</span>
                <p className="font-semibold">{data.wind} km/h 💨</p>
              </div>
            </div>
          </div>

          {/* Next 2 Days */}
          {data.forecast.slice(0, 2).map((day) => (
            <div key={day.date} className="bg-black/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">{day.date}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex gap-2 text-sm mb-1">
                    <span className="text-white font-semibold">{day.high}°</span>
                    <span className="text-gray-400">{day.low}°</span>
                  </div>
                  <p className="text-xs text-gray-400">{day.condition}</p>
                </div>
                <WeatherIcon condition={day.condition} className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Tasks and History */}
        <div className="grid grid-cols-2 gap-4">
          {/* ToDo List */}
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">Today's Tasks</h3>
              <span className="text-xl">📝</span>
            </div>
            <div className="space-y-2">
              {[
                { text: "Team meeting at 10:00", done: true },
                { text: "Review project proposal", done: false },
                { text: "Prepare presentation", done: false }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded border ${task.done ? 'bg-green-500/50 border-green-400' : 'border-gray-500'}`}>
                    {task.done && <span className="text-xs text-white">✓</span>}
                  </div>
                  <span className={task.done ? 'text-gray-500 line-through' : 'text-gray-300'}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* History section */}
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">Today in History</h3>
              <span className="text-xl">📚</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-purple-300">{historyEvent.year}</p>
              <p className="text-sm font-medium text-white">{historyEvent.title}</p>
              <p className="text-xs text-gray-400 line-clamp-2">{historyEvent.description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </GlowingBorder>
)

const EnvironmentWidget = ({ indoor, outdoor }) => (
  <motion.div 
    className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-white">Environment</h2>
      <span className="text-xl">🏠</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400">Indoor</h3>
        <div className="bg-black/30 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Temperature</p>
              <p className="text-lg font-bold text-white">{indoor.temp}°C</p>
            </div>
            <span className="text-xl">🌡️</span>
          </div>
        </div>
        <div className="bg-black/30 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Humidity</p>
              <p className="text-lg font-bold text-white">{indoor.humidity}%</p>
            </div>
            <span className="text-xl">💧</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400">Outdoor</h3>
        <div className="bg-black/30 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Temperature</p>
              <p className="text-lg font-bold text-white">{outdoor.temp}°C</p>
            </div>
            <span className="text-xl">🌡️</span>
          </div>
        </div>
        <div className="bg-black/30 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Humidity</p>
              <p className="text-lg font-bold text-white">{outdoor.humidity}%</p>
            </div>
            <span className="text-xl">💧</span>
          </div>
        </div>
      </div>
          </div>
        </motion.div>
)

const GermanPhraseWidget = ({ phrase }) => (
        <motion.div 
    className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
          whileHover={{ scale: 1.01 }}
        >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-white">German Phrase</h2>
      <span className="text-xl">🇩🇪</span>
    </div>
    <div className="bg-black/30 rounded-xl p-4">
      <p className="text-2xl font-bold text-blue-400 mb-2">{phrase.phrase}</p>
      <p className="text-lg text-white mb-1">{phrase.meaning}</p>
      <p className="text-sm text-gray-400">{phrase.context}</p>
    </div>
  </motion.div>
)

// Fix the ParticleBackground component
const ParticleBackground = () => {
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 5) % 100}%`,
      delay: i * 0.1
    }))
  )

  return (
                <motion.div 
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
                >
      {particles.map((particle) => (
                  <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ["-20px", "120px"],
            opacity: [0, 1, 0],
          }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
            delay: particle.delay,
          }}
          style={{
            left: particle.left,
          }}
        />
      ))}
                </motion.div>
  )
}

// Add this cool wave animation for the voice indicator
const WaveAnimation = () => (
  <div className="absolute inset-0">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute inset-0 border-4 border-blue-500/30 rounded-full"
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
        }}
      />
    ))}
              </div>
)

// Add this at the top of the file
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null
  return children
}

// Replace the entire WaveformVisualizer with this new version
const WaveformVisualizer = () => {
  // Add time state to create movement
  const [time, setTime] = useState(0)

  // Update time continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev + 0.1) % (Math.PI * 2))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent">
      <div className="relative w-[1000px] h-full mx-auto flex items-center">
        <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
          {Array.from({ length: 128 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-[4px] rounded-full bg-gradient-to-b from-blue-500/80 to-blue-400/50"
              style={{
                height: `${20 + Math.sin((i / 10) + time) * 10}px`,
                opacity: 0.5 + Math.sin((i / 10) + time) * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Update VoiceIndicator to use ClientOnly
const VoiceIndicator = React.memo(() => (
  <ClientOnly>
    <WaveformVisualizer />
  </ClientOnly>
))

// Add the ChollyAI brand component
const BrandOverlay = () => (
  <motion.div 
    className="fixed top-8 left-8 z-50"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <motion.h1 
      className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500
        filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      animate={{ 
        textShadow: [
          "0 0 20px rgba(59,130,246,0.5)",
          "0 0 40px rgba(59,130,246,0.3)",
          "0 0 20px rgba(59,130,246,0.5)"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      ChollyAI
    </motion.h1>
  </motion.div>
)

// Add neon text effect
const NeonText = ({ children, color = "blue" }) => (
  <span className={`
    font-bold
    ${color === "blue" ? "text-blue-400" : "text-orange-400"}
    drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]
  `}>
    {children}
  </span>
)

// Update the WeatherIcon to support different conditions
const WeatherIcon = ({ condition, className = "" }) => {
  // Choose icon based on condition
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return (
          <circle cx="12" cy="12" r="5" className="fill-yellow-400 stroke-yellow-500" />
        )
      case 'cloudy':
        return (
          <path 
            d="M3,15 Q8,17 13,15 T23,15" 
            className="fill-gray-300 stroke-gray-400"
          />
        )
      case 'rainy':
        return (
          <>
            <path 
              d="M3,12 Q8,14 13,12 T23,12" 
              className="fill-gray-400 stroke-gray-500"
            />
            <line x1="8" y1="15" x2="8" y2="19" className="stroke-blue-400" />
            <line x1="12" y1="15" x2="12" y2="19" className="stroke-blue-400" />
            <line x1="16" y1="15" x2="16" y2="19" className="stroke-blue-400" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 0.95, 1]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        {getIcon()}
      </svg>
    </motion.div>
  )
}

// Update DateTimeDisplay to be client-only
const DateTimeDisplay = () => {
  // Start with a null initial state
  const [dateTime, setDateTime] = useState<Date | null>(null)
  
  const sunriseTime = "06:42"
  const sunsetTime = "19:38"

  useEffect(() => {
    // Set initial time only on client
    setDateTime(new Date())
    
    const timer = setInterval(() => setDateTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Don't render anything until we have a date
  if (!dateTime) return null

  return (
    <motion.div 
      className="fixed top-8 right-8 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-6">
        <motion.div 
          className="flex items-baseline gap-3"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(147,51,234,0.3)",
              "0 0 40px rgba(147,51,234,0.2)",
              "0 0 20px rgba(147,51,234,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium text-purple-300/80 font-mono w-[16ch]">
            {format(dateTime, "yyyy-MM-dd (EEE)")}
          </span>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400 font-mono w-[8ch] inline-block">
            {format(dateTime, "HH:mm:ss")}
          </span>
        </motion.div>

        {/* Sunrise/Sunset Info */}
        <motion.div className="bg-black/30 rounded-xl px-3 py-1.5 backdrop-blur-sm border border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 3V5M5.3 7.3L7.2 9.2M3 14H5M19 14H21M16.8 9.2L18.7 7.3M12 19V22M7 14C7 11.2 9.2 9 12 9C14.8 9 17 11.2 17 14" 
                  stroke="#FCD34D" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs font-medium text-amber-200/90">{sunriseTime}</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 19V21M5.3 16.7L7.2 14.8M3 12H5M19 12H21M16.8 14.8L18.7 16.7M7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12" 
                  stroke="#FB923C" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs font-medium text-orange-200/90">{sunsetTime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function HomeView() {
  const [time, setTime] = useState(() => new Date())
  const [weatherData] = useState({ 
    temp: 22,
    condition: 'Clear',
    humidity: 45,
    wind: 12,
    feelsLike: 24,
    forecast: [
      {
        date: 'Tomorrow',
        condition: 'Cloudy',
        high: 23,
        low: 18
      },
      {
        date: 'Wednesday',
        condition: 'Rainy',
        high: 21,
        low: 16
      },
      {
        date: 'Thursday',
        condition: 'Clear',
        high: 25,
        low: 19
      }
    ]
  })
  const [smartHome] = useState({
    roomTemp: 21.5,
    humidity: 42
  })
  const [germanPhrase] = useState({
    phrase: "Alles klar",
    meaning: "All clear / OK",
    context: "Commonly used to confirm understanding or agreement"
  })
  const [historyEvent] = useState({
    year: "1969",
    title: "First Moon Landing",
    description: "Apollo 11 astronauts Neil Armstrong and Edwin 'Buzz' Aldrin became the first humans to land on the Moon."
  })
  const [todos] = useState([
    { text: "Team meeting at 10:00", done: true },
    { text: "Review project proposal", done: false },
    { text: "Prepare presentation", done: false }
  ])

  const timeZones = [
    { city: 'Local', offset: 0 },
    { city: 'Beijing', offset: 8 },
    { city: 'New York', offset: -4 },
    { city: 'LA', offset: -7 }
  ]

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeIn = (offset: number) => {
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000)
    const cityTime = new Date(utc + (3600000 * offset))
    return format(cityTime, 'HH:mm')
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4"
    >
      <div className="h-full pt-20 grid grid-cols-[2fr_1fr] gap-4 mx-4">
        <motion.div>
          <WeatherWidget data={weatherData} historyEvent={historyEvent} />
        </motion.div>
        <div className="space-y-4">
          <PhotoFrame />
          <SmartHomeWidget indoor={smartHome} />
        </div>
      </div>

      <BrandOverlay />
      <DateTimeDisplay />
      <VoiceIndicator />
    </motion.div>
  )
}