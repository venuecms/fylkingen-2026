import { type Event, type Site, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { LocationLink } from "../LocationLink";
import { TranslatedText } from "../TranslatedText";
import { formatDateRange } from "../utils";

export const EventsListHome = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 px-1 font-diatype sm:grid sm:grid-flow-row md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const EventCard = ({
  event,
  site,
  withImage,
  withTime = true,
  dateTemplate,
  className,
}: {
  event: Event;
  site: Site;
  withImage?: boolean;
  withTime?: boolean;
  dateTemplate?: string;
  className?: string;
}) => {
  const locale = useLocale();
  const { artists } = event;
  const { content } = getLocalizedContent(event.localizedContent, locale);
  const isCancelled = event.publishState === "CANCELLED";
  const displayImage =
    event.image ??
    event.relations?.parents?.[0]?.image ??
    artists?.find((artist) => !!artist.profile?.image)?.profile.image;

  return (
    <div className="group relative">
      <Link href={`/events/${event.slug}`}>
        {withImage ? (
          <div
            className={cn("w-full overflow-hidden sm:max-w-full", className)}
          >
            <VenueImage
              className="transition-transform duration-1000 group-hover:-translate-x-0.5 group-hover:-translate-y-1 group-hover:scale-102"
              image={displayImage}
              aspect="square"
            />
          </div>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-b from-background to-green-100/10 opacity-60"></div>
        <div className="absolute inset-0 flex flex-col p-4">
          {event.startDate ? (
            <div className="font-diatype text-sm font-bold tracking-wider text-primary">
              {formatDateRange({
                start: event.startDate,
                end: event.endDate,
                withTime: false && event.hasTime,
                template: dateTemplate,
                timeZone: site.timeZone!,
              })}
            </div>
          ) : null}
          <div className="flex flex-col">
            <div
              className={cn(
                "text-balance text-primary transition-transform duration-1000 group-hover:brightness-150",
                isCancelled && "line-through",
              )}
            >
              <h2 className="text-balance font-ultra text-md">
                <Link href={`/events/${event.slug}`}>{content.title}</Link>
              </h2>
            </div>

            <div className="transition-translate pt-0.5 text-sm text-highlight opacity-0 duration-1000 group-hover:-translate-y-0.5 group-hover:opacity-100">
              {!isCancelled && event.tickets?.length ? (
                <div>
                  <TranslatedText namespace="events" text="more_info" /> +{" "}
                  <TranslatedText namespace="events" text="tickets" />
                </div>
              ) : (
                <TranslatedText namespace="events" text="more_info" />
              )}
            </div>
            {isCancelled ? <div className="">Cancelled</div> : null}
          </div>
        </div>
      </Link>
    </div>
  );
};
