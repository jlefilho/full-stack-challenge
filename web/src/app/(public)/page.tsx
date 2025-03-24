import Quotes from "@/app/(public)/quotes/page";
import { FilterProvider } from "@/contexts/filter-context";

export default function Home() {
  return (
    <FilterProvider>
      <Quotes />
    </FilterProvider>
  );
}
