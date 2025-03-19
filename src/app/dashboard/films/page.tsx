"use client";

import React, { useEffect, useState } from "react";
import { fetchResource, SinglePageData } from "../swapi-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Create a component for the films page
export default function Page() {
  const [films, setFilms] = useState<SinglePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all films
  useEffect(() => {
    const loadFilms = async () => {
      setLoading(true);
      try {
        const data = await fetchResource("films");
        setFilms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1 className="text-2xl font-bold">Star Wars Films</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Skeleton className="h-8 w-3/4 mx-6 mt-6" />
                  <Skeleton className="h-4 w-1/4 mx-6 mt-2 mb-4" />
                </CardHeader>
                <CardContent className="p-0">
                  <Skeleton className="h-16 mx-6 mt-2" />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 p-0 mx-6 mt-4 mb-6">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error loading films</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-2xl font-bold">Star Wars Films</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {films?.result?.map((film) => (
          <Card key={film.properties.episode_id}>
            <CardHeader>
              <CardTitle>{film.properties.title}</CardTitle>
              <CardDescription>Episode {film.properties.episode_id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-3">{film.properties.opening_crawl}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1">
              <div className="text-sm">
                <span className="font-medium">Director:</span> {film.properties.director}
              </div>
              <div className="text-sm">
                <span className="font-medium">Release Date:</span> {film.properties.release_date}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {films?.result?.length === 0 && !loading && !error && (
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">No Films Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-500">No films found in the database</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  const data = await fetchResource("films");
                  setFilms(data);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "An unknown error occurred");
                } finally {
                  setLoading(false);
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
            >
              Refresh Films
            </button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
