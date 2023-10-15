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
  return (
    <article className="flex flex-col items-start justify-between border">
      <Link className="relative w-full" href={`/${title}/${data.slug}`}>
        <div className="relative w-full">
          <Image
            src={data.resource.cover}
            alt={data.resource.coverAltText}
            width={500}
            height={500}
            className="w-full h-64 object-cover border-b"
          />
        </div>
      </Link>
      <div className="p-4 w-full">
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
        <div className="flex flex-col text-center">
          <Link
            href={`/${title}/${data.slug}`}
            className="mt-2 border w-full py-2"
          >
            <span className="text-sm font-medium text-gray-900">Read more</span>
          </Link>
          {title === "projects" && (
            <a
              href={data.resource.external}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 border w-full py-2"
            >
              <span className="text-sm font-medium text-gray-900">
                View Live
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
