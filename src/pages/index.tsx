import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { HomeResources } from "@/types";
import HeroSection from "@/components/pages/home/HeroSection";
import Contact from "@/components/elements/Contact";
import Resource from "@/components/elements/Resource";
import Link from "next/link";
import pluralize from "pluralize";

export default function Home({ resources }: { resources: HomeResources }) {
  return (
    <>
      <Head>
        <title>Beren Boden - EE & IT</title>
        <meta name="EE & IT" content="Beren Boden - EE & IT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <div className="mx-auto max-w-7xl px-6">
        {Object.entries(resources).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between items-center">
              <h1 className="capitalize font-bold text-2xl">
                {pluralize(key)}
              </h1>
              <Link href={`/${pluralize(key)}`}>
                <p className="text-sm underline cursor-pointer text-blue-600">
                  more {key}s...
                </p>
              </Link>
            </div>
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-6"
              key={key}
            >
              {value.map((resource) => (
                <div key={resource.id}>
                  <Resource resource={resource} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="my-12">
          <Contact />
        </div>
      </div>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const resourceTypes = ["article", "certification", "project"];
  const fetchPromises = resourceTypes.map(async (resourceType) => {
    const response = await fetch(
      `${process.env.API_URL}/api/resources/featured/${encodeURIComponent(
        resourceType
      )}`
    );
    const data = await response.json();
    return { [resourceType]: data };
  });

  const resourcesArray = await Promise.all(fetchPromises);
  const resources = Object.assign({}, ...resourcesArray);

  return {
    props: {
      resources,
    },
  };
}
