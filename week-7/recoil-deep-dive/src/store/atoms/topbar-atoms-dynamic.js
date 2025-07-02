import { atom, selector } from "recoil";
import axios from 'axios';

export const notifications = atom({
  key: "notificationsAtom",
  default: selector({
    key: "notificationsSelector",
    get: async () => {
        const res = await axios.get("http://localhost:8080/notifications")
        return res.data
    }
  })
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const notification = get(notifications);

    return (
      notification.network +
      notification.jobs +
      notification.messaging +
      notification.notifications
    );
  },
});
