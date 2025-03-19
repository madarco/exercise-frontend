"use client";

import { baseUrl, localCache } from "@/configs/cache";

export type ResourceType = "films" | "people" | "planets" | "species" | "starships" | "vehicles";

export interface PaginatedData {
  total_records: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

export interface SinglePageData {
  result: {
    properties: Record<string, any>;
    url: string;
  };
}

/**
 * Useful function to get values from SWAPI with caching on localStorage
 */
export const fetchData = async (resourceOrUrl: string, page?: number, isFullUrl = false) => {
  let resourceUrl = resourceOrUrl;
  if (!isFullUrl && page && page > 1) {
    resourceUrl = `${resourceOrUrl}?page=${page}&limit=10`;
  }

  // Determine the appropriate URL to fetch
  if (isFullUrl) {
    const tmpUrl = new URL(resourceOrUrl);
    resourceOrUrl = tmpUrl.pathname + tmpUrl.search;
    // replace /api:
    resourceOrUrl = resourceOrUrl.replace(/^\/api\//, "");
  }

  // Otherwise, construct the API URL from the resource name
  const apiUrl = page && page > 1 ? `${baseUrl}/${resourceOrUrl}/?page=${page}&limit=10` : `${baseUrl}/${resourceOrUrl}`;
  // Check if we have cached data in localStorage
  const cachedData = localCache ? (typeof window !== "undefined" ? localStorage.getItem(`swapi_${apiUrl}`) : null) : null;
  const cachedTimestamp = localCache ? (typeof window !== "undefined" ? localStorage.getItem(`swapi_${apiUrl}_timestamp`) : null) : null;

  // Check if cache is valid (less than 1 hour)
  const isValidCache = cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < 60 * 60 * 1000;

  if (isValidCache) {
    try {
      const parsedData = JSON.parse(cachedData);
      return parsedData;
    } catch (err) {
      // If parsing fails, we'll fetch from the API
      console.error("Error parsing cached data:", err);
    }
  }

  try {
    // Use for testing:
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(apiUrl, { cache: "force-cache", next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${isFullUrl ? "details" : resourceOrUrl}`);
    }
    const data = await response.json();

    // Cache the results in localStorage with timestamp
    if (localCache && typeof window !== "undefined") {
      localStorage.setItem(`swapi_${apiUrl}`, JSON.stringify(data));
      localStorage.setItem(`swapi_${apiUrl}_timestamp`, Date.now().toString());
    }

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error(errorMessage);
    throw err;
  }
};
