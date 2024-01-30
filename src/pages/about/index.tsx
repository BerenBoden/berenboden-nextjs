import { FullResource, CategoryMap, CategoryResource } from "@/types";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import pluralize from "pluralize";
import Contact from "@/components/elements/Contact";

export default function about({
  convertedResources,
}: {
  convertedResources: CategoryResource[];
}) {
  console.log(convertedResources);
  return (
    <div className="mx-auto max-w-7xl px-6">
      <p className="mb-10">
        Thank you for taking the time to view my website. Below is a list of
        resources linked to different categories that represent my specific
        skill sets.
      </p>
      {convertedResources.map(({ category, resources }, index) => {
        return (
          <div key={index}>
            <hr />
            <div className="my-2 py-4">
              <h1 className="font-bold text-xl capitalize">
                <span className="font-thin text-blue-400">Category - </span>
                {category}
              </h1>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-6">
                {resources.map((resource) => {
                  return (
                    <div key={resource.slug} className="border p-4 shadow-sm">
                      <h2 className="text-xs font-bold">
                        {resource.title}
                      </h2>
                      <p>{resource.shortDescription}</p>
                      <Link
                        href={`/${pluralize(resource.resource)}/${
                          resource.slug
                        }`}
                        className=""
                      >
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            Go to {resource.resource}&nbsp;&nbsp;
                          </span>
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <Contact />
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await fetch(`${process.env.API_URL}/api/resources?limit=100`);
  const resources = await data.json();
  function convertData(data: FullResource) {
    let categoryMap: CategoryMap = {};

    data.docs.forEach((doc) => {
      doc.categories.forEach((category) => {
        let categoryName = category.value.name;

        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = {
            category: categoryName,
            resources: [],
          };
        }

        categoryMap[categoryName].resources.push({
          title: doc.title,
          slug: doc.slug,
          resource: doc.resource,
          createdAt: doc.createdAt,
          shortDescription: doc.shortDescription || "",
          cover: doc.cover,
          coverAltText: doc.coverAltText,
        });
      });
    });

    return Object.values(categoryMap);
  }
  const convertedResources = convertData(resources);

  return {
    props: {
      convertedResources,
    },
  };
}
