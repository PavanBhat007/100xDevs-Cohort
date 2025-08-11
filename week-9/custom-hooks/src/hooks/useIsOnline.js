import { useEffect, useState } from "react";

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const handleOnlineEvent = () => setIsOnline(true);
  const handleOfflineEvent = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener("online", handleOnlineEvent);
    window.addEventListener("offline", handleOfflineEvent);

    return () => {
      window.removeEventListener("online", handleOnlineEvent);
      window.removeEventListener("offline", handleOfflineEvent);
    };
  }, [isOnline]);

  return isOnline;
};
