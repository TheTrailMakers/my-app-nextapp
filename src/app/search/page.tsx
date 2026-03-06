import { Suspense } from 'react';
import SearchContent from './SearchContent';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="bg-black text-white min-h-screen pt-24 flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}