import { Suspense } from "react";

import ListingCreateClient from "@/components/listings/create/ListingCreateClient";

export default function ListingCreatePage() {
  return (
    <Suspense fallback={<div></div>}>
      <ListingCreateClient />
    </Suspense>
  );
}
