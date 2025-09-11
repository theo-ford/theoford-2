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
  const project = await client
    .getByUID("project", uid)
    .catch(() => notFound());

  return <h1>{project.data.title}</h1>;
}

export async function generateStaticParams() {
  const client = createClient();
  const projects = await client.getAllByType("project");
  return projects.map((doc) => ({ uid: doc.uid }));
}


