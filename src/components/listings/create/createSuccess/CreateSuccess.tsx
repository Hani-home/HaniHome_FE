"use client";

import CompletePage from "@/components/common/CompletePage";

const CreateSuccess = () => {
  return <CompletePage message="등록이 완료되었어요!" redirectUrl={"/home"} />;
};

export default CreateSuccess;
