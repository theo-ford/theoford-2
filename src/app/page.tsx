import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import HomepageUidPage from "./homepage/[uid]/page";

// Thin wrapper: render the selected homepage UID using the [uid] page
export default async function Home() {
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
    return (
      <HomepageUidPage
        // The [uid] page expects params as a Promise<{ uid: string }>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params={Promise.resolve({ uid: active.uid }) as any}
      />
    );
  }

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
