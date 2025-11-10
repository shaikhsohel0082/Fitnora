import {
  CustomerRes,
  getAllCustomers,
  ICustomerPayload,
} from "@/services/customer/getAllCustomer";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 5;

export const useCustomers = (searchTerm: string) => {
  const query = useInfiniteQuery<CustomerRes>({
    queryKey: ["customers", searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      const payload: ICustomerPayload = {
        start: pageParam as number,
        limit: LIMIT,
        searchTerm,
      };
      return getAllCustomers(payload);
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
