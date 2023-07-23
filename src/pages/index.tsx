import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { Resources } from "@/types";
import HeroSection from "@/components/pages/home/HeroSection";
import Showcase from "@/components/pages/home/Showcase";

export default function Home({ data }: Resources) {
  return (
    <>
      <Head>
        <title>Beren Boden - IT & Security</title>
        <meta name="IT & Security" content="Beren Boden - IT & Security" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <div className="my-12">
        <Showcase data={data.projects.data} title={"projects"} />
      </div>
      <div className="my-12">
        <Showcase data={data.certifications.data} title={"certifications"} />
      </div>
      <div className="my-12">
        <Showcase data={data.articles.data} title={"articles"} />
      </div>
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
