import { useInfiniteQuery } from "@tanstack/react-query";
import { PaymentStatus } from "@/services/invoice/createInvoice";
import {
  getAllInvoice,
  IAllInvoicePayload,
  IAllInvoiceRes,
} from "@/services/invoice/getAllInvoice";

const LIMIT = 10;

export const useInvoices = (search?: string, filter?: PaymentStatus) => {
  const query = useInfiniteQuery<IAllInvoiceRes>({
    queryKey: ["invoices", search, filter],

    queryFn: async ({ pageParam = 0 }) => {
      const payload: IAllInvoicePayload = {
        start: pageParam as number,
        limit: LIMIT,
        search,
        filter,
      };

      return getAllInvoice(payload);
    },

    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.metaData.totalPages;
      const currentPage = allPages.length;

      return currentPage < totalPages ? allPages.length * LIMIT : undefined;
    },

    initialPageParam: 0,
    staleTime: 1000 * 60 * 2,
  });

  // 🔥 Flatten invoices from all pages
  const flattenedInvoices =
    query.data?.pages.flatMap((page) => page.data) ?? [];
  const totalAmount=query.data?.pages[0].totalAmount;
  const paidAmount=query.data?.pages[0].totalPaidAmount;
  return {
    // Keep original data if needed
    data: query.data,

    // provide flattened list for easy UI rendering
    invoices: flattenedInvoices,

    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    totalAmount:totalAmount,
    pendingAmount:totalAmount-paidAmount
  };
};
