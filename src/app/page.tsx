import Link from "next/link";
import { BRAND_NAME } from "@/lib/config";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-6 py-16">
      <div className="max-w-md w-full border border-line bg-sand/50 p-8 rounded-lg">
        <p className="text-xs uppercase tracking-[0.14em] text-muted mb-3">
          Prototype Workspace
        </p>
        <h1 className="font-display text-3xl text-forest mb-3">
          {BRAND_NAME}
        </h1>
        <p className="text-forest/85 mb-6">
          This root route is intentionally left minimal. Explore the animal-care
          discovery prototype under <code className="text-sm">/animals</code>.
        </p>
        <Link
          href="/animals"
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark transition-colors"
        >
          Open {BRAND_NAME}
        </Link>
      </div>
    </main>
  );
}
