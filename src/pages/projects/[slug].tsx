import { Resource } from "@/types";
import { GetStaticPropsContext } from "next";
import { remark } from "remark";
import html from "remark-html";
import React from "react";
import { useRouter } from "next/router";

export default function Slug(props: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!props.data) {
    return <div>Error: Data not found</div>;
  }

  return (
    <>
      <div className="h-40" />
      <div
        className="max-w-7xl mx-auto xl:px-0 px-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: props.data }}
      ></div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://berenboden-strapi-production.up.railway.app/api/projects"
  );
  const projects = await res.json();
  const paths = projects.data.map((project: Resource) => ({
    params: { slug: project.attributes.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    `https://berenboden-strapi-production.up.railway.app/api/projects/${context?.params?.slug}?populate=*`
  );
  const data = await res.json();
  const content = await remark()
    .use(html)
    .process(data.data.attributes.resource.content);
  const contentHTML = content.toString();
  return { props: { data: contentHTML } };
}
