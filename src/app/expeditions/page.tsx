'use client';

import { useEffect, useState } from 'react';

interface IExpedition {
  id: string;
  name: string;
  slug: string;
  description: string;
  state: string;
  basePrice: number;
  difficulty: string;
  duration: number;
  maxAltitude: number;
  distance: number;
  thumbnailUrl?: string;
  imageUrl?: string;
}

export default function ExpeditionsPage() {
  const [expeditions, setExpeditions] = useState<IExpedition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getExpeditions() {
      try {
        const response = await fetch('/api/expeditions');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setExpeditions(data.expeditions || []);
      } catch (error) {
        console.error('Failed to fetch expeditions:', error);
      } finally {
        setLoading(false);
      }
    }

    getExpeditions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Alpine Expeditions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Challenge yourself with our high-altitude climbing expeditions in the Himalayas.
            Experience world-class mountaineering with experienced guides and comprehensive support.
          </p>
        </div>
      </div>

      {/* Expeditions Grid */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading expeditions...</p>
            </div>
          ) : expeditions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No expeditions available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expeditions.map((expedition: any) => (
                <div
                  key={expedition.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={expedition.imageUrl || expedition.thumbnailUrl || 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg'}
                      alt={expedition.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {expedition.name}
                    </h3>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Altitude</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{expedition.maxAltitude}m</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Duration</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{expedition.duration} days</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Difficulty</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {expedition.difficulty.replace(/_/g, ' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Price</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₹{(expedition.basePrice / 100).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {expedition.description}
                    </p>

                    {/* Button */}
                    <a
                      href={`/expeditions/${expedition.slug}`}
                      className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
