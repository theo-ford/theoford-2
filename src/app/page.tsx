import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();

  // Read the selected homepage from site settings
  const settings = await client
    .getSingle("site_settings", { fetchLinks: ["homepage.title"] })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch(() => null as any);

  const active = settings?.data?.active_homepage;

  // If an active homepage is set, render it directly at "/"
  if (
    active &&
    active.link_type === "Document" &&
    active.type === "homepage" &&
    active.uid
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const homepage: any = await (client as any)
      .getByUID("homepage", active.uid, { fetchLinks: ["project.title"] })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(() => null as any);

    if (homepage) {
      // Mirror the simple rendering used by /homepage/[uid]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = homepage.data || {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const title = (data as any)?.title || homepage.uid;

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
  }

  // No active homepage configured: show 404
  notFound();
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client
    .getSingle("site_settings", { fetchLinks: ["homepage.title"] })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch(() => null as any);

  const active = settings?.data?.active_homepage;
  if (
    active &&
    active.link_type === "Document" &&
    active.type === "homepage" &&
    active.uid
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const homepage: any = await (client as any)
      .getByUID("homepage", active.uid)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(() => null as any);

    if (homepage) {
      return {
        title: homepage.data.meta_title || asText(homepage.data.title) || homepage.uid,
        description: homepage.data.meta_description,
        openGraph: {
          title: homepage.data.meta_title ?? undefined,
          images: [{ url: homepage.data.meta_image?.url ?? "" }],
        },
      };
    }
  }

  // No active homepage configured: minimal metadata
  return {
    title: "Home",
  };
}
