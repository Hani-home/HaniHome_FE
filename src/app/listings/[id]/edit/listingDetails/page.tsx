"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import clsx from "clsx";

import {
  usePatchProperty,
  usePropertyDetailEditList,
} from "@/hooks/property/useProperty";

import {
  formatCapcityPeople,
  formatIsBrokered,
  formatPropertySubType,
} from "@/utils/formatter/detailFormatter";
import toPostPropertyDetail from "@/utils/toPostPropertyDetail";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import BackHeader from "@/components/layout/header/BackHeader";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";
import ListingDetailsDropdownContent from "@/components/listings/create/listingDetails/ListingDetailsDropdownContent";

import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { QUESTION_MAP } from "@/constants/question-map";

import { ListingDetailsOption } from "@/types/createPropertyAnswer";
import {
  RentInternalDetails,
  ShareInternalDetails,
} from "@/types/listingDetailPost";
import { PatchPayload } from "@/types/patchPayload";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

const ListingDetailsEdit = () => {
  const {
    listingType,
    rentPropertyType,
    sharePropertyType,
    rentCapacityPeople,
    shareCapacityPeople,
    rentInternalDetails,
    shareInternalDetails,
    optionItemIds,
    setListingType,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    setRentInternalDetails,
    setShareInternalDetails,
    setOptionItemIds,
  } = useListingStore();

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = usePropertyDetailEditList(id ?? "");
  const searchParams = useSearchParams();
  const open = searchParams.get("open");
  const { mutate: patchProperty } = usePatchProperty(Number(id));
  const listing = useMemo(() => {
    if (!data) return null;
    return toPostPropertyDetail(data);
  }, [data]);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!listing) return;
    setOptionItemIds(listing.optionItemIds);
    if (listing.jsonDiscriminator === "SHARE") {
      setListingType("SHARE");
      setSharePropertyType(listing.sharePropertySubType);
      setShareCapacityPeople(listing.capacityShare);
      setShareInternalDetails(listing.internalDetails);
    } else if (listing.jsonDiscriminator === "RENT") {
      setListingType("RENT");
      setRentPropertyType(listing.rentPropertySubType);
      setRentCapacityPeople(listing.capacityRent);
      setRentInternalDetails(listing.internalDetails);
    }
  }, [
    listing,
    setListingType,
    setSharePropertyType,
    setShareCapacityPeople,
    setShareInternalDetails,
    setRentPropertyType,
    setRentCapacityPeople,
    setRentInternalDetails,
    setOptionItemIds,
  ]);
  if (isLoading) return <div>로딩 중...</div>;
  if (error || !data) return <div>데이터를 불러올 수 없습니다.</div>;
  if (!listingType) return null;
  if (!listing) return null;

  const handleItemClick = () => {
    setShowAlert(true);
  };


  const handleSave = () => {
    if (!data || !open) return;

    const jsonDiscriminator = data.kind as "RENT" | "SHARE";
    let payload: PatchPayload | null = null;

    const includedOptionIds = new Set<number>();

    Object.values(CATEGORY_OPTIONS).forEach(category => {
      switch (category.key) {
        case "highlights":
        case "isBrokered":
        case "furniture":
          Object.values(category.items).forEach(item => {
            includedOptionIds.add(item.optionId);
          });
          break;
      }
    });

    const filteredOptionItemIds = optionItemIds.filter(
      id => !includedOptionIds.has(id),
    );

    const selectedIncludedOptionIds = optionItemIds.filter(id =>
      includedOptionIds.has(id),
    );

    const finalOptionItemIds = [
      ...filteredOptionItemIds,
      ...selectedIncludedOptionIds,
    ];

    if (jsonDiscriminator === "RENT") {
      switch (open) {
        case "propertyType":
          payload = {
            jsonDiscriminator: "RENT",
            rentPropertySubType: rentPropertyType ?? undefined,
          };
          break;

        case "capacityPeople":
          payload = {
            jsonDiscriminator: "RENT",
            capacityRent: rentCapacityPeople ?? undefined,
          };
          break;

        case "internalDetail":
          payload = {
            jsonDiscriminator: "RENT",
            internalDetails: rentInternalDetails ?? undefined,
          };
          break;

        case "furniture":
        case "highlights":
          payload = {
            jsonDiscriminator: "RENT",
            optionItemIds: finalOptionItemIds,
          };
          break;

        case "isBrokered":
          payload = {
            jsonDiscriminator: "RENT",
            optionItemIds: finalOptionItemIds,
          };
          break;
      }
    } else if (jsonDiscriminator === "SHARE") {
      switch (open) {
        case "propertyType":
          payload = {
            jsonDiscriminator: "SHARE",
            sharePropertySubType: sharePropertyType ?? undefined,
          };
          break;

        case "capacityPeople":
          payload = {
            jsonDiscriminator: "SHARE",
            capacityShare: shareCapacityPeople ?? undefined,
          };
          break;

        case "internalDetail":
          payload = {
            jsonDiscriminator: "SHARE",
            internalDetails: shareInternalDetails ?? undefined,
          };
          break;

        case "furniture":
        case "highlights":
          payload = {
            jsonDiscriminator: "SHARE",
            optionItemIds: finalOptionItemIds,
          };
          break;
      }
    }

    if (payload) {
      patchProperty(payload, {
        onSuccess: () => {
          router.push(`/listings/${id}/edit`);
        },
      });
    }
  };

  return (
    <>
      <BackHeader />
      <FunnelStepMenu fixedKey="listingDetails" />
      {QUESTION_MAP[listingType].ListingDetails.map((item, index, array) => {
        let value: React.ReactNode = "N/A";

        switch (item.id) {
          case "propertyType": {
            if (listingType === "SHARE" && sharePropertyType) {
              value = formatPropertySubType(sharePropertyType, listingType);
            } else if (listingType === "RENT" && rentPropertyType) {
              value = formatPropertySubType(rentPropertyType, listingType);
            } else {
              value = "N/A";
            }
            break;
          }

          case "capacityPeople": {
            if (listingType === "SHARE" && shareCapacityPeople !== null) {
              value = formatCapcityPeople(shareCapacityPeople, "SHARE");
            } else if (listingType === "RENT" && rentCapacityPeople !== null) {
              value = formatCapcityPeople(rentCapacityPeople, "RENT");
            } else {
              value = "N/A";
            }
            break;
          }

          case "furniture": {
            const options = CATEGORY_OPTIONS[2].items;
            const categories = Object.entries(options)
              .filter(([, items]) =>
                items.some(i => optionItemIds?.includes(i.optionId)),
              )
              .map(([category]) => category);
            value = categories.join(", ");
            break;
          }

          case "highlights": {
            const options = CATEGORY_OPTIONS[1].items;
            const matched = options.filter(i =>
              optionItemIds?.includes(i.optionId),
            );
            value = matched.length
              ? `${matched[0].label}${matched.length > 1 ? "···" : ""}`
              : "";
            break;
          }

          case "isBrokered": {
            value = formatIsBrokered(optionItemIds);
            break;
          }

          case "internalDetails": {
            const val =
              listingType === "SHARE"
                ? shareInternalDetails
                : rentInternalDetails;

            if (!val) {
              value = "답변내용";
              break;
            }

            const areaLabels = ["internalArea", "totalArea"];
            const areaTexts = areaLabels
              .filter(key => val[key as keyof typeof val])
              .map(() => "면적");

            const resident = "";
            const shareBathroom = "";
            let rooms = "";
            let bathrooms = "";
            let veranda = "";
            let yard = "";
            let withOwner = "";

            if (listingType === "SHARE") {
              const shareVal = val as ShareInternalDetails;
              bathrooms = shareVal.totalBathUser ? "욕실 쉐어" : "";
              rooms = shareVal.totalResidents ? "거주인" : "";
              withOwner = shareVal.withPropertyOwner ? "집주인 거주" : "";
            } else if (listingType === "RENT") {
              const rentVal = val as RentInternalDetails;
              rooms = rentVal.numberOfRoom ? "방 개수" : "";
              bathrooms = rentVal.numberOfBath ? "욕실 개수" : "";
              veranda = rentVal.verandaIncluded ? "베란다 있음" : "";
              yard = rentVal.yardIncluded ? "마당 있음" : "";
            }

            const floorLabels = ["totalFloors", "propertyFloors"];
            const floorTexts = floorLabels
              .filter(key => val[key as keyof typeof val])
              .map(() => "층수");

            const parts = [
              areaTexts.length > 0 ? "면적" : null,
              resident || null,
              shareBathroom || null,
              rooms || null,
              bathrooms || null,
              floorTexts.length > 0 ? "층수" : null,
              veranda || null,
              yard || null,
              withOwner || null,
            ].filter(Boolean);

            const uniqueParts = Array.from(new Set(parts));

            value = uniqueParts.join(", ") || "답변내용";
            break;
          }

          default: {
            value = "답변내용";
            break;
          }
        }

        return (
          <div key={item.id}>
            <div
              className={clsx(
                "flex h-19 w-[375px] cursor-pointer items-start justify-between p-4",
              )}
              onClick={() => {
                if (open != item.id) handleItemClick();
              }}
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`text-heading3 ${
                    open === item.id ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-cap1-med text-gray-500">{value}</div>
              </div>
              <div>
                <DownArrow
                  className={`h-6 w-6 cursor-pointer ${open === item.id ? "rotate-180 text-gray-900" : "text-gray-500"}`}
                />
              </div>
            </div>
            {open === item.id && (
              <ListingDetailsDropdownContent
                id={item.id as ListingDetailsOption["type"]}
                onSelect={() => {}}
              />
            )}
            {index < array.length - 1 && <Divider className="my-1" />}
          </div>
        );
      })}
      {showAlert && (
        <AlertMessage
          message="이전 페이지로 돌아가 수정해주세요"
          onDone={() => setShowAlert(false)}
          className="bottom-[70px]"
        />
      )}
      <BottomActionBar label="저장" onClick={handleSave} />
    </>
  );
};

export default ListingDetailsEdit;
