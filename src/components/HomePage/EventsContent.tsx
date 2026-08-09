import { LocalizedContent, getLocalizedContent } from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { getEvents, getSite } from "@venuecms/sdk-next";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { EventsList, ListEvent } from "@/components/EventList";
import { TranslatedText } from "@/components/TranslatedText";
import { ColumnLeft, ColumnRight, TwoColumnLayout } from "@/components/layout";
import { renderedStyles } from "@/components/utils";

import { EventCard, EventsListHome } from "../EventListHome";

export async function EventsContent({ locale }: { locale: string }) {
  await connection();

  const [{ data: events }, { data: site }] = await Promise.all([
    getEvents({ limit: 6, upcoming: true }),
    getSite(),
  ]);

  if (!site) {
    return null;
  }

  const webSiteSettings = site.webSites ? site.webSites[0] : undefined;
  const { content: siteContent } = webSiteSettings?.localizedContent?.length
    ? getLocalizedContent(webSiteSettings.localizedContent, locale)
    : { content: { content: site.description } as LocalizedContent };

  return (
    <section className="flex flex-col gap-1">
      {events?.records.length ? (
        <section className="flex flex-col gap-3">
          <EventsListHome>
            {events.records.map((event) => (
              <EventCard key={event.id} event={event} site={site} withImage />
            ))}
          </EventsListHome>
          {events.records.length >= 6 ? (
            <div className="z-100 relative -top-10 mx-auto w-fit grid-cols-1 items-center justify-center gap-12 border border-highlight bg-background px-8 py-4 sm:grid">
              <Link
                className="flex w-full items-center gap-2 font-ultra hover:text-highlight hover:brightness-125 sm:relative sm:flex-row"
                href="/events"
              >
                <TranslatedText
                  namespace="events"
                  text="see_all_upcoming_events"
                />
              </Link>
            </div>
          ) : null}
        </section>
      ) : null}

      {siteContent ? (
        <div className="flex sm:hidden">
          <VenueContent
            className="flex flex-col gap-6"
            content={siteContent}
            contentStyles={renderedStyles}
          />
        </div>
      ) : null}
    </section>
  );
}
