import type { ClientStatusValue } from "@/api/clients.api";

export function normalizeClientStatus(raw?: string): ClientStatusValue {
	const v = (raw ?? "waiting-approve").toLowerCase();
	if (v === "approved") return "approved";
	if (v === "banned" || v === "banded") return "banned";
	return "waiting-approve";
}
