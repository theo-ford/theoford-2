import { createClient } from "@/prismicio";
import Link from "next/link";
import { notFound } from "next/navigation";
// import Logo from "../components/Logo";
// import RouteLogoSwitcher from "@/app/components/RouteLogoSwitcher";
import ContentFade from "@/app/components/ContentFade";
// import LogoTargetOne from "../components/LogoTargetOne";
import LogoRenderLogic from "../components/LogoRenderLogic";
import { LOGO_STYLES } from "../constants/logo-styles";

export default async function ProjectsPage() {
  const client = createClient();

  // Fetch the project_index document
  const projectIndex = await client
    .getByType("project_index")
    .then((docs) => docs.results[0])
    .catch(() => notFound());

  if (!projectIndex) {
    notFound();
  }

  // Extract projects from the repeatable group and filter out empty relationships
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = (projectIndex.data.projects as any[])
    .map((item) => item.project)
    .filter((project) => project && project.data && project.uid) // Filter out empty relationship fields
    .sort((a, b) => {
      // Sort by date (most recent first)
      const dateA = new Date(a.data.date);
      const dateB = new Date(b.data.date);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-black"></div>
      {/* <RouteLogoSwitcher
        primaryClassName="absolute left-[15px] top-[16px] w-[77px] mix-blend-exclusion"
        secondaryClassName="absolute left-[15px] top-[16px] w-[18.75vw] mix-blend-exclusion"
      /> */}
      {/* <LogoTargetOne className={LOGO_STYLES.medium} /> */}
      <LogoRenderLogic className={LOGO_STYLES.medium} />
      <ContentFade>
        <section className="w-full min-h-screen mt-[200px]">
          <div className="w-[calc(100%-20px)] ml-[10px] grid grid-cols-16 mb-[40px] text-[#878787] ">
            <div className="col-span-2">
              <p className="text-sm"></p>
            </div>
            <div className="col-span-2">
              <p className="text-sm">Project</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm">Client</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm">Sector</p>
            </div>
            <div className="col-span-4">
              <p className="text-sm">Category</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm">Year</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm">Location</p>
            </div>
          </div>

          <div>
            {projects.map((project) => {
              const year = new Date(project.data.date).getFullYear();
              const location = project.data?.location ?? "";
              return (
                <Link key={project.uid} href={`/project/${project.uid}`}>
                  <div className="w-[calc(100%-20px)] ml-[10px] grid grid-cols-16 text-[#878787] h-[23px] gap-[10px]">
                    <div className="col-start-3 col-end-5 col-span-2 peer">
                      <p className="text-base">{project.data.title}</p>
                    </div>
                    <div className="col-start-5 col-end-7 col-span-2 peer">
                      <p className="text-base">{project.uid}</p>
                    </div>
                    <div className="col-start-7 col-end-9 col-span-2 peer">
                      <p className="text-base">Sector</p>
                    </div>
                    <div className="col-start-9 col-end-13 col-span-4 peer">
                      <p className="text-base">Category, Category, Category</p>
                    </div>
                    <div className="col-start-13 col-end-15 col-span-2 peer">
                      <p className="text-base">{year}</p>
                    </div>
                    <div className="col-start-15 col-end-16 col-span-2 peer">
                      <p className="text-base">{location}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <p>hello world</p>
          {projects.length === 0 && (
            <p className="text-gray-500 text-center py-8">No projects found.</p>
          )}
        </section>
      </ContentFade>
    </>
  );
}
