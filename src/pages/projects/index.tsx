import ResourceList from "@/components/elements/ResourceList";
import { GetStaticPropsContext } from "next";
import { Resource } from "@/types";

export default function about({ data }: { data: Resource[] }) {
  return <ResourceList data={data} title={"projects"} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    "https://berenboden-strapi-production.up.railway.app/api/projects?populate[resource][populate][0]=cover"
  );
  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
}
