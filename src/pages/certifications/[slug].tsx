import { Resource as ResourceType } from "@/types";
import { GetServerSidePropsContext } from "next";
import { remark } from "remark";
import html from "remark-html";
import React from "react";
import { organizeHeadings } from "@/utils/organizeHeadings";
import { useRouter } from "next/router";
import removeMd from "remove-markdown";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import { processLinks } from "../../utils/processLinks";
import { processImages } from "../../utils/processImages";
import createHeadingId from "../../utils/createHeadingId";
import Link from "next/link";
import slugify from "slugify";

export default function Slug({
  contentHTML,
  extractedMD,
}: {
  contentHTML: string;
  extractedMD: string;
}) {
  const router = useRouter();
  const navigation = organizeHeadings(extractedMD);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!contentHTML) {
    return <div>Error: Data not found</div>;
  }

  return (
    <>
      <div className="w-full flex overflow-x-hidden">
        <div className="hidden md:block w-1/4 pt-32 bg-white px-6">
          <nav className="flex flex-1 flex-col fixed relative">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1 fixed">
                  {navigation?.map((item) => (
                    <li key={item.name}>
                      {!(item.children.length >= 1) ? (
                        <Link
                          href={`#${slugify(
                            removeMd(item.name, {
                              stripListLeaders: true,
                            }).toLowerCase()
                          )}`}
                          className={classNames(
                            item.current ? "bg-gray-50" : "hover:bg-gray-50",
                            "block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700"
                          )}
                        >
                          {removeMd(item.name, { stripListLeaders: true })}
                        </Link>
                      ) : (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50"
                                    : "hover:bg-gray-50",
                                  "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                )}
                              >
                                <ChevronRightIcon
                                  className={classNames(
                                    open
                                      ? "rotate-90 text-gray-500"
                                      : "text-gray-400",
                                    "h-5 w-5 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {removeMd(item.name, {
                                  stripListLeaders: true,
                                })}
                              </Disclosure.Button>
                              <Disclosure.Panel as="ul" className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                  <li key={subItem.name}>
                                    <a
                                      href={subItem.href}
                                      className={classNames(
                                        subItem.current
                                          ? "bg-gray-50"
                                          : "hover:bg-gray-50",
                                        "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 cursor-pointer"
                                      )}
                                    >
                                      {removeMd(subItem.name, {
                                        stripListLeaders: true,
                                      })}
                                    </a>
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-r border-gray-200" />

        <div
          className="w-full md:w-1/2 pt-32 mx-auto xl:px-0 px-6 markdown-body"
          dangerouslySetInnerHTML={{ __html: contentHTML }}
        ></div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetch(
    `${process.env.API_URL}/api/resources/slug/${context?.params?.slug}`
  );
  const resource: ResourceType = await data.json();
  const extractedMD = resource.content
    .map((item) => {
      if (item.children && item.children.length > 0 && item.children[0].text) {
        return item.children[0].text + "\n";
      }
      return "\n"; // Return a newline for empty or non-text items
    })
    .join("");
  const content = await remark().use(html).process(extractedMD);
  const contentHTML = processImages(
    processLinks(createHeadingId(content.toString()))
  );
  console.log(contentHTML);
  return { props: { contentHTML, extractedMD } };
}
