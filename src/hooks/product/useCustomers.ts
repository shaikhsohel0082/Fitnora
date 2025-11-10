
import { getAllproducts, IproductPayload, productRes } from "@/services/products/getAllProducts";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 5;

export const useProducts = (searchTerm: string) => {
  const query = useInfiniteQuery<productRes>({
    queryKey: ["products", searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      const payload: IproductPayload = {
        start: pageParam as number,
        limit: LIMIT,
        searchTerm,
      };
      return getAllproducts(payload);
    },
    getNextPageParam: (lastPage, allPages) => {
      // If backend says there are more results
      return lastPage?.metaData.hasMore ? allPages.length * LIMIT : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 2,
  });

  return {
    data: query.data,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
