"use client";

import { usePathname } from "next/navigation";

import { useEffect } from "react";

import { useNotificationStream } from "@/hooks/notification/useNotification";
import { useToastQueue } from "@/hooks/notification/useToastQueue";

import TabBar from "@/components/layout/TabBar";
import NotificationToast from "@/components/notification/NotificationToast";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const notifications = useNotificationStream();
  const { queue, addToast, removeToast } = useToastQueue();

  const showBottomNavbarPaths = ["/home", "/wishlist", "/viewing", "/mypage"];
  const showNavbar = showBottomNavbarPaths.includes(pathname);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (notifications.length === 0) return;
    const latest = notifications[0];

    addToast({
      message: latest.message || "새 알림이 도착했어요!",
      subMessage: latest.type,
    });
  }, [notifications]);

  return (
    <div
      className={
        isAdmin
          ? "min-h-screen w-full overflow-y-auto bg-white"
          : "scrollbar-hide mx-auto h-screen max-w-[480px] min-w-[375px] overflow-y-auto"
      }
    >
      {children}
      {!isAdmin && showNavbar && <TabBar />}

      <div className="fixed top-[47.85px] left-1/2 z-[999] flex w-full max-w-[343px] -translate-x-1/2 flex-col items-center gap-2">
        {queue.map(toast => (
          <NotificationToast
            key={toast.id}
            message={toast.message}
            subMessage={toast.subMessage}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LayoutWrapper;
