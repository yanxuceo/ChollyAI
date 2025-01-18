import { motion } from 'framer-motion'

interface WeatherData {
  temperature: number;
  condition: string;
}

export default function WeatherView({ data }: { data: WeatherData }) {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold text-white mb-4">Weather</h1>
      <div className="bg-white/10 rounded-xl p-4">
        <p className="text-white">Temperature: {data?.temperature}°C</p>
        <p className="text-white">Condition: {data?.condition}</p>
      </div>
    </motion.div>
  )
} 