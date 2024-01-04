import { Resource as ResourceType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import pluralize from "pluralize";

export default function Resource({ resource }: { resource: ResourceType }) {
  const date = new Date(resource.createdAt);
  return (
    <div className="w-full flex flex-col items-start justify-between border">
      <Link
        className="relative w-full"
        href={`/${pluralize(resource.resource)}/${resource.slug}`}
      >
        <div className="relative w-full">
          <Image
            src={resource.cover}
            alt={resource.coverAltText}
            width={500}
            height={500}
            className="w-full h-64 object-cover border-b"
          />
        </div>
      </Link>
      <div className="p-4 w-full">
        <Link href={`/${pluralize(resource.resource)}/${resource.slug}`}>
          <div className="max-w-xl">
            <h3 className="mb-2">{resource.title}</h3>
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={resource.createdAt} className="text-gray-500">
                {date.toLocaleString()}
              </time>
            </div>
            <div className="group relative">
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                {`...`}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col text-center">
          <Link
            href={`/${pluralize(resource.resource)}/${resource.slug}`}
            className="mt-2 border w-full py-2"
          >
            <span className="text-sm font-medium text-gray-900">Read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
