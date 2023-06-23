import { extractLargestPhoto } from "@/lib/extractPhotos";
import { Resource } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function Showcase({
  data,
  title,
}: {
  data: Resource[];
  title: string;
}) {
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-4 mt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map(({ id, attributes }: Resource) => (
            <article
              key={id}
              className="border shadow-sm p-4 flex max-w-xl flex-col items-start justify-between"
            >
              <Link href={`/${title}/${attributes.slug}`}>
                <div className="h-64 w-full">
                  <Image
                    src={extractLargestPhoto(attributes.resource.cover).url}
                    alt={
                      extractLargestPhoto(attributes.resource.cover)
                        .alternativeText
                    }
                    height={1000}
                    width={1000}
                    className="w-full object-cover object-center lg:h-full lg:w-full border"
                  />
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {attributes.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {attributes.resource.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
