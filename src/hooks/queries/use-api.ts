import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, API_ENDPOINTS } from '@/lib/api';

type ApiQueryOptions = {
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
  retry?: boolean | number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
};

// Generic hook for GET requests
export function useApiQuery<TData = any>(
  endpoint: string,
  queryKey: string[],
  options?: ApiQueryOptions
) {
  return useQuery({
    queryKey,
    queryFn: () => apiRequest<TData>(endpoint),
    ...options
  });
}

// Generic hook for POST/PUT/DELETE requests
export function useApiMutation<TData = any, TVariables = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
) {
  return useMutation({
    mutationFn: (variables: TVariables) => 
      apiRequest<TData>(endpoint, { 
        method, 
        body: variables 
      })
  });
}

// Predefined hooks for common API endpoints
export function useHealthCheck(options?: ApiQueryOptions) {
  const query = useApiQuery(
    API_ENDPOINTS.HEALTH, 
    ['health'],
    {
      ...options,
      onSuccess: (data) => {
        console.log('Health check response:', data);
        options?.onSuccess?.(data);
      }
    }
  );
  
  return query;
}

// Usage examples for other API endpoints:
// export function useGetUsers() {
//   return useApiQuery('/users', ['users']);
// }
//
// export function useCreateUser() {
//   return useApiMutation('/users', 'POST');
// } 