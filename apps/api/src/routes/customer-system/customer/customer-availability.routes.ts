import { Router } from "express";
import { Venue } from "@/models/venue.model";
import { Booking } from "@/models/booking";

const router = Router();

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
router.post("/check-availability", async (req, res, next) => {
  try {
    const { venueId, date, from, to } = req.body;

    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({
        available: false,
        reason: "Venue not found",
      });
    }

    const requestedFrom = toMinutes(from);
    const requestedTo = toMinutes(to);

    const slot = venue.availability?.find((a) => {
      const availDateStr = new Date(a.date).toISOString().split("T")[0];
      return (
        availDateStr === date &&
        toMinutes(a.from) <= requestedFrom &&
        toMinutes(a.to) >= requestedTo
      );
    });

    if (!slot) {
      return res.json({
        available: false,
        reason: "Not in venue availability",
      });
    }

    const getDateString = (dateField: any): string => {
      if (!dateField) return "";
      if (dateField instanceof Date) {
        return dateField.toISOString().split("T")[0];
      }
      if (typeof dateField === "string") {
        return dateField.split("T")[0];
      }
      return "";
    };

    const bookings = await Booking.find({
      venueId: venueId,
      isDeleted: false,
    }).lean();

    console.log(`Total bookings for venue ${venueId}: ${bookings.length}`);

    const targetDate = date; // "2026-06-21"

    const bookingsOnTargetDate = bookings.filter((booking) => {
      const bookingDateStr = getDateString(booking.date);
      return bookingDateStr === targetDate;
    });

    console.log(
      `Found ${bookingsOnTargetDate.length} bookings on ${targetDate}`,
    );

    // فحص التعارض
    const hasConflict = bookingsOnTargetDate.some((booking) => {
      if (!booking.timePeriod || booking.timePeriod.length === 0) {
        return false;
      }

      return booking.timePeriod.some((period) => {
        const existingFrom = toMinutes(period.from);
        const existingTo = toMinutes(period.to);

        const overlap = !(
          requestedTo <= existingFrom || requestedFrom >= existingTo
        );

        if (overlap) {
          console.log(
            `CONFLICT! Requested ${from}-${to} conflicts with existing ${period.from}-${period.to}`,
          );
        }

        return overlap;
      });
    });

    if (hasConflict) {
      return res.json({
        available: false,
        reason: "This time slot is already booked",
      });
    }

    return res.json({ available: true });
  } catch (error) {
    console.error("Error in check-availability:", error);
    next(error);
  }
});

export const customerAvailabilityRoutes = router;
