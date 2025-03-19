import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData, ResourceType } from "../swapi-client";

export default function ResourceLink({ resource, url }: { resource: ResourceType; url: string }) {
  const uid: string = url.split("/").pop() || "";
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetchData(url, undefined, true).then((data) => {
      setItem(data.result);
    });
  }, [url]);

  if (!item) {
    return <span className="text-muted-foreground">Loading...</span>;
  }

  return <Link href={`/dashboard/${resource}/${uid}`}>{item?.properties?.name || item?.properties?.title}</Link>;
}
