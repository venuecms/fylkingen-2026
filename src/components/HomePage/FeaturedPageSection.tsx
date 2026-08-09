import { Suspense } from "react";

import { ErrorBoundary } from "@/components/utils/ErrorBoundary";

import { FeaturedPageError } from "./ErrorFallbacks";
import { FeaturedPageContent } from "./FeaturedPageContent";
import { FeaturedPageSkeleton } from "./LoadingSkeletons";

export function FeaturedPageSection({ locale }: { locale: string }) {
  return (
    <ErrorBoundary fallback={<FeaturedPageError />}>
      <Suspense fallback={<FeaturedPageSkeleton />}>
        <FeaturedPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}
