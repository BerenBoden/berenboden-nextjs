import Resource from "@/components/elements/Resource";
import { Resource as ResourceType } from "@/types";
import { GetStaticPropsContext } from "next";

export default function certifications({
  resources,
}: {
  resources: ResourceType[];
}) {
  return (
    <>
      {resources.map((resource) => {
        return (
          <div className="mx-auto max-w-7xl px-6">
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-6"
              key={resource.id}
            >
              <Resource resource={resource} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await fetch(
    `${process.env.API_URL}/api/resources/featured/certification`
  );
  const resources = await data.json();
  return {
    props: {
      resources,
    },
  };
}
