"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ResourceType } from "../swapi-client";

import { useSwapiResults } from "../use-swapi";
import { ColumnDef } from "../use-swapi";
import ResourceLink from "./resource-link";
import { parseAsInteger, useQueryState } from "nuqs";
import { formatPopulation } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function ListPage({ resource, columnsDef }: { resource: ResourceType; columnsDef: ColumnDef[] }) {
  const router = useRouter();
  const { data, fetchData, loading, error } = useSwapiResults();
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    fetchData(resource, currentPage, false);
  }, [resource, currentPage, fetchData]);

  const totalPages = data?.total_pages || 1;
  const totalRecords = data?.total_records || 0;

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
  if (loading && !data?.results?.length) {
    return <TableSkeleton />;
  }

  // Error state
  if (error) {
    return <TableError error={error} />;
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-white">
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              {columnsDef.map((column) => (
                <TableHead key={column.property} className={column.className} style={{ width: Math.round(100 / columnsDef.length) + "%" }}>
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.results?.map((person) => {
              const loadedPerson = person.properties;
              return (
                <TableRow key={person.uid} className="cursor-pointer" onClick={() => router.push(`/dashboard/${resource}/${person.uid}`)}>
                  {columnsDef.map((column) => (
                    <TableCell key={column.property}>
                      {column.property === "name" ? (
                        // Main name of the entity, linked to the detail page
                        <Link href={`/dashboard/${resource}/${person.uid}`} className="p-0 font-medium text-left underline">
                          {person.name}
                        </Link>
                      ) : !loadedPerson ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        <TableCellValue column={column} item={loadedPerson} />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}

            {!data?.results?.length && (
              <TableRow>
                <TableCell colSpan={columnsDef.length} className="h-24 text-center">
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
          <span className="hidden md:inline">Showing</span> <strong>{(currentPage - 1) * 10 + (data?.results?.length || 0)}</strong> of{" "}
          <strong>{totalRecords}</strong> records
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
    </div>
  );
}

const TableCellValue = ({ column, item }: { column: ColumnDef; item: any }) => {
  const value = item[column.property] || item.properties?.[column.property];

  switch (column.type) {
    case "badge":
      return <Badge variant="outline">{value || "Unknown"}</Badge>;
    case "measurement":
      if ((column.unit = "people")) {
        return <span>{formatPopulation(value)}</span>;
      }
      if (!value) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <span>
          {value || "Unknown"} {column.unit}
        </span>
      );
    case "text":
    default:
      if (column.render) {
        return column.render(value);
      }
      if (value.startsWith("http")) {
        return <ResourceLink resource={column.resource as ResourceType} url={value} />;
      }
      return <span className="text-muted-foreground">{value || "Unknown"}</span>;
  }
};

const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
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
};

const TableError = ({ error }: { error: string }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-500">Error loading</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    </div>
  );
};
