import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import type { Content } from "@prismicio/client";
// import Link from "next/link";
import ContentFade from "@/app/components/ContentFade";
import LogoTargetOne from "@/app/components/LogoTargetOne";
import { LOGO_STYLES } from "@/app/constants/logo-styles";
import HomepageLogo from "@/app/components/HomepageLogo";
import HomepageIntersectionObserver from "@/app/components/HomepageIntersectionObserver";
import { AutoPlayVideo } from "@/app/components/AutoplayVideo";
import TwoUpCarousel from "@/app/components/TwoUpCarousel";
import { components } from "@/slices";
import CountdownTimer from "@/app/components/CountdownTimer";
import BlackCarousel from "@/app/components/BlackCarousel";
import Logo from "@/app/components/Logo";


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

  const projectUids: string[] = [];
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
              const uid = link?.uid as string | undefined;
              if (uid) {
                projectUids.push(uid);
              }
            }
          }
        }
      }
    }
  }

  // Fetch full project documents using the collected UIDs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = await Promise.all(
    projectUids.map(async (uid) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await (client as any).getByUID("project", uid);
      } catch (error) {
        console.error(`Failed to fetch project with uid ${uid}:`, error);
        return null;
      }
    })
  ).then((results) => results.filter((project) => project !== null));
  // console.log(homepage.data?.hero_video_first_frame);
  // console.log(homepage.data?.hero_video.url);

  return (
    <main>
      {/* <HeroObserver /> */}
      <HomepageIntersectionObserver />
      <div id="hero1" className="relative h-screen w-full bg-black">
        <div className=" text-white w-full absolute top-0 left-0 z-[50] h-full p-[15px]">
          <LogoTargetOne className={LOGO_STYLES.small} />
          {/* <ContentFade> */}
          <div className="[&>p:first-child]:indent-[84px] absolute top-0 left-0 z-[50] p-[15px] w-[650px] mix-blend-exclusion">
            <PrismicRichText field={homepage.data?.intro_1} />
          </div>
          <div className="px-[10px] absolute right-[10px] top-[10px] z-[50]"><CountdownTimer initialCount={10} /></div>
          <div className="absolute z-[0] top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <AutoPlayVideo srcProps={homepage.data?.hero_video?.url as string} posterProps={homepage.data?.hero_video_first_frame as any} />
          </div>


          {/* </ContentFade> */}
        </div>
      </div>
      <div id="hero2" className="relative h-auto w-full bg-white">
        <ContentFade>



          <div className="w-[calc(100vw-10px)] grid grid-cols-16 absolute p-[10px]">
            <div className="col-span-6">
              <div className="relative inline-block text-black">
                <div className="w-[73px] absolute left-0 top-0 mt-[3px]">
                  <Logo />
                </div>
                <div className="[&>p:first-child]:indent-[74px] [&_a]:text-gray-400">
                  <PrismicRichText field={homepage.data?.intro_2} />
                </div>
              </div>
            </div>
            <div className="col-span-4">
            </div>
            {/* <div className="col-span-1"></div> */}
            <div className="col-span-4">
              <p className="text-gray-400 w-[80%] ml-[20%] text-[12px] !leading-[105%]">
                <span className="text-black">Current location:</span> Mumbai, New York, <span className="text-black">London,</span> Los Angeles, Beijing, Stockholm, Gothenburg, Glasgow, Falmouth, Philadelphia. <span className="text-black">2025/11/26 11:35:44.</span>
              </p>
            </div>
            {/* <div className="col-span-1"></div> */}
            <div className="col-span-1"><p className="text-gray-400 ">info(at)theoford.com<br></br>(at)tf.public</p></div>
            {/* <div className="col-span-2">
              <p>Hello World</p>
            </div> */}
          </div>
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
              {projects.map((project, i) => {
                console.log("carousel_homepage_type:", project.data.carousel_homepage_type);
                return project.data.carousel_homepage_type === "White" ? (
                  <div key={project.uid ?? i} className="h-auto w-full relative  mb-[250px]">
                    <TwoUpCarousel
                      project={{
                        title: project.data.title || undefined,
                        location: project.data.location || undefined,
                        date: project.data.date || undefined,
                        client: project.data.client || undefined,
                        sector: project.data.sector || undefined,
                        sentence: project.data.sentence || undefined,
                        uid: project.uid || undefined,
                      }}
                    >
                      {project.data.slices1.map((slice: Content.ImageSlice | Content.VideoSlice, sliceIndex: number) => (
                        <SliceZone key={sliceIndex} slices={[slice]} components={components} />
                      ))}
                    </TwoUpCarousel>
                  </div>
                ) : project.data.carousel_homepage_type === "Black" ? (
                  <div key={project.uid ?? i} className="h-[110vh] w-full relative mb-[250px]">
                    <BlackCarousel
                      project={{
                        title: project.data.title || undefined,
                        location: project.data.location || undefined,
                        date: project.data.date || undefined,
                        client: project.data.client || undefined,
                        sector: project.data.sector || undefined,
                        sentence: project.data.sentence || undefined,
                        uid: project.uid || undefined,
                      }}
                    >
                      {project.data.slices1.map((slice: Content.ImageSlice | Content.VideoSlice, sliceIndex: number) => (
                        <SliceZone key={sliceIndex} slices={[slice]} components={components} />
                      ))}
                    </BlackCarousel>
                  </div>
                ) : null;
              })}
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


