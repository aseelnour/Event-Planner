import { type HydratedDocument } from "mongoose";

import { INotification } from "./notification.interface";

export interface NotificationDocument extends HydratedDocument<INotification> {}
