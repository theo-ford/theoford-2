import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";

type Params = { uid: string };

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const client = createClient();

  // Fetch homepage variant by UID and include linked project titles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homepage = await (client as any)
    .getByUID("homepage", uid, { fetchLinks: ["project.title"] })
    .catch(() => notFound());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title = (homepage.data as any)?.title || homepage.uid;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = homepage.data || {};
  // Collect linked project titles from any repeatable group
  const projectTitles: string[] = [];
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
              const t = link?.data?.title || link?.uid;
              if (t) projectTitles.push(t as string);
            }
          }
        }
      }
    }
  }

  return (
    <main>
      <h1>{title}</h1>
      {projectTitles.length > 0 ? (
        <ul>
          {projectTitles.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      ) : (
        <p>No projects found on this homepage.</p>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homepages = await (client as any).getAllByType("homepage");
  return homepages.map((doc: any) => ({ uid: doc.uid }));
}


