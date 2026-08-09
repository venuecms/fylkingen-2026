import { getLocalizedContent, getPages, getSite } from "@venuecms/sdk-next";
import { ArrowRightIcon } from "lucide-react";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { FeaturedPage } from "../FeaturedPage";

export async function FeaturedPageContent() {
  await connection();

  const [{ data: featuredPages }, { data: site }] = await Promise.all([
    getPages({ limit: 1, featured: true }),
    getSite(),
  ]);

  if (!site) return null;

  return (
    <section className="border-b border-highlight pb-0">
      <div className="grid w-full grid-cols-1 gap-6 py-0">
        {featuredPages?.records.map((page) => (
          <FeaturedPage key={page.slug} page={page} />
        ))}
      </div>
    </section>
  );
}
