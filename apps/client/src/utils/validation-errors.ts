/**
 * Flattens API validation payloads from `validateRequest` (Zod treeifyError shape).
 * Collects every string listed under `errors` arrays at any depth.
 */
export function extractValidationMessages(details: unknown): string[] {
	const messages: string[] = [];

	const visit = (node: unknown): void => {
		if (node === null || node === undefined) {
			return;
		}
		if (Array.isArray(node)) {
			for (const item of node) {
				visit(item);
			}
			return;
		}
		if (typeof node !== "object") {
			return;
		}
		const obj = node as Record<string, unknown>;
		const errs = obj.errors;
		if (Array.isArray(errs)) {
			for (const item of errs) {
				if (typeof item === "string") {
					messages.push(item);
				}
			}
		}
		for (const [key, value] of Object.entries(obj)) {
			if (key === "errors") {
				continue;
			}
			visit(value);
		}
	};

	visit(details);
	return messages;
}

export type ApiValidationErrorBody = {
	error?: string;
	details?: unknown;
};

export function getValidationMessagesFromAxiosData(
	data: unknown,
): string[] | null {
	if (!data || typeof data !== "object") {
		return null;
	}
	const body = data as ApiValidationErrorBody;
	if (body.details !== undefined) {
		const msgs = extractValidationMessages(body.details);
		if (msgs.length > 0) {
			return msgs;
		}
	}
	return null;
}
