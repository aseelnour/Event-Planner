import { Router } from "express";

import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { adminVenueServices } from "../../../services/admin-system/admin/venues.services";

import {
  ClientIdParamSchema,
  CreateVenueInput,
  CreateVenueSchema,
  UpdateVenueInput,
  UpdateVenueSchema,
  VenueIdParamSchema,
} from "../../../validation/admin-system/venues.schemas";

const router = Router();

router.get("/", requireAdminAuth, async (req, res, next) => {
  try {
    const venues = await adminVenueServices.getAllVenues();
    res.status(200).json(venues);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

router.get(
  "/:id",
  validateRequest({ params: VenueIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const venue = await adminVenueServices.getVenueById(req.params.id);
      res.status(200).json(venue);
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "Venue not found") {
        res.status(404).json({ error: "Venue not found" });
        return;
      }
      next(error);
      return;
    }
  },
);

router.get(
  "/client/:clientId",
  validateRequest({ params: ClientIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const venues = await adminVenueServices.getVenuesByClientId(
        req.params.clientId,
      );
      res.status(200).json(venues);
      return;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "No venues found for this client"
      ) {
        res.status(404).json({ error: "No venues found for this client" });
        return;
      }
      next(error);
      return;
    }
  },
);

router.post(
  "/",
  validateRequest({ body: CreateVenueSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const {
        clientId,
        title,
        description,
        location,
        price,
        images,
        extras,
        availability,
        discounts,
      } = req.body as CreateVenueInput;

      const venue = await adminVenueServices.createVenue({
        clientId,
        title,
        description,
        location,
        price,
        images,
        extras,
        availability,
        discounts,
      });
      res.status(201).json(venue);
      return;
    } catch (error) {
      next(error);
      return;
    }
  },
);

router.patch(
  "/:id",
  validateRequest({ params: VenueIdParamSchema, body: UpdateVenueSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const {
        title,
        description,
        location,
        price,
        images,
        extras,
        availability,
        discounts,
      } = req.body as UpdateVenueInput;

      const venue = await adminVenueServices.updateVenue(req.params.id, {
        title,
        description,
        location,
        price,
        images,
        extras,
        availability,
        discounts,
      });
      res.status(200).json(venue);
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "Venue not found") {
        res.status(404).json({ error: "Venue not found" });
        return;
      }
      next(error);
      return;
    }
  },
);

router.delete(
  "/:id",
  validateRequest({ params: VenueIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      await adminVenueServices.deleteVenue(req.params.id);
      res.status(200).json({ message: "Venue deleted successfully" });
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "Venue not found") {
        res.status(404).json({ error: "Venue not found" });
        return;
      }
      next(error);
      return;
    }
  },
);

export const adminVenueRoutes = router;
