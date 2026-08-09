import { Product, Site, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

export const ListProduct = ({
  product,
  site,
  featured,
  className,
}: {
  product: Product;
  site: Site;
  featured?: boolean;
  className?: string;
}) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(product?.localizedContent, locale);

  return (
    <div
      className={cn(
        "group flex break-inside-avoid flex-col gap-4 sm:gap-0 md:pb-8",
        className,
      )}
    >
      <div className="w-full pb-6 sm:w-auto sm:max-w-full">
        <Link href={`/shop/${product.slug}`}>
          <VenueImage
            className="transition-transform duration-1000 hover:scale-102"
            image={product.image}
            aspect="square"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        {product.author ? (
          <div className="text-primary">
            <Link href={`/shop/${product.slug}`}>{product.author}</Link>
          </div>
        ) : null}
        <div className="text-center font-ultra text-md text-primary group-hover:text-highlight">
          <Link href={`/shop/${product.slug}`}>{content.title}</Link>
        </div>
      </div>
    </div>
  );
};
