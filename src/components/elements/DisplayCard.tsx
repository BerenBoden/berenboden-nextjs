import { extractLargestPhoto } from "@/lib/extractPhotos";
import { ResourceAttributes } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function DisplayCard({
  data,
  title,
}: {
  data: ResourceAttributes;
  title: string;
}) {
  const date = new Date(data.createdAt);
  const alternativeText = extractLargestPhoto(
    data.resource.cover
  ).alternativeText;
  const source = extractLargestPhoto(data.resource.cover).url;
  return (
    <article className="flex flex-col items-start justify-between border">
      <Link className="relative w-full" href={`/${title}/${data.slug}`}>
        <div className="relative w-full">
          <Image
            src={source}
            alt={alternativeText}
            width={500}
            height={500}
            className="w-full h-64 object-cover border-b"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/${title}/${data.slug}`}>
          <div className="max-w-xl">
            <h3 className="mb-2">{data.title}</h3>
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={data.createdAt} className="text-gray-500">
                {date.toLocaleString()}
              </time>
            </div>
            <div className="group relative">
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                {data.resource.description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
