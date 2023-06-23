import { Resource } from "@/types";
import DisplayCard from "./DisplayCard";

export default function ResourceList({
  data,
  title,
}: {
  data: Resource[];
  title: string;
}) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My {title}
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.length >= 1 ? (
            <>
              {data.map((resource: Resource) => (
                <DisplayCard key={resource.id} data={resource} title={title} />
              ))}
            </>
          ) : (
            <>
              <div>Nothing to display</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
