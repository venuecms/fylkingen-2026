import { ReactNode } from "react";

import { Link } from "@/lib/i18n/routing";

import { SiteTitle } from "../SiteLogo";
import { ColumnLeft, ColumnRight, TwoColumnLayout } from "../layout";

const siteTitle = "Fylkingen"; // TODO: Get this from the site config or props

export const SiteHeaderDesktop = async ({
  logo,
  nav,
}: {
  logo: ReactNode;
  nav: ReactNode;
}) => {
  return (
    <header className="top-0 hidden min-h-8 items-center text-nav sm:flex lg:gap-40">
      <TwoColumnLayout className="grid-cols-2 px-2 py-0 pt-2 md:py-2 lg:py-2">
        <div className="w-full">
          <h1 className="uppercase text-nav">
            <Link href="/">{siteTitle}</Link>
          </h1>
        </div>

        <div className="w-full place-items-end">{nav}</div>
      </TwoColumnLayout>
    </header>
  );
};
