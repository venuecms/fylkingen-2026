import { Page, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { ListedContent } from "../ListedContent";

export const FeaturedPage = ({ page }: { page: Page }) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(page?.localizedContent, locale);

  return (
    <ListedContent
      image={page.image}
      title={content?.title}
      titleLink={`p/${page.slug}`}
      content={content.excerpt || content}
    />
  );
};
