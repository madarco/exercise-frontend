"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { fetchDetails, fetchResource, PaginatedData } from "../swapi-client";
import { PersonDetail } from "./components/person-detail";

// Define the TypeScript interface for a Star Wars person
export interface Person {
  id: number;
  uid: string;
  name: string;
  url: string;
  properties?: {
    gender: string;
    birth_year: string;
    height: string;
    mass: string;
    hair_color: string;
    eye_color: string;
    homeworld: string;
  };
}

export default function PeoplePage() {
  // Peoples list:
  const [people, setPeople] = useState<PaginatedData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Single people details async loading:
  const [loadedPeople, setLoadedPeople] = useState<Record<string, Person>>({});
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});

  // Fetch people data when component mounts or page changes
  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      try {
        const data = await fetchResource("people", currentPage);
        setPeople(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, [currentPage]);

  // Load person details when they appear in the list
  useEffect(() => {
    if (people?.results) {
      console.log("Loading details");
      people.results.forEach(async (person) => {
        // Skip if already loaded or loading
        if (loadedPeople[person.uid] || loadingDetails[person.uid]) return;

        setLoadingDetails((prev) => ({ ...prev, [person.uid]: true }));
        try {
          const details = await fetchDetails(person.url);
          setLoadedPeople((prev) => ({
            ...prev,
            [person.uid]: {
              ...person,
              properties: details.result.properties,
            },
          }));
        } catch (error) {
          console.error(`Error loading details for ${person.name}:`, error);
        } finally {
          setLoadingDetails((prev) => ({ ...prev, [person.uid]: false }));
        }
      });
    }
  }, [people?.results, loadedPeople, loadingDetails]);

  // Get total pages from API response
  const totalPages = useMemo(() => {
    return people?.total_pages || 1;
  }, [people]);

  // Get total records from API response
  const totalRecords = useMemo(() => {
    return people?.total_records || 0;
  }, [people]);

  // Handle person selection with loaded details
  const handlePersonSelect = (person: Person) => {
    const loadedPerson = loadedPeople[person.uid] || person;
    setSelectedPerson(loadedPerson);
    setIsDetailOpen(true);
  };

  // Handle drawer close
  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1 className="text-2xl font-bold">Star Wars Characters</h1>
        <div className="rounded-lg border">
          <div className="h-10 bg-muted">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="p-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-full mb-4" />
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error loading characters</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-white">
      <h1 className="text-2xl font-bold">Star Wars Characters</h1>

      {/* Data table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Birth Year</TableHead>
              <TableHead>Homeworld</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people?.results?.length ? (
              people.results.map((person) => {
                const loadedPerson = loadedPeople[person.uid];
                const isLoading = loadingDetails[person.uid];
                return (
                  <TableRow key={person.uid}>
                    <TableCell>
                      <Button variant="link" className="p-0 font-medium text-left" onClick={() => handlePersonSelect(person)}>
                        {person.name}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-muted-foreground px-1.5">
                        {isLoading ? <span className="animate-pulse">Loading...</span> : loadedPerson?.properties?.gender || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>{isLoading ? <span className="animate-pulse">Loading...</span> : loadedPerson?.properties?.birth_year || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-muted-foreground px-1.5">
                        {isLoading ? <span className="animate-pulse">Loading...</span> : loadedPerson?.properties?.homeworld || "Unknown"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{people?.results?.length || 0}</strong> of <strong>{totalRecords}</strong> records
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage <= 1}>
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage >= totalPages}>
            <IconChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Person detail drawer with loaded details */}
      {selectedPerson && <PersonDetail person={selectedPerson} onClose={handleDetailClose} open={isDetailOpen} />}
    </div>
  );
}
