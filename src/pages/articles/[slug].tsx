import { Resource } from "@/types";
import { GetStaticPropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";
import { remark } from "remark";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import html from "remark-html";
import { organizeHeadings } from "../../utils/organizeHeadings";
import removeMd from "remove-markdown";
import Link from "next/link";

export default function Slug(props: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!props.html) {
    return <div>Error: Data not found</div>;
  }
  const navigation = organizeHeadings(props.md);
  return (
    <>
      <div className="w-full flex overflow-x-hidden">
        <div className="w-1/4 pt-32 bg-white px-6">
          <nav className="flex flex-1 flex-col fixed relative">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation?.map((item) => (
                    <li key={item.name}>
                      {!(item.children.length >= 1) ? (
                        <Link
                          href="#"
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
          className="w-1/2 pt-32 mx-auto xl:px-0 px-6 markdown-body"
          dangerouslySetInnerHTML={{ __html: props.html }}
        ></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://berenboden-strapi-production.up.railway.app/api/articles"
  );
  const articles = await res.json();
  const paths = articles.data.map((project: Resource) => ({
    params: { slug: project.attributes.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    `https://berenboden-strapi-production.up.railway.app/api/articles/${context?.params?.slug}?populate=*`
  );
  const data = await res.json();
  const content = await remark()
    .use(html)
    .process(data.data.attributes.resource.content);

  const contentHTML = content.toString();
  return {
    props: {
      html: contentHTML,
      md: data.data.attributes.resource.content,
    },
  };
}
