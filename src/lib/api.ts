// Base API configuration
const API_BASE_URL = 'https://api.ai-workers.net';

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: '/health',
  // Add more endpoints as needed
  // USERS: '/users',
  // PROJECTS: '/projects',
  // etc.
};

// API request options type
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
};

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;
  
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };
  
  const config: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: 'include',
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    // Handle error based on status code
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API request failed with status ${response.status}`);
  }
  
  // For responses with no content
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
} 