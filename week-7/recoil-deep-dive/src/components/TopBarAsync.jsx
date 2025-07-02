import {
    notifications,
    totalNotificationSelector,
} from "../store/atoms/topbar-atoms-dynamic";
import { useRecoilState, useRecoilValue } from "recoil";

export const TopBar = () => {
  const [notificationsCount, setNotificationsCount] =
    useRecoilState(notifications);
  const totalNotificationsCount = useRecoilValue(totalNotificationSelector);

  const getNotificationValue = (num) => {
    return num >= 100 ? "99+" : num;
  };

  return (
    <div>
      <button>Home</button>

      <button>
        My Network <b>({getNotificationValue(notificationsCount.network)})</b>
      </button>
      <button>
        Jobs <b>({getNotificationValue(notificationsCount.jobs)})</b>
      </button>
      <button>
        Messaging <b>({getNotificationValue(notificationsCount.messaging)})</b>
      </button>
      <button>
        Notifications{" "}
        <b>({getNotificationValue(notificationsCount.notifications)})</b>
      </button>

      <button>
        Me <b>({totalNotificationsCount})</b>
      </button>
    </div>
  );
};
