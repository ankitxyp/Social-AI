'use client';
import { useState } from 'react';
import {
  Upload,
  Music,
  Hash,
  Type,
  Loader2,
  Share2,
  Heart,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Reset previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image }),
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResult(data);
      toast.success("Perfect matches found!");
    } catch (error) {
      toast.error("Failed to analyze image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-4 min-h-screen">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          MoodTune
        </h1>
        <p className="text-gray-400 text-sm mt-2">AI Soundtrack for your aesthetics</p>
      </header>

      
      {!result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer bg-gray-900/50 hover:bg-gray-800 transition relative overflow-hidden">
            {image ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-purple-500"/>
                <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>

          {image && (
            <button
              onClick={analyzeImage}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
              {loading ? 'Analyzing Vibe...' : 'Find My Vibe'}
            </button>
          )}
        </motion.div>
      )}

      
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-2xl">
            
            <img src={image!} alt="Uploaded" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <p className="text-white font-medium capitalize">{result.mood}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl flex items-center"><Music className="mr-2 text-purple-500"/> Top Tracks</h3>
            {result.music.map((track: any, i: number) => (
              <div key={i} className="bg-gray-900 p-4 rounded-xl flex justify-between items-center border border-gray-800">
                <div>
                  <p className="font-bold">{track.title}</p>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{track.reason}</p>
                </div>
                <div className="flex space-x-3">
                  <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-pink-500"><Heart size="{16}"/></button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
             <h3 className="font-bold text-lg flex items-center mb-3"><Type className="mr-2 text-blue-500" size="{20}"/> Captions</h3>
             <ul className="space-y-2 text-sm text-gray-300">
               {result.captions.map((cap: string, i: number) => <li key={i}>"{cap}"</li>)}
             </ul>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-20">
             <h3 className="font-bold text-lg flex items-center mb-3"><Hash className="mr-2 text-green-500" size="{20}"/> Hashtags</h3>
             <p className="text-sm text-blue-400">{result.hashtags.join(' ')}</p>
          </div>

          <button onClick={() => setResult(null)} className="w-full py-4 text-gray-400 hover:text-white">
             Analyze Another Photo
          </button>
        </motion.div>
      )}
    </main>
  );
}