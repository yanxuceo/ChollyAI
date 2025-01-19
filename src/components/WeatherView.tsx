import { motion } from 'framer-motion'

interface WeatherData {
  temperature: number;
  condition: string;
}

interface WeatherViewProps {
  data: WeatherData;
}

export default function WeatherView({ data }: WeatherViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        Weather Report
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <motion.div 
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-blue-400">{data.temperature}°C</h2>
              <p className="text-xl text-gray-400">{data.condition}</p>
            </div>
            <div className="text-6xl">🌤️</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 