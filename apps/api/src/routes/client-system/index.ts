import { Router } from "express";
import { clientAuthRoutes } from "./client/auth.routes";
import { clientManageMessagesRoutes } from "./client/manage-messages.routes";
import { clientBookingRoutes } from "./bookings/booking.route";
import { clientManageVenueRoutes } from "./client/manage-venues.routes";
import { clientUploadRoutes } from "./client/upload.routes";
import dashboardRoutes from "./overview/overview.route";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/client/manage-messages", clientManageMessagesRoutes);
router.use("/client/manage-venues", clientManageVenueRoutes);
router.use("/client/upload", clientUploadRoutes);
router.use("/bookings", clientBookingRoutes);
router.use("/dashboard", dashboardRoutes);

export const clientSystemRoutes = router;
