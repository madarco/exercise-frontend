import { DataTable } from "@/app/dashboard/films/components/data-table";

import data from "./data.json";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <DataTable data={data} />
    </div>
  );
}
