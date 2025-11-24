import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
// import Logo from "../components/Logo";
// import RouteLogoSwitcher from "@/app/components/RouteLogoSwitcher";
import ContentFade from "@/app/components/ContentFade";
// import LogoTargetOne from "../components/LogoTargetOne";
import { LOGO_STYLES } from "../constants/logo-styles";
import LogoRenderLogic from "../components/LogoRenderLogic";
// import NewsletterSignupPetrine from "../components/NewsletterSignupPetrine";

export default async function Page() {
  const client = createClient();
  const about = await client.getSingle("about");

  return (
    <main className="bg-white min-h-screen w-full">
      {/* <RouteLogoSwitcher
        primaryClassName="absolute left-[15px] top-[17px] w-[77px] mix-blend-exclusion"
        secondaryClassName="absolute left-[15px] top-[17px] w-[77px] mix-blend-exclusion"
      /> */}
      {/* <LogoTargetOne className={LOGO_STYLES.small} /> */}
      <LogoRenderLogic className={LOGO_STYLES.small} />
      <ContentFade>
        <div className="text-black p-[15px] w-[600px] [&>p:first-child]:indent-[84px]">
          {/* <NewsletterSignupPetrine /> */}
          <PrismicRichText field={about.data.introduction} />

        </div>
      </ContentFade>

    </main>
  );
}


