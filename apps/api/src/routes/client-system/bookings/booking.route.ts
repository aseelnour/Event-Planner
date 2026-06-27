import { Router } from "express";

import { requireClientAuth } from "../../../middlewares/require-client-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { clientBookingService } from "../../../services/client-system/bookings/booking.service";
import {
	BookingIdParamSchema,
	StatusQuerySchema,
	UpdateBookingStatusSchema,
} from "../../../validation/client-system/booking.schemas";

const router = Router();

router.use(requireClientAuth);

router.get(
	"/",
	validateRequest({ query: StatusQuerySchema }),
	async (req, res, next) => {
		try {
			const clientId = req.client!.id;
			const status = req.query.status as
				| Parameters<typeof clientBookingService.getBookingsForClient>[1]
				| undefined;

			const bookings = await clientBookingService.getBookingsForClient(
				clientId,
				status,
			);

			res.json(bookings);
		} catch (error) {
			next(error);
		}
	},
);

router.get(
	"/:id",
	validateRequest({ params: BookingIdParamSchema }),
	async (req, res, next) => {
		try {
			const clientId = req.client!.id;
			const booking = await clientBookingService.getBookingByIdForClient(
				req.params.id,
				clientId,
			);

			if (!booking) {
				res.status(404).json({ error: "Booking not found" });
				return;
			}

			res.json(booking);
		} catch (error) {
			next(error);
		}
	},
);

router.patch(
	"/:id/status",
	validateRequest({
		params: BookingIdParamSchema,
		body: UpdateBookingStatusSchema,
	}),
	async (req, res, next) => {
		try {
			const clientId = req.client!.id;
			const { status } = req.body as { status: Parameters<
				typeof clientBookingService.updateBookingStatusForClient
			>[2] };

			const updated =
				await clientBookingService.updateBookingStatusForClient(
					req.params.id,
					clientId,
					status,
				);

			if (!updated) {
				res.status(404).json({ error: "Booking not found" });
				return;
			}

			res.json(updated);
		} catch (error) {
			next(error);
		}
	},
);

export const clientBookingRoutes = router;
