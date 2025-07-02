import { useRecoilValue } from "recoil";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationsAtom,
  profileNotificationCountSelector,
} from "../store/atoms/topbar-atoms-static";

export const TopBar = () => {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const messagingNotificationCount = useRecoilValue(messagingAtom);
  const notificationCount = useRecoilValue(notificationsAtom);

  const profileNotificationCount = useRecoilValue(
    profileNotificationCountSelector
  );

  return (
    <div>
      <button>Home</button>

      <button>
        My Network
        <b>
          ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
        </b>
      </button>
      <button>
        Jobs
        <b>({jobsNotificationCount >= 100 ? "99+" : jobsNotificationCount})</b>
      </button>
      <button>
        Messaging
        <b>
          (
          {messagingNotificationCount >= 100
            ? "99+"
            : messagingNotificationCount}
          )
        </b>
      </button>
      <button>
        Notifications
        <b>({notificationCount >= 100 ? "99+" : notificationCount})</b>
      </button>

      <button>
        Me <b>({profileNotificationCount})</b>
      </button>
    </div>
  );
}