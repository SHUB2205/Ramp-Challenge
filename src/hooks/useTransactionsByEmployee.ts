import { useCallback, useState } from "react"
import { RequestByEmployeeParams, Transaction } from "../utils/types"
import { TransactionsByEmployeeResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function useTransactionsByEmployee(): TransactionsByEmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [transactionsByEmployee, setTransactionsByEmployee] = useState<Transaction[] | null>(null)

  const [isFiltering, setIsFiltering] = useState(false);

  const fetchById = useCallback(
      async (employeeId: string) => {
          setIsFiltering(true); // Set filtering to true when a fetch is initiated
          const data = await fetchWithCache<Transaction[], RequestByEmployeeParams>(
              "transactionsByEmployee",
              { employeeId }
          );

          setTransactionsByEmployee(data);
      },
      [fetchWithCache]
  );

  const invalidateData = useCallback(() => {
      setTransactionsByEmployee(null);
      setIsFiltering(false); // Reset filtering state when data is invalidated
  }, []);

  return { data: transactionsByEmployee, loading, fetchById, invalidateData, isFiltering };
}
