export type PropertySuperType = "RENT" | "SHARE";

export type GenderPreference = 'ANY' | 'MALE_ONLY' | 'FEMALE_ONLY' | 'COUPLE';

export type ParkingOption = 'NONE' | 'STREET_PARKING' | 'RESERVED_SPACE';

export type SharePropertySubType = 'SECOND_ROOM' | 'MASTER_ROOM' | 'LIVING_SHARE';

export type RentPropertySubType = 'HOUSE' | 'APARTMENT' | 'UNIT' | 'STUDIO' | 'GRANNY_FLAT';

export type RealEstateType = 'INDIVIDUAL' | 'REAL_ESTATE';

export type CapacityShare = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'OTHER';

export type CapacityRent = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'OTHER';

export type Exposure = 'NORTHERN' | 'SOUTHERN' | 'EASTERN' | 'WESTERN';
export interface Category {
  id: number;
  categoryCode: string;
  name: string;
}

export interface OptionItem {
  optionItemId: number;
  itemName: string;
  isActive: boolean;
  isCustom: boolean;
  categoryId: number;
  categoryName: string;
  parentItemId: number | null;
}

export interface PropertyRegion {
  country: string;
  postCode: string;
  state: string;
  suburb: string;
  streetName: string;
  streetNumber: string;
  unit: string;
  buildingName: string;
  longitude: number;
  latitude: number;
}

export interface CostDetails {
  weeklyCost: number;
  costDescription: string;
  deposit: number;
  keyDeposit: number;
  depositAdjustable: boolean;
  billIncluded: boolean;
}

export interface LivingConditions {
  noticePeriodWeeks: number;
  minimumStayWeeks: number;
  contractTerms: string;
  contractExtendable: boolean;
}

export interface MoveInInfo {
  availableFrom: string;
  availableTo: string;
  isImmediate: boolean;
  isNegotiable: boolean;
}

export interface TimeSlot {
  timeFrom: string;
  timeTo: string;
}

export interface InternalDetailsBase {
  internalArea: number;
  totalArea: number;
  totalFloors: number;
  propertyFloor: number;
}

export interface ShareInternalDetails extends InternalDetailsBase {
  totalResidents: number;
  totalBathUser: number;
}

export interface RentInternalDetails extends InternalDetailsBase {
  numberOfRoom: number;
  numberOfBath: number;
}

interface PropertyBase {
  memberId: number;
  kind: PropertySuperType;
  genderPreference: string;
  lgbtAvailable: boolean;
  region: PropertyRegion;
  photoUrls: string[];
  thumbnailUrl: string | null;
  costDetails: CostDetails;
  optionItems: OptionItem[];
  livingConditions: LivingConditions;
  moveInInfo: MoveInInfo;
  parkingOption: string;
  meetingDateFrom: string;
  meetingDateTo: string;
  timeSlots: TimeSlot[];
  viewingAlwaysAvailable: boolean;
  description: string;
}

export interface SharePropertyDetail extends PropertyBase {
  jsonDiscriminator: "SHARE";
  sharePropertySubType: string;
  internalDetails: ShareInternalDetails;
  capacityShare: string;
}

export interface RentPropertyDetail extends PropertyBase {
  jsonDiscriminator: "RENT";
  rentPropertySubType: string;
  isRealEstateIntervention: string;
  internalDetails: RentInternalDetails;
  capacityRent: string;
  exposure: string;
}

export type PropertyDetail = SharePropertyDetail | RentPropertyDetail;
