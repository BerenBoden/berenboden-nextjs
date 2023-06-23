import { Resource } from "@/types";
import { GetStaticPropsContext } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehype2react from "rehype-react";
import React from "react";
import { useRouter } from "next/router";

export default function Slug(props: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!props.data || !props.data.data) {
    return <div>Error: Data not found</div>;
  }
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehype2react, { createElement: React.createElement });
  const markdownContent = props.data.data.attributes.resource.content;
  const content = processor.processSync(markdownContent).result;
  return (
    <>
      <div className="h-40" />
      <div className="max-w-7xl mx-auto xl:px-0 px-8">{content}</div>
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
  return { props: { data } };
}
