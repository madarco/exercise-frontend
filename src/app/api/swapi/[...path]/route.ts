import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, unstable_cache } from 'next/cache';

const SWAPI_BASE_URL = 'https://swapi.tech/api';

// Rate limiting configuration
const MAX_REQUESTS_PER_SECOND = parseInt(process.env.MAX_REQUESTS_PER_SECOND || "3")
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "1000")

// Sliding window to track recent requests
const requestTimestamps: number[] = [];

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Helper function to enforce rate limits
async function enforceRateLimit(): Promise<void> {
  const now = Date.now();
  
  // Remove timestamps older than our window
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > RATE_LIMIT_WINDOW_MS) {
    requestTimestamps.shift();
  }
  
  // Check if we're at the limit
  if (requestTimestamps.length >= MAX_REQUESTS_PER_SECOND) {
    // Calculate required delay to satisfy rate limit
    const oldestAllowed = now - RATE_LIMIT_WINDOW_MS;
    const earliestNext = requestTimestamps[0] + RATE_LIMIT_WINDOW_MS;
    const delayMs = Math.max(0, earliestNext - oldestAllowed);
    
    console.warn(`Rate limit reached. Delaying for ${delayMs}ms`);
    
    // Wait until we can process the next request
    await new Promise(resolve => setTimeout(resolve, delayMs));
    
    // After waiting, recursively check limits again (in case other requests came in during our wait)
    return enforceRateLimit();
  }
  
  // Record this request
  requestTimestamps.push(now);
  return Promise.resolve();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = (await params).path.join('/');
    
    const searchParams = request.nextUrl.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : '';
    
    const url = `${SWAPI_BASE_URL}/${path}${queryString}`;
    
    // We need to use unstable_cache to apply the rate limiting only to not cached data:
    const getCachedData = unstable_cache(
      async () =>  {
        // Apply rate limiting
        await enforceRateLimit();
        const response = await fetch(url)
        if (response.status === 404) {
          throw new NotFoundError('Not found')
        }
        if (!response.ok) {
          console.error('Failed to fetch data from SWAPI', response.status, response.statusText)
          throw new Error('Failed to fetch data from SWAPI')
        }
        return await response.json()
      },
      [url],
      {
        revalidate: 3600,
        tags: ["swapi"],
      }
    );

    const data = await getCachedData()
    return NextResponse.json(data);
  } 
  catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    }
    console.error('Error proxying request to SWAPI:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from SWAPI' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  revalidateTag("swapi")
  console.warn("Cache invalidated")
  return NextResponse.json({ message: "Cache invalidated" })
}
