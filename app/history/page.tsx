'use client';
import { motion } from 'framer-motion';
import { History, Music, Calendar } from 'lucide-react';

export default function HistoryPage() {
  // Static placeholder for now - you'll connect Firebase here later
  const historyItems = [
    { id: 1, date: 'May 12, 2026', mood: 'Cinematic Rain', song: 'After Hours - The Weeknd' },
  ];

  return (
    <main className="max-w-md mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <History className="mr-2 text-purple-500" /> Your History
      </h1>

      <div className="space-y-4">
        {historyItems.map((item) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            key={item.id} 
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] text-gray-500 flex items-center">
                <Calendar size={10} className="mr-1" /> {item.date}
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full uppercase font-bold">
                {item.mood}
              </span>
            </div>
            <p className="font-medium text-sm flex items-center">
              <Music size={14} className="mr-2 text-pink-500" /> {item.song}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}