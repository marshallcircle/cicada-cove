/**
 * API utility functions and error handling
 */

export interface ApiErrorResponse {
  error: string;
  details?: Record<string, any>;
}

export interface ApiOptions extends RequestInit {
  timeout?: number;
}

/**
 * Fetch API with error handling and type safety
 */
export async function fetchApi<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  try {
    // Add default headers if none provided
    if (!fetchOptions.headers) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
      };
    }

    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Make the request
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Check if the response is successful
    if (!response.ok) {
      let errorData: ApiErrorResponse;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          error: `Request failed with status ${response.status}`,
        };
      }

      throw new ApiError(
        errorData.error || `Request failed with status ${response.status}`,
        response.status,
        errorData.details
      );
    }

    // Check if the response is empty
    const contentType = response.headers.get('content-type');
    if (
      contentType &&
      contentType.includes('application/json') &&
      response.status !== 204
    ) {
      const data = await response.json();
      return data as T;
    }

    return {} as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error',
      500
    );
  }
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  status: number;
  details?: Record<string, any>;

  constructor(message: string, status: number = 500, details?: Record<string, any>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Parse search parameters from URL
 */
export function parseSearchParams(
  searchParams: URLSearchParams
): Record<string, string | number | boolean> {
  const params: Record<string, string | number | boolean> = {};

  searchParams.forEach((value, key) => {
    // Convert to appropriate type
    if (value === 'true') {
      params[key] = true;
    } else if (value === 'false') {
      params[key] = false;
    } else if (!isNaN(Number(value)) && value.trim() !== '') {
      params[key] = Number(value);
    } else {
      params[key] = value;
    }
  });

  return params;
}

/**
 * Build URL search parameters from object
 */
export function buildSearchParams(
  params: Record<string, string | number | boolean | undefined>
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}

/**
 * Handle API errors with user-friendly messages
 */
export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    // Return user-friendly message based on status code
    switch (error.status) {
      case 401:
        return 'You need to be logged in to perform this action';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return 'The requested resource was not found';
      case 422:
        return 'The provided data is invalid';
      case 429:
        return 'Too many requests, please try again later';
      default:
        return error.message || 'An unexpected error occurred';
    }
  }

  return error instanceof Error
    ? error.message
    : 'An unexpected error occurred';
}

/**
 * Get environment variable with proper error handling
 * Only for client-side use of public env vars
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[`NEXT_PUBLIC_${key}`];
  
  if (!value) {
    if (fallback !== undefined) {
      return fallback;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Environment variable NEXT_PUBLIC_${key} is not set`);
    }
    
    throw new Error(`Environment variable NEXT_PUBLIC_${key} is not set`);
  }
  
  return value;
}