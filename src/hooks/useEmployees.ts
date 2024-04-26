import { useCallback, useState } from "react";
import { Employee } from "../utils/types";
import { useCustomFetch } from "./useCustomFetch";
import { EmployeeResult } from "./types";

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [hasMorePages, setHasMorePages] = useState(false); // Defaulting to false as employees may not be paginated

  const fetchAll = useCallback(async () => {
    const employeesData = await fetchWithCache<Employee[]>("employees");
    setEmployees(employeesData);
    // Here you would set hasMorePages based on the response, if it were paginated
  }, [fetchWithCache]);

  const invalidateData = useCallback(() => {
    setEmployees(null);
    setHasMorePages(false); // Reset when data is invalidated
  }, []);

  return { data: employees, loading, fetchAll, invalidateData, hasMorePages };
}

