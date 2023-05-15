import { NotificationType } from "../../../types";

type NotificationsType = {
    readed: NotificationType[],
    unreaded: NotificationType[],
}

export type NotificationSliceType = {
    notifications: NotificationsType
};