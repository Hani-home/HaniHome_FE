export type ListingType = "렌트" | "쉐어";

interface CommonListingFields {
  id: string;
  type: ListingType;
  parking: string;
  furniture: string[];
  hostDescription: string;
  tags: string[];
}

export interface RentListingDetail extends CommonListingFields {
  type: "렌트";
  residentCount: number;
  isBrokered: boolean;
  roomCount: number;
  bathroomCount: number;
  totalFloors: number;
  currentFloor: number;
  hasYard: boolean;
  hasBalcony: boolean;
  direction: string;
}

export interface ShareListingDetail extends CommonListingFields {
  type: "쉐어";
  shareCount: number;
  totalFloors: number;
  floorLocation: string;
}

export type ListingDetail = RentListingDetail | ShareListingDetail;

export interface RegionType {
  country: string;
  postCode: string;
  state: string;
  suburb: string;
  streetName: string;
  streetNumber: string;
  unit: string;
  buildingName: string;
}

export interface Furniture {
  [category: string]: string[];
}

export interface AdditionalInfo {
  smokingAllowed: boolean;
  petsAllowed: boolean;
  visitorsAllowed: boolean;
  parking: string[];
  kitchenAccess: boolean;
}

export interface PropertyDetails {
  internalArea: string;
  totalArea: string;
  totalResidents: string;
  sharedBathrooms: string;
  buildingFloors: string;
  floor: string;
}

export interface Costs {
  weeklyCost: string;
  billsIncluded: boolean;
  includedItems: string[];
  deposit: string;
}

export interface LivingConditions {
  noticePeriod: string;
  minStayDuration: string;
  contractType: string;
}

export type ListingValueMap = {
  rentalType: ListingDetail["type"];
  address: string;
  propertyType: string;
  maxOccupants: string;
  propertyDetails: PropertyDetails;
  isBrokered: boolean;
  furniture: Furniture;
  highlights: string[];
  guestGender: string[];
  livingConditions: LivingConditions;
  costs: Costs;
  moveInDates: string[];
  hostDescription: string;
  additionalInfo: AdditionalInfo;
};
