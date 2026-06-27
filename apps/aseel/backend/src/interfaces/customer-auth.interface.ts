import { ActorEnum } from "../enums/actor";

export interface CustomerAuthPayload {
  id: string;
  email: string;
  actorType: ActorEnum;
}

// تعديل نوع الـ Request الخاص بـ Express ليتعرف على كائن الـ customer المحقون
declare global {
  namespace Express {
    interface Request {
      customer?: CustomerAuthPayload;
    }
  }
}
