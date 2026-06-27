import { Router } from "express";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { requireClientAuth } from "../../../middlewares/require-client-auth.middleware";
import { clientManageVenueServices } from "../../../services/client-system/client/manage-venues.services";
import {
	CreateManageVenueInput,
	CreateManageVenueSchema,
	ManageVenueClientIdParamSchema,
	ManageVenueIdParamSchema,
	UpdateManageVenueInput,
	UpdateManageVenueSchema,
} from "../../../validation/client-system/manage-venues.schemas";

const router = Router();

router.get("/", requireClientAuth, async (_req, res, next) => {
	try {
		const venues = await clientManageVenueServices.getAllManageVenues();
		res.status(200).json(venues);
		return;
	} catch (error) {
		next(error);
		return;
	}
});

router.get(
	"/client/:clientId",
	validateRequest({ params: ManageVenueClientIdParamSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const venues =
				await clientManageVenueServices.getManageVenuesByClientId(
					req.params.clientId,
				);
			res.status(200).json(venues);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.get(
	"/:id",
	validateRequest({ params: ManageVenueIdParamSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const venue = await clientManageVenueServices.getManageVenueById(
				req.params.id,
			);
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

router.post(
	"/",
	validateRequest({ body: CreateManageVenueSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const venue =
				await clientManageVenueServices.createManageVenue(
					req.body as CreateManageVenueInput,
				);
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
	validateRequest({
		params: ManageVenueIdParamSchema,
		body: UpdateManageVenueSchema,
	}),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const venue = await clientManageVenueServices.updateManageVenue(
				req.params.id,
				req.body as UpdateManageVenueInput,
			);
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
	validateRequest({ params: ManageVenueIdParamSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			await clientManageVenueServices.deleteManageVenue(req.params.id);
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

export const clientManageVenueRoutes = router;
