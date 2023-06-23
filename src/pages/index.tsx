import Head from "next/head";
import Index from "@/components/pages/home";
import { GetStaticPropsContext } from "next";
import { Resources } from "@/types";

export default function Home({ data }: Resources) {
  return (
    <>
      <Head>
        <title>Beren Boden - IT & Security</title>
        <meta name="IT & Security" content="Beren Boden - IT & Security" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index data={data} />
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const urls = [
    "https://berenboden-strapi-production.up.railway.app/api/certifications?populate[resource][populate][0]=cover",
    "https://berenboden-strapi-production.up.railway.app/api/articles?populate[resource][populate][0]=cover",
    "https://berenboden-strapi-production.up.railway.app/api/projects?populate[resource][populate][0]=cover",
  ];
  const data = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
  );
  const [certifications, articles, projects] = data;
  return {
    props: {
      data: {
        certifications,
        articles,
        projects,
      },
    },
  };
}
