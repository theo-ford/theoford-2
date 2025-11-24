import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
// import Logo from "@/app/components/Logo";
// import RouteLogoSwitcher from "@/app/components/RouteLogoSwitcher";
import ContentFade from "@/app/components/ContentFade";
// import LogoTargetOne from "@/app/components/LogoTargetOne";
import { LOGO_STYLES } from "@/app/constants/logo-styles";
import LogoRenderLogic from "@/app/components/LogoRenderLogic";

type Params = { uid: string };

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const client = createClient();
  const project = await client
    .getByUID("project", uid)
    .catch(() => notFound());

  return <>
    <div className="p-[15px] text-black w-[600px] relative">
      {/* <RouteLogoSwitcher
        primaryClassName="absolute left-[15px] top-[16px] w-[77px] mix-blend-exclusion"
        secondaryClassName="absolute left-[15px] top-[16px] w-[77px] mix-blend-exclusion"
      /> */}
      {/* <LogoTargetOne className={LOGO_STYLES.small} /> */}
      <LogoRenderLogic className={LOGO_STYLES.small} />
      <ContentFade>
        <div className="indent-[87px]">
          <p> for {project.data.client} in {project.data.location}, {project.data.date}</p>
        </div>
      </ContentFade>
    </div>

  </>

}

export async function generateStaticParams() {
  const client = createClient();
  const projects = await client.getAllByType("project");
  return projects.map((doc) => ({ uid: doc.uid }));
}


