import { Router } from "express";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import {
  CreateBookingSchema,
  UpdateBookingSchema,
  BookingIdParamSchema,
  ClientIdParamSchema,
  VenueIdParamSchema,
  CustomerIdParamSchema,
  StatusParamSchema,
  StatusQuerySchema,
} from "../../../validation/admin-system/booking.schemas";
import { bookingService } from "../../../services/admin-system/bookings/booking.service";
const router = Router();

router.get(
  "/",
  validateRequest({ query: StatusQuerySchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const bookings = await bookingService.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.get(
  "/client/:clientId",
  validateRequest({ params: ClientIdParamSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const bookings = await bookingService.getBookingsByClientId(
        parseInt(req.params.clientId),
      );
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.get(
  "/customer/:customerId",
  validateRequest({ params: CustomerIdParamSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const bookings = await bookingService.getBookingsByCustomerId(
        parseInt(req.params.customerId),
      );
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.get(
  "/venue/:venueId",
  validateRequest({ params: VenueIdParamSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const bookings = await bookingService.getBookingsByVenueId(
        parseInt(req.params.venueId),
      );
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.get(
  "/status/:status",
  validateRequest({ params: StatusParamSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const bookings = await bookingService.getBookingsByStatus(
        req.params.status as any,
      );
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.get(
  "/:id",
  validateRequest({ params: BookingIdParamSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const booking = await bookingService.getBookingById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.post(
  "/",
  validateRequest({ body: CreateBookingSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const newBooking = await bookingService.createBooking(req.body);
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.put(
  "/:id",
  validateRequest({ params: BookingIdParamSchema, body: UpdateBookingSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const updatedBooking = await bookingService.updateBooking(
        req.params.id,
        req.body,
      );

      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      const safeBooking = {
        id: updatedBooking._id,
        clientId: updatedBooking.clientId,
        venueId: updatedBooking.venueId,
        customerId: updatedBooking.customerId,
        date: updatedBooking.date,
        status: updatedBooking.status,
        timePeriod: updatedBooking.timePeriod,
      };

      res.json(safeBooking);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.delete(
  "/:id",
  validateRequest({ params: BookingIdParamSchema }),
  requireAdminAuth,
  async (req, res) => {
    try {
      const deletedBooking = await bookingService.deleteBooking(req.params.id);
      if (!deletedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json({ message: "Booking soft deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
export const bookingRoutes = router;
