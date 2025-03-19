import { ReactNode, useCallback, useEffect, useState } from "react";
import { fetchData as swapiFetchData, PaginatedData, ResourceType, SinglePageData } from "./swapi-client";

export const useSwapiResults = () => {
  const [data, setData] = useState<PaginatedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback((resourceOrUrl: string, page?: number, isFullUrl = false) => {
    setLoading(true);
    setError(null);
    setData(null);
    swapiFetchData(resourceOrUrl, page, isFullUrl)
      .then((data) => {
        setData(data);

        for (const item of data.results) {
          swapiFetchData(item.url, undefined, true)
            .then((itemData) => {
              setData((prev) => ({
                ...(prev as any),
                results: (prev?.results || []).map((prevItem) =>
                  prevItem.uid === item.uid ? { ...prevItem, properties: itemData.result.properties } : prevItem
                ),
              }));
            })
            .catch((err) => {
              // NB: we just skip:
              console.error("Error fetching item data:", err);
            });
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    fetchData,
    loading,
    error,
  };
};

export const useSwapiDetail = () => {
  const [data, setData] = useState<SinglePageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSingleData = useCallback((resourceOrUrl: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    swapiFetchData(resourceOrUrl, undefined, false)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    fetchSingleData,
    loading,
    error,
  };
};

export interface ColumnDef {
  property: string;
  title: string;
  className?: string;
  // If not null, we'll also fetch this details:
  resource?: ResourceType;
  type?: "text" | "badge" | "measurement" | "resources";
  unit?: string;
  render?: (value: any) => ReactNode;
}
