import ResourceList from "@/components/elements/ResourceList";
import { Resource } from "@/types";
import { GetStaticPropsContext } from "next";

export default function certifications({ data }: { data: Resource[] }) {
  return <ResourceList data={data} title={"certifications"} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    "https://berenboden-strapi-production.up.railway.app/api/certifications?populate[resource][populate][0]=cover"
  );
  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
}