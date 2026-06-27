import { ClientStatusEnum } from "../../enums/models/client.status";

export interface IClient {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  status: ClientStatusEnum;
  isDeleted?: boolean;
}
