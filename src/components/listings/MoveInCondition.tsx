import { formatToDateRange } from "@/utils/dateFormatter";

import InfoCard from "@/components/listings/shared/InfoCard";
import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import {
  CAPACITY_RENT_LABEL_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";
import { GENDER_PREFERENCE_LABEL_MAP } from "@/constants/gender-options";

import { Property } from "@/types/property";

import ExtraConditions from "./ExtraConditions";

const MoveInCondition = ({ data }: { data: Property }) => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <Section>
        <div className="flex items-center justify-between px-4 py-3">
          <Label>거주 가능 조건</Label>
          <div className="text-body2-med flex flex-col items-end gap-1 text-gray-700">
            <span>
              {
                GENDER_PREFERENCE_LABEL_MAP[
                  data.genderPreference as keyof typeof GENDER_PREFERENCE_LABEL_MAP
                ]
              }
              {data.lgbtAvailable && " / LGBTQIA+"}
            </span>
            {data.kind === "SHARE" && (
              <span>
                {
                  CAPACITY_SHARE_MAP[
                    data.capacityShare as keyof typeof CAPACITY_SHARE_MAP
                  ]
                }
              </span>
            )}
            {data.kind === "RENT" && (
              <span>
                {
                  CAPACITY_RENT_LABEL_MAP[
                    data.capacityRent as keyof typeof CAPACITY_RENT_LABEL_MAP
                  ]
                }
              </span>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex w-full py-3">
          <InfoCard
            className="gap-2"
            title="노티스"
            items={[
              <span className="text-body2-med text-gray-700" key="notice">
                최소 {data.livingConditions.noticePeriodWeeks}주 전
              </span>,
            ]}
          />
          <InfoCard
            className="gap-2"
            title="최소 거주 기간"
            items={[
              <span className="text-body2-med text-gray-700" key="minPeriod">
                최소 {data.livingConditions.minimumStayWeeks}주
              </span>,
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-2 px-4 py-3">
          <Label>입주 가능일</Label>
          <div className="text-body2-med flex text-gray-700">
            {formatToDateRange(
              data.moveInInfo.availableFrom,
              data.moveInInfo.availableTo,
            )}
          </div>
        </div>
      </Section>

      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between">
            <Label>추가 고려사항</Label>
            <span className="text-cap1-med text-gray-600">조건 협의 가능</span>
          </div>
          <ExtraConditions data={data.optionItems} />
        </div>
      </Section>
    </div>
  );
};

export default MoveInCondition;
