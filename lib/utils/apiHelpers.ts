/**
 * API utility functions for making requests and handling errors
 */

interface ApiErrorResponse {
  error: string;
  details?: string;
  status?: number;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  cache?: RequestCache;
}

/**
 * Standardized API fetcher with error handling
 * @param url API URL to fetch
 * @param options Request options
 * @returns JSON response data
 * @throws ApiError if the request fails
 */
export async function fetchApi<T>(url: string, options?: ApiOptions): Promise<T> {
  const defaultOptions: ApiOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  };

  // Convert body to JSON string if it's an object
  if (fetchOptions.body && typeof fetchOptions.body === 'object') {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    // Handle different response types
    const data = isJson ? await response.json() : await response.text();

    // If the response is not ok, throw an error
    if (!response.ok) {
      const errorMessage = isJson && 'error' in data 
        ? data.error 
        : 'An unexpected error occurred';
      
      const error = new ApiError(
        errorMessage,
        response.status,
        isJson ? data.details : undefined
      );
      throw error;
    }

    return data as T;
  } catch (error) {
    // If it's already an ApiError, rethrow it
    if (error instanceof ApiError) {
      throw error;
    }

    // Otherwise, wrap it in an ApiError
    throw new ApiError(
      error instanceof Error ? error.message : 'Network request failed',
      500
    );
  }
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  details?: string;
  
  constructor(message: string, status: number = 500, details?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Parse URL search params into a filter object
 * @param searchParams URLSearchParams object
 * @returns Object with filter parameters
 */
export function parseSearchParams(searchParams: URLSearchParams): Record<string, string | number | boolean> {
  const filters: Record<string, string | number | boolean> = {};
  
  searchParams.forEach((value, key) => {
    // Parse numbers
    if (!isNaN(Number(value))) {
      filters[key] = Number(value);
    }
    // Parse booleans
    else if (value === 'true' || value === 'false') {
      filters[key] = value === 'true';
    }
    // Keep strings as-is
    else {
      filters[key] = value;
    }
  });
  
  return filters;
}

/**
 * Build URL search params from a filter object
 * @param filters Object with filter parameters
 * @returns Formatted search params string
 */
export function buildSearchParams(filters: Record<string, any>): string {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  
  const paramString = params.toString();
  return paramString ? `?${paramString}` : '';
}

/**
 * Handle API errors in a standardized way
 * @param error Error object
 * @returns Standardized error message and status
 */
export function handleApiError(error: unknown): ApiErrorResponse {
  if (error instanceof ApiError) {
    return {
      error: error.message,
      details: error.details,
      status: error.status,
    };
  }
  
  if (error instanceof Error) {
    return {
      error: error.message,
      status: 500,
    };
  }
  
  return {
    error: 'An unexpected error occurred',
    status: 500,
  };
}

/**
 * Get client-side environment variable with validation
 * @param key Environment variable key
 * @param fallback Optional fallback value
 * @returns Environment variable value
 */
export function getEnv(key: string, fallback?: string): string {
  // Only client-side environment variables should be accessed
  const value = process.env[`NEXT_PUBLIC_${key}`] || fallback;
  
  if (!value) {
    console.warn(`Environment variable NEXT_PUBLIC_${key} is not defined`);
  }
  
  return value || '';
}

export default {
  fetchApi,
  ApiError,
  parseSearchParams,
  buildSearchParams,
  handleApiError,
  getEnv,
};