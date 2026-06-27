import { Customer } from "../../../models/customer.model";
import type {
	CreateCustomerInput,
	UpdateCustomerInput,
} from "../../../validation/admin-system/customer.schemas";

export async function getAllCustomers() {
	return await Customer.find({ isDeleted: false });
}

export async function getCustomerById(id: string) {
	const customer = await Customer.findOne({ _id: id, isDeleted: false });
	if (!customer) {
		throw new Error("Customer not found");
	}
	return customer;
}

export async function createCustomer(data: CreateCustomerInput) {
	const customer = new Customer(data);
	return await customer.save();
}

export async function updateCustomer(id: string, data: UpdateCustomerInput) {
	const customer = await Customer.findOneAndUpdate(
		{ _id: id, isDeleted: false },
		data,
		{ new: true },
	);
	if (!customer) {
		throw new Error("Customer not found");
	}
	return customer;
}

export async function deleteCustomer(id: string) {
	const customer = await Customer.findOneAndUpdate(
		{ _id: id, isDeleted: false },
		{ isDeleted: true },
		{ new: true },
	);
	if (!customer) {
		throw new Error("Customer not found");
	}
	return customer;
}