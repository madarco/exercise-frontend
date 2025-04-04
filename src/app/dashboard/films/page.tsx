"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SinglePageData } from "../swapi-client";
import { useSwapiDetail, useSwapiResults } from "../use-swapi";
import { fetchData } from "../swapi-client";
import Link from "next/link";
import { IconMovie, IconNumbers, IconUser, IconCalendar } from "@tabler/icons-react";

// Create a component for the films page
export default function Page() {
  const [films, setFilms] = useState<{
    result: {
      properties: Record<string, any>;
      uid: string;
    }[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all films
  useEffect(() => {
    const loadFilms = async () => {
      setLoading(true);
      try {
        const data = await fetchData("films");
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {films?.result?.map((film) => (
          <Link
            key={film.properties.episode_id}
            className="w-full text-left cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
            href={`/dashboard/films/${film.uid}`}
          >
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconMovie className="h-5 w-5" />
                  {film.properties.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <IconNumbers className="h-4 w-4" />
                  Episode {film.properties.episode_id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3">{film.properties.opening_crawl}</p>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <div className="text-sm flex items-center gap-2">
                  <IconUser className="h-4 w-4" />
                  <span className="font-medium">Director:</span> {film.properties.director}
                </div>
                <div className="text-sm flex items-center gap-2">
                  <IconCalendar className="h-4 w-4" />
                  <span className="font-medium">Release Date:</span> {film.properties.release_date}
                </div>
              </CardFooter>
            </Card>
          </Link>
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
        </Card>
      )}

      <CardFooter className="flex justify-center">
        <button
          onClick={async () => {
            localStorage.clear();
            window.location.reload();
            await fetch("/api/swapi/films", { method: "DELETE" });
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
        >
          Clear Cache
        </button>
      </CardFooter>
    </div>
  );
}
