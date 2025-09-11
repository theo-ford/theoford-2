import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();

  // Try to read the selected homepage from site settings
  const settings = await client
    .getSingle("site_settings", { fetchLinks: ["homepage.title"] })
    .catch(() => null as any);

  const active = settings?.data?.active_homepage;
  if (
    active &&
    active.link_type === "Document" &&
    (active.type === "homepage" || active.type === "homepage_variant") &&
    active.uid
  ) {
    redirect(`/homepage/${active.uid}`);
  }

  // Fallback to the original "home" page document if no active homepage is set
  const home = await client.getByUID("page", "home");
  return <SliceZone slices={home.data.slices} components={components} />;
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
    (active.type === "homepage" || active.type === "homepage_variant") &&
    active.uid
  ) {
    // Optionally you could fetch more fields for SEO; for now, use title or UID
    return {
      title: active?.data?.title || active.uid,
    };
  }

  const home = await client.getByUID("page", "home");
  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
