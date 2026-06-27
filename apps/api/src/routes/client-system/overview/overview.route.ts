//http://localhost:3000/api/client-system/dashboard/overview
import express from "express";
import { getOverview } from "@/services/client-system/overview/overview.service";
import { requireClientAuth } from "@/middlewares/require-client-auth.middleware";
const router = express.Router();

router.get("/overview", requireClientAuth, getOverview);

export default router;
