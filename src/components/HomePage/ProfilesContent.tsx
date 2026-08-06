import { getProfiles, getSite } from "@venuecms/sdk-next";
import { ArrowDown, ArrowRight } from "lucide-react";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { ProfileMember } from "@/components/ProfileMember";
import { TranslatedText } from "@/components/TranslatedText";

export async function ProfilesContent() {
  await connection();

  const [{ data: profiles }, { data: site }] = await Promise.all([
    getProfiles({ limit: 25, dir: "desc", type: "member" }),
    getSite(),
  ]);

  if (!site) return null;

  return (
    <section className="text-xxl font-ultra flex flex-col gap-0 px-2 py-20">
      <TranslatedText namespace="homepage" text="org_statement" />
      <div className="text-xxl flex flex-row items-center gap-8 pb-6">
        <div className="flex flex-row items-center gap-4">
          <TranslatedText namespace="homepage" text="explore_members" />
          <ArrowDown size="2.5rem" className="text-highlight" />
        </div>
        <div className="group flex flex-row items-center gap-4">
          <span className="group-hover:text-highlight">
            <Link href="/membership">
              <TranslatedText
                namespace="homepage"
                text="apply_for_membership"
              />
            </Link>
          </span>
          <ArrowRight
            size="2.5rem"
            className="text-highlight transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </div>
      <div className="xxl:grid-cols-6 grid grid-cols-2 gap-2 md:grid-cols-5">
        {profiles?.records.map((profile) => (
          <ProfileMember key={profile.slug} profile={profile} />
        ))}
      </div>
    </section>
  );
}
