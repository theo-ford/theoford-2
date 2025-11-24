import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import ContentFade from "@/app/components/ContentFade";
import LogoTargetOne from "@/app/components/LogoTargetOne";
import { LOGO_STYLES } from "@/app/constants/logo-styles";
import HomepageLogo from "@/app/components/HomepageLogo";
import HomepageIntersectionObserver from "@/app/components/HomepageIntersectionObserver";
import { AutoPlayVideo } from "@/app/components/AutoplayVideo";


type Params = { uid: string };

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homepage = await (client as any)
    .getByUID("homepage", uid, { fetchLinks: ["project.title"] })
    .catch(() => notFound());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = homepage.data || {};

  const projects: { title: string; uid: string }[] = [];
  for (const value of Object.values(data)) {
    if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const row of value as any[]) {
        if (row && typeof row === "object") {
          for (const v of Object.values(row)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const link = v as any;
            if (
              link &&
              typeof link === "object" &&
              link.link_type === "Document" &&
              link.type === "project"
            ) {
              const title = (link?.data?.title as string) || (link?.uid as string);
              const uid = link?.uid as string | undefined;
              if (title && uid) {
                projects.push({ title, uid });
              }
            }
          }
        }
      }
    }
  }
  console.log(homepage.data?.hero_video_first_frame);
  console.log(homepage.data?.hero_video.url);

  return (
    <main>
      {/* <HeroObserver /> */}
      <HomepageIntersectionObserver />
      <div id="hero1" className="relative h-screen w-full bg-green-500">
        <div className=" text-white w-full absolute top-0 left-0 z-[50] h-full p-[15px]">
          <LogoTargetOne className={LOGO_STYLES.small} />
          {/* <ContentFade> */}
          <div className="[&>p:first-child]:indent-[84px] absolute top-0 left-0 z-[50] p-[15px] w-[600px] mix-blend-exclusion">
            <PrismicRichText field={homepage.data?.intro_1} />
          </div>
          <div className="absolute z-[0] top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <AutoPlayVideo srcProps={homepage.data?.hero_video?.url as string} posterProps={homepage.data?.hero_video_first_frame as any} />
          </div>

          {/* </ContentFade> */}
        </div>
      </div>
      <div id="hero2" className="relative h-auto w-full bg-white">
        <ContentFade>
          <div className="absolute top-0 left-0 z-[50] p-[15px] text-black w-[800px]"><PrismicRichText field={homepage.data?.intro_2} />  </div>
        </ContentFade>
        <div className="w-full h-[38vh]"></div>

      </div>
      <div className="sticky top-[0px] z-50 mix-blend-exclusion ml-[0px]">
        <HomepageLogo />
        {/* <LogoTargetTwo className={LOGO_STYLES.medium} /> */}
      </div>
      <div className="w-full h-[50vh]"></div>

      <ContentFade>
        <div id="content">
          {projects.length > 0 ? (
            <div>
              {projects.map((p, i) => (
                <div key={p.uid ?? i} className="h-[60vh] flex items-center px-[15px] bg-green-800 mb-[15px]">
                  <Link href={`/project/${p.uid}`} className="text-black underline">
                    {p.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects found on this homepage.</p>
          )}
        </div>
      </ContentFade>



    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homepages = await (client as any).getAllByType("homepage");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return homepages.map((doc: any) => ({ uid: doc.uid }));
}


