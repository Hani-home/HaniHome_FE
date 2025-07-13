// import { useState } from "react";

// import BackHeader from "@/components/layout/header/BackHeader";

// import AddressField from "./AddressField";
// import FunnelStepMenu from "./FunnelStepMenu";

// interface AddressPhotoProps {
//   listingType: "SHARE" | "RENT" | null;
//   addressData: AddressDataType;
//   setAddressData: (data: AddressDataType) => void;
//   onNext: () => void;
//   onPrev: () => void;
// }

// const AddressPhoto = ({
//   listingType,
//   addressData,
//   setAddressData,
//   onNext,
//   onPrev,
// }: AddressPhotoProps) => {
//   const [subStep, setSubStep] = useState<"address" | "photo">("address");
//   const handleAddressChange = newAddress => {
//     setAddressData(newAddress);
//   };
//   return (
//     <>
//       <BackHeader rightIcon="close" />
//       <FunnelStepMenu />
//       {subStep === "address" && (
//         <AddressField
//           addressData={addressData}
//           onAddressChange={handleAddressChange}
//           onNext={() => setSubStep("photo")}
//         />
//       )}
//       {/* {subStep === "photo" && (
//         <PhotoField
//           photoData={photoData}
//           setPhotoData={setPhotoData}
//           onNext={onNext}
//         />
//       )} */}
//     </>
//   );
// };
// export default AddressPhoto;
