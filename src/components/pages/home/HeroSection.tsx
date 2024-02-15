import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="relative isolate">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h4 className="text-4xl font-bold tracking-tight text-gray-900">
              Electrical Engineering & Information Technology
            </h4>
            <p className="mt-6 text-md text-gray-600">
              Electronics & I.T. Currently looking for an electrical apprenticeship or I.T position. Competence with cloud services, web app security, setting up and maintaining networks. Proficient with NoSQL, SQL and ORMs. Worked with; C, Python, JavaScript, Next.JS,
              React.JS, Node.JS. 
            </p>
          </div>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto lg:mt-0 mt-6">
            <Image
              src="/hero_image.svg"
              height={500}
              width={500}
              alt={"Hero"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
