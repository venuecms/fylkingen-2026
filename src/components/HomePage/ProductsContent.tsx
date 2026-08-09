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
    <section className="border-highlight-secondary border-b pt-20">
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

      <Link className="group relative top-9" href="/shop">
        <span className="group-hover:text-highlight-secondary border-highlight-secondary mx-auto w-fit grid-cols-1 items-center justify-center border border-8 bg-background px-8 py-4 font-ultra sm:relative sm:grid sm:flex-row">
          <TranslatedText namespace="products" text="see_all_products" />
        </span>
      </Link>
    </section>
  );
}
