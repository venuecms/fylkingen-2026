import { getProducts, getSite } from "@venuecms/sdk-next";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { ListProduct } from "@/components/ListProduct";

import { TranslatedText } from "../TranslatedText";

export async function ProductsContent() {
  await connection();

  const [{ data: products }, { data: site }] = await Promise.all([
    getProducts({ limit: 4 }),
    getSite(),
  ]);

  if (!site) return null;

  const topProducts = products?.records.slice(0, 4);
  const moreProducts = products?.records.slice(4);

  return (
    <section className="py-20">
      <div className="xxl:grid-cols-3 grid grid-cols-1 gap-24 p-8 sm:max-w-full md:grid-cols-2 md:p-12 lg:p-24">
        {topProducts?.length
          ? topProducts.map((product) => (
              <ListProduct
                key={product.slug}
                featured={true}
                product={product}
                site={site}
              />
            ))
          : "No products found"}
      </div>
      {moreProducts?.length ? (
        <div className="grid grid-cols-2 gap-8 sm:max-w-full lg:grid-cols-[repeat(4,minmax(1rem,32rem))] xl:grid-cols-[repeat(6,minmax(1rem,32rem))]">
          {moreProducts.map((product) => (
            <ListProduct key={product.slug} product={product} site={site} />
          ))}
        </div>
      ) : null}

      <div className="relative top-10 mx-auto w-fit grid-cols-1 items-center justify-center gap-12 border border-highlight bg-background px-8 py-4 sm:grid lg:-top-10">
        <Link
          className="flex w-full items-center gap-2 font-ultra hover:text-highlight hover:brightness-125 sm:relative sm:flex-row"
          href="/shop"
        >
          <TranslatedText namespace="products" text="see_all_products" />
        </Link>
      </div>
    </section>
  );
}
