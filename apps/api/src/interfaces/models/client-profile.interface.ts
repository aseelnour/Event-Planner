export interface IClientProfileContactInformation {
  name: string;
  phone: string;
}

export interface IClientProfile {
  _id: string;
  clientId: string;
  address: string;
  description: string;
  mapURL: string;
  contactInformation: IClientProfileContactInformation[];
  logo: string;
  coverImage: string;
}
