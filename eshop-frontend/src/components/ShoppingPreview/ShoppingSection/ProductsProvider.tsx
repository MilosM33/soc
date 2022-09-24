import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useEffect } from "react";

export interface PaginatedBody<T> {
  per_page: number;
  page: number;
  data: T[];
}

export default function useProductsProvider<T>(props: any) {
  const { status, data, error, isFetching } = useInfiniteQuery(
    ["projects"],
    async ({ pageParam = 0 }): Promise<PaginatedBody<T>> => {
      const res = await props.itemsProvider;
      return res.data;
    }
  );

  return [status, data, error, isFetching];
}
