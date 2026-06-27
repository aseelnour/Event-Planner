import { Router } from "express";

import { customerAuthRoutes } from "./customer/auth.routes";
import { customerRegisterRoutes } from "./customer/customer-register.routes";
import { customerAvailabilityRoutes } from "./customer/customer-availability.routes";
const router = Router();

router.use("/customer", customerRegisterRoutes);
router.use("/customer", customerAuthRoutes);
router.use("/customer/venues", customerAvailabilityRoutes);

export const customerSystemRoutes = router;
