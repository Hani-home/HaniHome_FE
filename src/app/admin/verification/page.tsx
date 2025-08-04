"use client";
import { useEffect, useState } from "react";
import { Verification, VerificationDetail } from "@/types/admin/verification";
import VerificationDetailModal from "@/components/admin/VerificationDetailModal";
import { axiosInstance } from "@/apis/axios";


const AdminVerificationPage = () => {
    const [requests, setRequests] = useState<Verification[]>([]);
    const [selectedVerification, setSelectedVerification] = useState<VerificationDetail | null>(null);

    const fetchVerifications = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/verifications/admin");
        setRequests(response.data.data);
      } catch (error) {
        console.error("Failed to fetch verifications:", error);
      }
    };
  
    useEffect(() => {
      

      fetchVerifications();
    }, []);

    const handleClickRow = async (id: number) => {
      try {
        const response = await axiosInstance.get(`/api/v1/verifications/admin/${id}`);
        setSelectedVerification(response.data.data);
      } catch (error) {
        console.error("Failed to fetch verification:", error);
      }
    };
  
    return (
      <div className="p-12">
        <h1 className="text-2xl font-bold mb-6">신원 인증 요청 목록</h1>
  
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 text-sm">
              <th className="py-2">회원 ID</th>
              <th className="py-2">인증 유형</th>
              <th className="py-2">요청 일시</th>
              <th className="py-2">상태</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={()=>handleClickRow(item.id)}>
                <td className="py-2">{item.memberId}</td>
                <td className="py-2">{item.type}</td>
                <td className="py-2">{new Date(item.requestedAt).toLocaleString("ko-KR")}</td>
                <td className="py-2">
                  <span
                    className={
                      item.status === "PENDING"
                        ? "text-yellow-500"
                        : item.status === "APPROVED"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*모달*/}
        {
          selectedVerification && (
            <VerificationDetailModal
              data={selectedVerification}
              onClose={
                () => {
                  setSelectedVerification(null);
                  fetchVerifications();
                }
              }
            />

          )
        }
      </div>
    );
  };
  

export default AdminVerificationPage;