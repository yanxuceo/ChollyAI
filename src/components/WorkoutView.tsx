import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface WorkoutData {
  type: string;
  duration: number;
  calories: number;
}

interface WorkoutViewProps {
  data: WorkoutData;
}

// Add nutrition data type
interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Add GlowingBorder component
const GlowingBorder = ({ children, color = "blue" }) => (
  <div className="relative group">
    <motion.div
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/50 to-purple-500/50"
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

// Add these helper functions at the top
const getActivityColor = (count: number) => {
  if (count === 0) return 'bg-gray-800' // Empty
  if (count >= 3) return 'bg-green-700' // Very active
  if (count >= 2) return 'bg-green-500' // Active
  return 'bg-green-300' // Light activity
}

const generateQuarterlyData = () => {
  // Generate 13 weeks × 7 days of sample data
  const weeks = Array.from({ length: 13 }, () =>
    Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 4) // 0-3 activities per day
    )
  )
  return weeks
}

// Add this helper for progress ring
const ProgressRing = ({ progress, color, size = 60 }) => {
  const radius = size * 0.4
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background ring */}
        <circle
          className="text-gray-700"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress ring */}
        <circle
          className={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{progress}%</span>
      </div>
    </div>
  )
}

// Add this helper function to get days in month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

// Add this new component for circular progress
const CircularProgress = ({ value, max, size = 120, strokeWidth = 8, children }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = 1 - (value / max)
  const dashoffset = circumference * progress

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="w-full h-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="rgba(255,255,255,0.1)"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="url(#gradient)"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashoffset
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

// Add this new component for multi-ring progress
const NutritionRings = ({ data, size = 120 }) => {
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const center = size / 2

  // Calculate circumference
  const circumference = radius * 2 * Math.PI

  // Calculate individual ring radiuses
  const proteinRadius = radius
  const carbsRadius = radius - strokeWidth - 2
  const fatRadius = radius - (strokeWidth + 2) * 2

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        {/* Protein ring */}
        <circle
          cx={center}
          cy={center}
          r={proteinRadius}
          strokeWidth={strokeWidth}
          stroke="rgba(255,255,255,0.1)"
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={proteinRadius}
          strokeWidth={strokeWidth}
          stroke="#9333EA"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - data.protein / 120)
          }}
        />

        {/* Carbs ring */}
        <circle
          cx={center}
          cy={center}
          r={carbsRadius}
          strokeWidth={strokeWidth}
          stroke="rgba(255,255,255,0.1)"
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={carbsRadius}
          strokeWidth={strokeWidth}
          stroke="#22C55E"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference * 0.85,
            strokeDashoffset: (circumference * 0.85) * (1 - data.carbs / 275)
          }}
        />

        {/* Fat ring */}
        <circle
          cx={center}
          cy={center}
          r={fatRadius}
          strokeWidth={strokeWidth}
          stroke="rgba(255,255,255,0.1)"
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={fatRadius}
          strokeWidth={strokeWidth}
          stroke="#EAB308"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference * 0.7,
            strokeDashoffset: (circumference * 0.7) * (1 - data.fat / 77)
          }}
        />
      </svg>

      {/* Legend */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-xs gap-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-600" />
          <span className="text-gray-300">Protein {Math.round(data.protein / 120 * 100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-gray-300">Carbs {Math.round(data.carbs / 275 * 100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-gray-300">Fat {Math.round(data.fat / 77 * 100)}%</span>
        </div>
      </div>
    </div>
  )
}

// First, add this new component for the running chart
const RunningChart = () => {
  // Example running data for the last 7 days
  const runData = [3.2, 0, 5.1, 2.8, 0, 4.2, 6.5] // in kilometers

  return (
    <div className="flex-1 h-full pr-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white font-medium">Running Distance</h4>
        <span className="text-sm text-gray-400">Last 7 days</span>
      </div>
      
      <div className="flex-1 relative">
        {/* Gradient background for chart */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-blue-500/10 to-transparent rounded-lg" />
        
        {/* Chart */}
        <div className="relative h-full flex items-end gap-2">
          {runData.map((distance, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs text-gray-400">{distance > 0 ? `${distance}km` : ''}</div>
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                style={{ 
                  height: `${(distance / Math.max(...runData)) * 120}px`,
                  opacity: distance > 0 ? 0.7 : 0.1
                }}
              />
              <div className="text-xs text-gray-500">{
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
              }</div>
            </div>
          ))}
        </div>

        {/* Weekly total */}
        <div className="absolute top-0 right-0 bg-black/30 rounded-lg px-3 py-2">
          <div className="text-sm text-gray-400">Weekly Total</div>
          <div className="text-xl font-bold text-white">
            {runData.reduce((a, b) => a + b, 0).toFixed(1)} km
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkoutView({ data }: WorkoutViewProps) {
  // Get current month's days
  const today = new Date()
  const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth())
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const numRows = Math.ceil((daysInMonth + (firstDayOfMonth - 1)) / 7)

  // Example nutrition data
  const nutritionData: NutritionData = {
    calories: 1850,
    protein: 95,
    carbs: 220,
    fat: 65
  }

  const meals = [
    {
      time: "08:30",
      name: "Breakfast",
      items: "Oatmeal with berries, Greek yogurt",
      calories: 420,
      protein: 24,
      completed: true
    },
    {
      time: "12:30",
      name: "Lunch",
      items: "Grilled chicken salad, quinoa",
      calories: 580,
      protein: 38,
      completed: true
    },
    {
      time: "16:00",
      name: "Snack",
      items: "Protein shake, almonds",
      calories: 280,
      protein: 20,
      completed: false
    },
    {
      time: "19:00",
      name: "Dinner",
      items: "Salmon, sweet potato, vegetables",
      calories: 570,
      protein: 35,
      completed: false
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen p-6"
    >
      {/* ChollyAI Brand - adjust top position */}
      <motion.div 
        className="fixed top-4 left-6 z-50"
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

      {/* Main content container - adjust top margin and gap */}
      <div className="h-[calc(100vh-5rem)] mt-14 flex flex-col gap-5">
        {/* Health & Activity Dashboard */}
        <GlowingBorder className="flex-[3]">
          <motion.div 
            className="h-full bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Health & Activity Dashboard</h3>
              
              {/* Date and Time Display */}
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{format(new Date(), 'EEEE, MMMM d')}</span>
                </div>
                <div className="w-px h-4 bg-gray-700" /> {/* Vertical separator */}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{format(new Date(), 'h:mm a')}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start">
              {/* Left: Activity Calendar */}
              <div className="flex-shrink-0">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Sports Tracking</h4>
                <div className="space-y-2">
                  {/* Days of week labels */}
                  <div className="flex gap-[3px]">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div 
                        key={`day-${index}`} 
                        className="text-xs text-gray-500 w-[22px] flex items-center justify-center"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Activity grid */}
                  <div className="grid gap-[3px]">
                    {Array.from({ length: numRows }).map((_, weekIndex) => (
                      <div key={weekIndex} className="flex gap-[3px]">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const dayNum = weekIndex * 7 + dayIndex - firstDayOfMonth + 2
                          const isValidDay = dayNum > 0 && dayNum <= daysInMonth
                          const activity = isValidDay ? Math.floor(Math.random() * 4) : -1

                          return (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className={`w-[22px] h-[22px] rounded-[2px] ${isValidDay ? getActivityColor(activity) : 'bg-transparent'}
                                transition-all duration-200 hover:scale-110 cursor-pointer`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center: Daily Stats */}
              <div className="flex-shrink-0">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Daily Activity</h4>
                <div className="flex gap-5">
                  {/* Steps Card */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-4
                    border border-white/10 hover:scale-105 transition-transform duration-200 w-[140px]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-300">Steps</span>
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <CircularProgress value={7235} max={10000} size={100} strokeWidth={5}>
                      <div className="flex flex-col items-center">
                        {/* Step icon */}
                        <svg className="w-5 h-5 text-purple-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14l9-5-9 16-9-16 9 5z" />
                        </svg>
                        {/* Step count */}
                        <span className="text-2xl font-bold text-white">7,235</span>
                        <span className="text-xs text-gray-400">steps</span>
                      </div>
                    </CircularProgress>
                  </div>

                  {/* Water Card */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl p-4
                    border border-white/10 hover:scale-105 transition-transform duration-200 w-[140px]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-300">Hydration</span>
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3.0001V3.0001C16.9706 3.0001 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3.0001 12 3.0001V3.0001Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3.0001V3.0001C14.5 9.0001 14.5 15.0001 12 21.0001" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3.0001V3.0001C9.5 9.0001 9.5 15.0001 12 21.0001" />
                        </svg>
                      </div>
                    </div>
                    
                    <CircularProgress value={6} max={8} size={110} strokeWidth={6}>
                      <div className="flex flex-col items-center">
                        {/* Water drop icon */}
                        <svg className="w-5 h-5 text-blue-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 21.5C16.1421 21.5 19.5 18.1421 19.5 14C19.5 10.5 17.0858 6.71429 12 3C6.91421 6.71429 4.5 10.5 4.5 14C4.5 18.1421 7.85786 21.5 12 21.5Z" />
                        </svg>
                        {/* Glass count */}
                        <span className="text-2xl font-bold text-white">6</span>
                        <span className="text-xs text-gray-400">glasses</span>
                      </div>
                    </CircularProgress>
                  </div>

                  {/* Seating Time Card */}
                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-xl p-4
                    border border-white/10 hover:scale-105 transition-transform duration-200 w-[140px]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-300">Seating</span>
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M20 12V8M4 12V8M12 4v16M8 4h8M8 20h8M4 12h16" />
                        </svg>
                      </div>
                    </div>
                    
                    <CircularProgress value={5.5} max={8} size={110} strokeWidth={6}>
                      <div className="flex flex-col items-center">
                        {/* Chair icon */}
                        <svg className="w-5 h-5 text-orange-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M6 15h12M6 9h12m-6-3v12m-3 0h6" />
                        </svg>
                        {/* Time display */}
                        <span className="text-2xl font-bold text-white">5:30</span>
                        <span className="text-xs text-gray-400">hours</span>
                      </div>
                    </CircularProgress>
                  </div>

                  {/* Sleep Card */}
                  <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl p-4
                    border border-white/10 hover:scale-105 transition-transform duration-200 w-[140px]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-300">Sleep</span>
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-[110px] justify-center">
                      <span className="text-2xl font-bold text-white">8:00</span>
                      <span className="text-xs text-gray-400 mt-1">Hours</span>
                      {/* Progress bar */}
                      <div className="mt-2 h-1 bg-gray-700 rounded-full">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          style={{ width: `${(8 / 9) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Nutrition */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Nutrition Balance</h4>
                <div className="flex items-center gap-6">
                  <NutritionRings data={nutritionData} size={140} />
                  <div className="space-y-3 text-base">
                    <div className="text-gray-300 flex items-center gap-2">
                      <span className="text-purple-400 text-lg">●</span> 
                      <span>Protein {Math.round(nutritionData.protein / 120 * 100)}%</span>
                    </div>
                    <div className="text-gray-300 flex items-center gap-2">
                      <span className="text-green-400 text-lg">●</span> 
                      <span>Carbs {Math.round(nutritionData.carbs / 275 * 100)}%</span>
                    </div>
                    <div className="text-gray-300 flex items-center gap-2">
                      <span className="text-yellow-400 text-lg">●</span> 
                      <span>Fat {Math.round(nutritionData.fat / 77 * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </GlowingBorder>

        {/* Muscle Building Dashboard */}
        <GlowingBorder color="orange" className="flex-[3]">
          <motion.div 
            className="h-full bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Key Exercises</h3>
              <span className="text-orange-400">💪</span>
            </div>

            <div className="flex">
              {/* Left: Running Chart */}
              <RunningChart />

              {/* Right: Exercises Grid */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                {/* Squat */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-2
                  border border-white/10 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 3a2 2 0 100-4 2 2 0 000 4zM12 7v10M7 17h10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Squat</h4>
                      <div className="text-blue-400 font-medium text-sm">5 × 5 • 225 lbs</div>
                    </div>
                  </div>
                </div>

                {/* Deadlift */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-2
                  border border-white/10 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 3a2 2 0 100-4 2 2 0 000 4zM12 7v8M6 15h12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Deadlift</h4>
                      <div className="text-orange-400 font-medium text-sm">3 × 5 • 275 lbs</div>
                    </div>
                  </div>
                </div>

                {/* Bench Press */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-2
                  border border-white/10 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M6 12h12M12 6v12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Bench Press</h4>
                      <div className="text-green-400 font-medium text-sm">4 × 8 • 185 lbs</div>
                    </div>
                  </div>
                </div>

                {/* Overhead Press */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-2
                  border border-white/10 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 20V4M7 9l5-5 5 5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Overhead Press</h4>
                      <div className="text-purple-400 font-medium text-sm">4 × 6 • 135 lbs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </GlowingBorder>
      </div>
    </motion.div>
  )
} 