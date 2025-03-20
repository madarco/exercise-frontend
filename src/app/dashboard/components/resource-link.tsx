import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData, ResourceType } from "../swapi-client";
import { useRouter } from "next/navigation";

export default function ResourceLink({ resource, url }: { resource: ResourceType; url: string }) {
  const router = useRouter();
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

  return (
    <Link className="underline" href={`/dashboard/${resource}/${uid}`} onClick={(e) => e.stopPropagation()}>
      {item?.properties?.name || item?.properties?.title}
    </Link>
  );
}
