import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 194,
});

export const jobsAtom = atom({
  key: "jobsAtom",
  default: 0,
});

export const messagingAtom = atom({
  key: "messagingAtom",
  default: 0,
});

export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: 14,
});

export const profileNotificationCountSelector = selector({
  key: "profileNotificationCountSelector",
  get: ({ get }) => {
    const networkNotificationCount = get(networkAtom);
    const jobsNotificationCount = get(jobsAtom);
    const messagingNotificationCount = get(messagingAtom);
    const notificationCount = get(notificationsAtom);

    return (
      networkNotificationCount +
      jobsNotificationCount +
      messagingNotificationCount +
      notificationCount
    );
  },
});
