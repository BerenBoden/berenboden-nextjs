import { Resource as ResourceType } from "@/types";
import { GetStaticPropsContext } from "next";
import { remark } from "remark";
import html from "remark-html";
import React from "react";
import { useRouter } from "next/router";

export default function Slug({ contentHTML }: { contentHTML: string }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!contentHTML) {
    return <div>Error: Data not found</div>;
  }

  return (
    <>
      <div className="h-40" />
      <div
        className="max-w-7xl mx-auto xl:px-0 px-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      ></div>
    </>
  );
}

export async function getStaticPaths() {
  const data = await fetch(
    `${process.env.API_URL}/api/resources/type/certification`
  );
  const resources = await data.json();
  const paths = resources.map((resource: ResourceType) => ({
    params: { slug: resource.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await fetch(
    `${process.env.API_URL}/api/resources/type/certification`
  );
  const resource: ResourceType[] = await data.json();
  debugger;
  const extractedText = resource[0].content
    .map((item) => {
      if (item.children && item.children.length > 0 && item.children[0].text) {
        return item.children[0].text + "\n";
      }
      return "\n"; // Return a newline for empty or non-text items
    })
    .join("");

  const content = await remark().use(html).process(extractedText);
  const contentHTML = content.toString();
  return { props: { contentHTML } };
}
