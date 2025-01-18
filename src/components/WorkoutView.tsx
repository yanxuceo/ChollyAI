import React from 'react'
import { motion } from 'framer-motion'

interface WorkoutData {
  type: string
  duration: number
  calories: number
  steps?: number
  heartRate?: number
}

interface WorkoutViewProps {
  data: WorkoutData
}

export default function WorkoutView({ data }: WorkoutViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
          Workout
        </h1>
        <p className="text-xl text-gray-400 mt-2">
          {data.type}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {/* Duration Card */}
        <motion.div 
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Duration</h2>
          <div className="flex items-center">
            <p className="text-5xl font-bold text-green-400">
              {Math.floor(data.duration / 60)}
              <span className="text-2xl text-green-600">min</span>
            </p>
          </div>
        </motion.div>

        {/* Calories Card */}
        <motion.div 
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Calories</h2>
          <div className="flex items-center">
            <p className="text-5xl font-bold text-orange-400">
              {data.calories}
              <span className="text-2xl text-orange-600">kcal</span>
            </p>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div 
          className="col-span-2 bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Progress</h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Steps */}
            {data.steps && (
              <div>
                <p className="text-gray-400 mb-2">Steps</p>
                <motion.div 
                  className="w-full h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.steps / 10000) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
                <p className="text-2xl font-bold text-white mt-2">
                  {data.steps.toLocaleString()}
                </p>
              </div>
            )}
            
            {/* Heart Rate */}
            {data.heartRate && (
              <div>
                <p className="text-gray-400 mb-2">Heart Rate</p>
                <div className="flex items-baseline">
                  <motion.p 
                    className="text-2xl font-bold text-red-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {data.heartRate}
                  </motion.p>
                  <span className="text-red-600 ml-1">bpm</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 