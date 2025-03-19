"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconArrowLeft } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ResourceType } from "../swapi-client";
import { ColumnDef, useSwapiDetail } from "../use-swapi";
import ResourceLink from "./resource-link";

export default function DetailPage({ resource, properties }: { resource: ResourceType; properties: ColumnDef[] }) {
  const { id: itemId } = useParams();
  const router = useRouter();
  const { data: item, loading, error, fetchSingleData } = useSwapiDetail();

  // Load data on component mount
  useEffect(() => {
    fetchSingleData(`${resource}/${itemId}`);
  }, [resource, itemId, fetchSingleData, properties]);

  // Loading state
  // Loading state
  if (loading && !item) {
    return <LoadingState properties={properties} />;
  }

  // Error state
  if (error || !item) {
    return <ErrorState error={error || "Item not found"} />;
  }

  return (
    <div className="container max-w-2xl py-4 md:py-6">
      <div className="flex flex-col gap-4">
        <Button variant="outline" className="w-fit" onClick={() => router.back()}>
          <IconArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{item.result.properties.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Render properties in pairs when possible */}
              {properties.map((property, index) => (
                <div key={index}>
                  <div>
                    <h3 className="font-semibold mb-1">{property.title}</h3>
                    <PropertyValue property={property} item={item.result} router={router} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const ErrorState = ({ error }: { error: string }) => {
  const router = useRouter();
  return (
    <div className="container max-w-2xl py-4 md:py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error loading details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error || "Item not found"}</p>
          <Button variant="outline" className="mt-4" onClick={() => router.back()}>
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const PropertyValue = ({ property, item, router }: { property: ColumnDef; item: any; router?: any }) => {
  const value = item.properties?.[property.property];
  if (!value) {
    return (
      <p>
        <span className="text-muted-foreground">Unknown</span>
      </p>
    );
  }

  // Render based on value type
  switch (property.type) {
    case "badge":
      return <Badge variant="outline">{value || "Unknown"}</Badge>;
    case "measurement":
      return (
        <p>
          {value || "Unknown"} {property.unit}
        </p>
      );
    case "resources":
      return (
        <ul>
          {value?.map((url: string) => (
            <li key={url}>
              <ResourceLink resource={property.resource as ResourceType} url={url} />
            </li>
          ))}
          {value?.length === 0 && <span className="text-muted-foreground">No {property.title}</span>}
        </ul>
      );
    case "text":
    default:
      if (property.render) {
        return property.render(value);
      }
      if (value.startsWith("http")) {
        return <ResourceLink resource={property.resource as ResourceType} url={value} />;
      }
      return <p className="text-muted-foreground">{value || "Unknown"}</p>;
  }
};

const LoadingState = ({ properties }: { properties: ColumnDef[] }) => {
  return (
    <div className="container max-w-2xl py-4 md:py-6">
      <div className="flex flex-col gap-4">
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(properties.length)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
