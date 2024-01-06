import Resource from "@/components/elements/Resource";
import { Resource as ResourceType } from "@/types";
import { Pagination } from "@/components/elements/Pagination";
import { GetServerSidePropsContext } from "next";

export default function certifications({
  docs,
  totalDocs,
}: {
  docs: ResourceType[];
  totalDocs: number;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-6">
        {docs.length === 0 ? (
          <div>Nothing found...</div>
        ) : (
          docs.map((resource) => {
            return (
              <div className="" key={resource.id}>
                <Resource resource={resource} />
              </div>
            );
          })
        )}
      </div>
      <Pagination totalDocs={totalDocs} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page = 1, limit = 16 } = context.query; // Set default values
  const data = await fetch(
    `${process.env.API_URL}/api/resources/type/certification?page=${page}&limit=${limit}`
  );
  const { docs, totalDocs } = await data.json();
  return {
    props: {
      docs,
      totalDocs,
    },
  };
}
