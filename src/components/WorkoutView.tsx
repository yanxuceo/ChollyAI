import { motion } from 'framer-motion'

interface WorkoutData {
  type: string;
  duration: number;
  calories: number;
}

export default function WorkoutView({ data }: { data: WorkoutData }) {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold text-white mb-4">Workout</h1>
      <div className="bg-white/10 rounded-xl p-4">
        <p className="text-white">Type: {data?.type}</p>
        <p className="text-white">Duration: {data?.duration} minutes</p>
        <p className="text-white">Calories: {data?.calories}</p>
      </div>
    </motion.div>
  )
} 