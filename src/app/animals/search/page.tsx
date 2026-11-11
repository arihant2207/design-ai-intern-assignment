import { Suspense } from "react";
import { SearchPageSkeleton } from "@/components/animals/ResultsSkeleton";
import { SearchExperience } from "@/components/animals/SearchExperience";

export default function AnimalsSearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchExperience />
    </Suspense>
  );
}

