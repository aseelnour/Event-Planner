export interface IAdmin {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
