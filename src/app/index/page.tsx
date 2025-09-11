import { createClient } from "@/prismicio";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function IndexPage() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      
      <div className="space-y-4">
        {projects.map((project) => {
          const year = new Date(project.data.date).getFullYear();
          return (
            <Link
              key={project.uid}
              href={`/project/${project.uid}`}
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {project.data.title}
                </h2>
                <span className="text-gray-500 font-medium">
                  {year}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      
      {projects.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No projects found.
        </p>
      )}
    </div>
  );
}
