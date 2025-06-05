"use client";

import { useParams } from "next/navigation";

import BackHeader from "@/components/layout/header/BackHeader";

const ListingDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <BackHeader rightIcon="report" />
      <div>{id}</div>
    </div>
  );
};

export default ListingDetailPage;
