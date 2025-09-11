import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const about = await client.getSingle("about");

  return (
    <main>
      <PrismicRichText field={about.data.introduction} />
    </main>
  );
}


