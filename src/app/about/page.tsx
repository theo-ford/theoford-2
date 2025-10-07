import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import Logo from "../components/Logo";
import RouteLogoSwitcher from "@/app/components/RouteLogoSwitcher";
import ContentFade from "@/app/components/ContentFade";

export default async function Page() {
  const client = createClient();
  const about = await client.getSingle("about");

  return (
    <main className="bg-black min-h-screen w-full">
      <RouteLogoSwitcher
        primaryClassName="absolute left-[15px] top-[17px] w-[77px] mix-blend-exclusion"
        secondaryClassName="absolute left-[15px] top-[17px] w-[77px] mix-blend-exclusion"
      />
      <ContentFade>
        <div className="text-white p-[15px] w-[600px] [&>p:first-child]:indent-[84px]">
          <PrismicRichText field={about.data.introduction} />
        </div>
      </ContentFade>
    </main>
  );
}


