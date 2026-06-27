import { Router } from "express";
import { requireClientAuth } from "../../../middlewares/require-client-auth.middleware";
import { clientManageVenueServices } from "../../../services/client-system/client/manage-venues.services";

const router = Router();

router.post("/signature", requireClientAuth, async (req, res, next) => {
	try {
		const signature =
			await clientManageVenueServices.getCloudinarySignature();
		res.status(200).json(signature);
	} catch (error) {
		next(error);
	}
});

export const clientUploadRoutes = router;
