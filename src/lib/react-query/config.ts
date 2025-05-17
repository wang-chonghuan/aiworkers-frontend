import { QueryClient } from '@tanstack/react-query';

// Query client configuration
export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't auto-refetch when window gets focus
      retry: 1, // Retry failed requests once
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    },
  },
};

// Create query client instance
export const createQueryClient = () => new QueryClient(queryClientOptions); 