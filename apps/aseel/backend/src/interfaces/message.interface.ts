export interface IMessage {
  _id: string;
  senderId: string;
  actorType: string;
  message: string;
  timestamp: Date;
  threadId: string;
  venueId?: string;
  status: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
