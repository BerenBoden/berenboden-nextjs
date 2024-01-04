import { useRouter } from "next/router";

export const Pagination = ({ totalDocs }: { totalDocs: number }) => {
  const router = useRouter();
  const pageQuery = router.query.page;
  const currentPage =
    typeof pageQuery === "string" ? parseInt(pageQuery, 10) : 1;

  const goToPage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  return (
    <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            className={`relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-blue-500 focus:z-20 focus:outline-offset-0 ${
              currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage <= 1}
          >
            <span className="">Previous</span>
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            className={`relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-blue-500 focus:z-20 focus:outline-offset-0 ${
              currentPage >= totalDocs ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage >= totalDocs}
          >
            <span className="">Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
