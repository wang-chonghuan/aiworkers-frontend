import { useQuery } from '@tanstack/react-query';

// Mock API call function
const fetchData = async () => {
  // In a real-world scenario, this would be an actual API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: 'Hello from API' });
    }, 1000);
  });
};

export function useExampleQuery() {
  return useQuery({
    queryKey: ['example'],
    queryFn: () => fetchData(),
  });
} 