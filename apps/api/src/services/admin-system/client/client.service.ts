import { Client } from "../../../models/client.model";
import { IClient } from "../../../interfaces/models/client.interface";
import { ClientStatusEnum } from "../../../enums/models/client.status";

export async function createClient(data: Partial<IClient>) {
  const client = new Client(data);
  return await client.save();
}

export async function getAllClients() {
  return await Client.find({ isDeleted: false });
}

export async function getClientById(clientId: string) {
  const client = await Client.findOne({
    _id: clientId,
    isDeleted: false,
  });
  if (!client) {
    throw new Error("Client not found");
  }
  return client;
}

export async function updateClientStatus(
  clientId: string,
  status: ClientStatusEnum,
) {
  const client = await Client.findByIdAndUpdate(
    { _id: clientId, isDeleted: false },
    { status },
    { new: true },
  );
  if (!client) {
    throw new Error("Client not found");
  }
  return client;
}

export async function deleteClient(clientId: string) {
  const client = await Client.findByIdAndUpdate(
    clientId,
    { isDeleted: true },
    { new: true },
  );

  if (!client) {
    throw new Error("Client not found");
  }

  return client;
}


export const adminClientServices = {
  createClient,
  getAllClients,
  getClientById,
  updateClientStatus,
  deleteClient,
};