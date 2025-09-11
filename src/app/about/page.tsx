import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const about = await client.getSingle("about");

  return (
    <main className="bg-black min-h-screen w-full">
      <div className="text-white p-[15px] w-[600px]">
        <PrismicRichText field={about.data.introduction} />
      </div>
    </main>
  );
}


