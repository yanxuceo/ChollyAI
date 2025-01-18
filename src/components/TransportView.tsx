import { motion } from 'framer-motion'

interface TransportData {
  route: string;
  nextArrival: string;
  status: string;
}

export default function TransportView({ data }: { data: TransportData }) {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold text-white mb-4">Transport</h1>
      <div className="bg-white/10 rounded-xl p-4">
        <p className="text-white">Route: {data?.route}</p>
        <p className="text-white">Next Arrival: {data?.nextArrival}</p>
        <p className="text-white">Status: {data?.status}</p>
      </div>
    </motion.div>
  )
} 