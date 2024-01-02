import { Resource as ResourceType } from "@/types";
import Resource from "@/components/elements/Resource";
import { GetStaticPropsContext } from "next";

export default function articles({ resources }: { resources: ResourceType[] }) {
  console.log(resources);
  return (
    <>
      {resources.map((resource) => (
        <Resource key={resource.id} resource={resource} />
      ))}
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await fetch(
    `${process.env.API_URL}/api/resources/featured/article`
  );
  const resources = await data.json();
  return {
    props: {
      resources,
    },
  };
}
