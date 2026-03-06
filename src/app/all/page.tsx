import { TrekService } from '@/lib/services/trekService';
import AllTreksPageClient from '@/components/allTreksClient';

export const revalidate = 60;

export default async function All() {
    // Fetch treks server-side with all departures for sorting
    const { treks } = await TrekService.listTreks({ page: 1, limit: 100 }, 50);

    // Transform treks data into format needed by client component
    const trekData = treks.map((trek: any) => {
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

    return <AllTreksPageClient initialTreks={trekData} />;
}