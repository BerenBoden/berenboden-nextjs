import { extractLargestPhoto } from "@/lib/extractPhotos";
import { Resource } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function DisplayCard({
  data,
  title,
}: {
  data: Resource;
  title: string;
}) {
  const date = new Date(data.attributes.createdAt);
  console.log(data);
  return (
    <article
      key={data.id}
      className="flex flex-col items-start justify-between"
    >
      <Link href={`/${title}/${data.attributes.slug}`}>
        <div className="relative w-full">
          <Image
            src={extractLargestPhoto(data.attributes.resource.cover).url}
            alt={
              extractLargestPhoto(data.attributes.resource.cover)
                .alternativeText
            }
            width={500}
            height={500}
            className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="max-w-xl">
          <div className="mt-8 flex items-center gap-x-4 text-xs">
            <time
              dateTime={data.attributes.createdAt}
              className="text-gray-500"
            >
              {date.toLocaleString()}
            </time>
            <Link
              href={`/${title}/${data.attributes.slug}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {data.attributes.title}
            </Link>
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <span className="absolute inset-0" />
              {data.attributes.title}
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {data.attributes.resource.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
