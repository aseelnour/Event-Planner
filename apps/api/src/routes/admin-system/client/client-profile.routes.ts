import { type Response, Router } from "express";

import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import {
	createClientProfile,
	deleteClientProfile,
	getClientProfileByClientId,
	getClientProfileById,
	getClientProfiles,
	updateClientProfile,
} from "../../../services/admin-system/client/client-profile.services";
import {
	ClientIdParamsSchema,
	ClientProfileIdParamsSchema,
	CreateClientProfileSchema,
	UpdateClientProfileSchema,
} from "../../../validation/admin-system/client-profile.schemas";

const router = Router();

function handleClientProfileError(error: unknown, res: Response): boolean {
	if (!(error instanceof Error)) {
		return false;
	}

	if (error.message === "Forbidden") {
		res.status(403).json({ error: "Forbidden" });
		return true;
	}
	if (
		error.message === "Client not found" ||
		error.message === "Client profile not found"
	) {
		res.status(404).json({ error: error.message });
		return true;
	}
	if (error.message === "Client profile already exists") {
		res.status(409).json({ error: error.message });
		return true;
	}
	if (error.message.startsWith("Invalid ")) {
		res.status(400).json({ error: error.message });
		return true;
	}
	return false;
}

router.use(requireAdminAuth);

router.post(
	"/client-profiles",
	validateRequest({ body: CreateClientProfileSchema }),
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const profile = await createClientProfile(req.admin, req.body);
			res.status(201).json(profile);
		} catch (error) {
			if (handleClientProfileError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

router.get("/client-profiles", async (req, res, next) => {
	try {
		if (!req.admin) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const profiles = await getClientProfiles(req.admin);
		res.status(200).json(profiles);
	} catch (error) {
		if (handleClientProfileError(error, res)) {
			return;
		}
		next(error);
	}
});

router.get(
	"/client-profiles/:profileId",
	validateRequest({ params: ClientProfileIdParamsSchema }),
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { profileId } = req.params as { profileId: string };
			const profile = await getClientProfileById(req.admin, profileId);
			res.status(200).json(profile);
		} catch (error) {
			if (handleClientProfileError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

router.get(
	"/clients/:clientId/profile",
	validateRequest({ params: ClientIdParamsSchema }),
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { clientId } = req.params as { clientId: string };
			const profile = await getClientProfileByClientId(
				req.admin,
				clientId,
			);
			res.status(200).json(profile);
		} catch (error) {
			if (handleClientProfileError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

router.patch(
	"/client-profiles/:profileId",
	validateRequest({
		params: ClientProfileIdParamsSchema,
		body: UpdateClientProfileSchema,
	}),
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { profileId } = req.params as { profileId: string };
			const profile = await updateClientProfile(
				req.admin,
				profileId,
				req.body,
			);
			res.status(200).json(profile);
		} catch (error) {
			if (handleClientProfileError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

router.delete(
	"/client-profiles/:profileId",
	validateRequest({ params: ClientProfileIdParamsSchema }),
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { profileId } = req.params as { profileId: string };
			await deleteClientProfile(req.admin, profileId);
			res.status(204).send();
		} catch (error) {
			if (handleClientProfileError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

export const clientProfileRoutes = router;
