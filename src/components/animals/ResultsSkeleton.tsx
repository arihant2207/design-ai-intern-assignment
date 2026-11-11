import { Container } from "./Primitives";

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-paper p-5 space-y-4 animate-pulse">
      <div className="aspect-[16/10] rounded-t-[999px] rounded-b-lg bg-sand" />
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-sand" />
        <div className="h-6 w-3/4 rounded bg-sand" />
        <div className="h-4 w-1/2 rounded bg-sand/80" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded bg-sand/70" />
        <div className="h-6 w-24 rounded bg-sand/70" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-line">
        <div className="h-10 rounded-md bg-sand/80" />
        <div className="h-10 rounded-md bg-sand/80" />
        <div className="h-10 rounded-md bg-sand/80" />
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading providers">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function SearchPageSkeleton() {
  return (
    <Container className="py-8 sm:py-10">
      <div className="space-y-6">
        <div className="h-10 w-64 rounded bg-sand animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="hidden lg:block lg:col-span-3 h-[480px] rounded-xl border border-line bg-sand/50 animate-pulse" />
          <div className="lg:col-span-5">
            <ResultsSkeleton />
          </div>
          <div className="hidden lg:block lg:col-span-4 h-[540px] rounded-xl border border-line bg-sand/60 animate-pulse" />
        </div>
      </div>
    </Container>
  );
}

