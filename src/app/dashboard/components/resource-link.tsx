import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData, ResourceType } from "../swapi-client";

export default function ResourceLink({ resource, url }: { resource: ResourceType; url: string }) {
  const uid: string = url.split("/").pop() || "";
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData(url, undefined, true)
      .then((data) => {
        setItem(data.result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <span className="text-muted-foreground">Loading...</span>;
  }

  if (!item) {
    return <span className="text-muted-foreground">-</span>;
  }

  return <Link href={`/dashboard/${resource}/${uid}`}>{item?.properties?.name || item?.properties?.title}</Link>;
}
