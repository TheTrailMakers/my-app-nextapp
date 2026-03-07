export const dynamic = 'force-dynamic';

import { TrekService } from '@/lib/services/trekService';
import AllTreksPageClient from '@/components/allTreksClient';

export const revalidate = 60;

export default async function All() {
    // Fetch treks server-side with all departures for sorting
    // Wrapped in try/catch to prevent build failure when DB is unreachable
    let trekData: any[] = [];
    try {
        const { treks } = await TrekService.listTreks({ page: 1, limit: 100 }, 50);

        // Transform treks data into format needed by client component
        trekData = treks.map((trek: any) => {
            const earliestDate = trek.departures && trek.departures.length > 0 
                ? trek.departures[0].startDate 
                : null;

            return {
                id: trek.id,
                name: trek.name,
                slug: trek.slug,
                thumbnail: trek.thumbnailUrl,
                state: trek.state,
                difficulty: trek.difficulty,
                duration: trek.duration,
                distance: trek.distance,
                description: trek.description,
                departuresCount: trek.departures?.length || 0,
                earliestDate: earliestDate ? new Date(earliestDate).toISOString() : '2099-12-31',
            };
        });
    } catch (error) {
        console.warn("Skipping /all page treks – DB unreachable during build:", error);
    }

    return <AllTreksPageClient initialTreks={trekData} />;
}
