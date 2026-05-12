export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold">
          A
        </div>

        <h1 className="text-2xl font-bold mt-4">
          Ankit
        </h1>

        <p className="text-gray-400 mt-2">
          MoodTune Creator
        </p>

        <div className="mt-8 w-full bg-gray-900 rounded-xl p-4 border border-gray-800">
          <p>Total Uploads: 0</p>
          <p className="mt-2">Favorite Songs: 0</p>
        </div>
      </div>
    </main>
  );
}