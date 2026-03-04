import SectionRenderer from '@/components/SectionRenderer';
import homePageData from '../../data/pages/home.json';

export const metadata = {
  title: "Tanishtra | Chains & Rings for the Modern Man",
  description: "Mumbai-based men's luxury accessories. Premium chains, lockets, rings, and bracelets engineered for presence and built for everyday dominance.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1 w-full bg-background overflow-x-hidden">
      <SectionRenderer sections={homePageData.sections} />
    </main>
  );
}
