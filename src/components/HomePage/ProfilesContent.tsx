import { getProfiles, getSite } from "@venuecms/sdk-next";
import { ArrowDown, ArrowRight } from "lucide-react";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { ProfileMember } from "@/components/ProfileMember";
import { TranslatedText } from "@/components/TranslatedText";

export async function ProfilesContent() {
  await connection();

  const [{ data: profiles }, { data: site }] = await Promise.all([
    getProfiles({ limit: 30, dir: "desc", type: "member" }),
    getSite(),
  ]);

  if (!site) return null;

  return (
    <section className="md:text-xxl font-ultra flex flex-col gap-4 px-2 py-20 text-xl sm:gap-0">
      <TranslatedText namespace="homepage" text="org_statement" />
      <div className="md:text-xxl flex flex-col-reverse gap-4 pb-6 text-xl lg:items-center xl:flex-row xl:gap-8">
        <div className="flex flex-col gap-4 sm:flex-row md:text-nowrap lg:items-center">
          <TranslatedText namespace="homepage" text="explore_members" />
          <ArrowDown
            size="2.5rem"
            className="animate-bounce text-highlight sm:animate-none"
          />
        </div>
        <div className="group flex flex-row items-center gap-4 md:text-nowrap">
          <span className="group-hover:text-highlight">
            <Link href="/membership">
              <TranslatedText
                namespace="homepage"
                text="apply_for_membership"
              />
            </Link>
          </span>
          <Link href="/membership">
            <ArrowRight
              size="2.5rem"
              className="text-highlight transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
      <div className="xxl:grid-cols-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {profiles?.records.map((profile) => (
          <ProfileMember key={profile.slug} profile={profile} />
        ))}
      </div>
    </section>
  );
}
