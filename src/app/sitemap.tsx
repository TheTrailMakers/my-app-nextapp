import { TrekService } from "@/lib/services/trekService";

export default async function sitemap() {
  const base = "https://thetrailmakers.in";
  const lastModified = new Date();

  // Fetch treks from database
  const { treks } = await TrekService.listTreks({ page: 1, limit: 100 }, 0);

  const trekUrls = treks.map((trek: { slug: string }) => ({
    url: `${base}/treks/${trek.slug}`,
    lastModified,
  }));

  return [
    { url: base, lastModified },
    { url: `${base}/all`, lastModified },
    { url: `${base}/contact`, lastModified },
    ...trekUrls,
    { url: `${base}/blog/The-Only-Difference-Between-Trekking-And-Hiking`, lastModified },
    { url: `${base}/blog/Understanding-The-Layering-System`, lastModified },
    { url: `${base}/blog/10-Best-Treks-in-Himachal-Pradesh`, lastModified },
  ];
}


  