export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Premium</h1>

      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold">Pro Features</h2>

          <ul className="mt-3 space-y-2 text-gray-400">
            <li>✓ Unlimited uploads</li>
            <li>✓ Viral reel music suggestions</li>
            <li>✓ Trending hashtags</li>
            <li>✓ AI captions</li>
            <li>✓ Save favorites</li>
          </ul>
        </div>

        <button className="w-full bg-purple-600 py-4 rounded-xl font-bold">
          Upgrade to Premium
        </button>
      </div>
    </main>
  );
}
