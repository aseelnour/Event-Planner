export type BookingStatus = "pending" | "approved" | "declined";

export interface BookingTimePeriod {
	from: string;
	to: string;
}

export interface BookingCustomer {
	_id: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
}

export interface BookingVenue {
	_id: string;
	title?: string;
	location?: string;
	price?: string;
}

export interface Booking {
	_id: string;
	clientId: string;
	venueId: string | BookingVenue;
	customerId: string | BookingCustomer;
	date: string;
	status: BookingStatus;
	timePeriod: BookingTimePeriod[];
}
