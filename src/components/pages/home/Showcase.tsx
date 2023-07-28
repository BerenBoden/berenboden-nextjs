import { Resource } from "@/types";
import DisplayCard from "@/components/elements/DisplayCard";

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
          <h4 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h4>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-4 mt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map(({ id, attributes }: Resource) => (
            <DisplayCard key={id} data={attributes} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
