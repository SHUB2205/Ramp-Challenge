import { useCallback, useState } from "react";
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types";
import { PaginatedTransactionsResult } from "./types";
import { useCustomFetch } from "./useCustomFetch";
//bug 4
export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<Transaction[]> | null>(null);

  const [hasMorePages, setHasMorePages] = useState(true);

const fetchAll = useCallback(async () => {
    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
        "paginatedTransactions",
        {
            page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
        }
    );

    setPaginatedTransactions((previousResponse) => {
        if (response === null || previousResponse === null) {
            return response;
        }

        setHasMorePages(response.nextPage !== null); // Update based on response
        return { ...previousResponse, data: [...previousResponse.data, ...response.data], nextPage: response.nextPage };
    });
}, [fetchWithCache, paginatedTransactions]);
const invalidateData = useCallback(() => {
  setPaginatedTransactions(null);
}, []);

return { data: paginatedTransactions, loading, fetchAll, invalidateData, hasMorePages };
}