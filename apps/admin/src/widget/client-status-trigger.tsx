import type { ClientStatusValue } from "@/api/clients.api";
import type { ClientRow } from "@/widget/client-status-modal";
import { normalizeClientStatus } from "@/widget/client-status-shared";
import { useTranslation } from "react-i18next";

function ChevronIcon() {
	return (
		<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	);
}

type BadgeConfig = {
	dot: string;
	pill: string;
	labelKey: string;
};

const BADGE_BY_STATUS: Record<ClientStatusValue, BadgeConfig> = {
	"waiting-approve": {
		dot: "bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.25)]",
		pill: "border-amber-200/90 bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-900",
		labelKey: "clientsPage.badges.waiting",
	},
	approved: {
		dot: "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]",
		pill: "border-emerald-200/90 bg-gradient-to-br from-emerald-50 to-emerald-100/70 text-emerald-900",
		labelKey: "clientsPage.badges.approved",
	},
	banned: {
		dot: "bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.2)]",
		pill: "border-rose-200/90 bg-gradient-to-br from-rose-50 to-rose-100/70 text-rose-900",
		labelKey: "clientsPage.badges.banned",
	},
};

type Props = {
	client: ClientRow;
	onOpen: () => void;
	isUpdating: boolean;
	updateFailed: boolean;
};

export function ClientStatusTrigger({ client, onOpen, isUpdating, updateFailed }: Props) {
	const { t, i18n } = useTranslation();
	const s = normalizeClientStatus(client.status);
	const cfg = BADGE_BY_STATUS[s];
	const isRtl = i18n.dir() === "rtl";

	return (
		<div className="flex flex-col gap-1.5">
			<div className="inline-flex items-center gap-1">
				<button
					type="button"
					onClick={onOpen}
					disabled={isUpdating}
					className={`group inline-flex max-w-full items-center gap-0.5 rounded-2xl border border-gray-200/90 bg-white p-1 shadow-sm transition hover:border-indigo-200 hover:shadow-md disabled:pointer-events-none disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`}
				>
					<span
						className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold ${cfg.pill}`}
					>
						<span className={`h-2 w-2 shrink-0 rounded-full ${cfg.dot}`} />
						{t(cfg.labelKey)}
					</span>
					<span
						className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition group-hover:bg-indigo-50 group-hover:text-indigo-600"
						aria-hidden
					>
						<ChevronIcon />
					</span>
				</button>
				{isUpdating && (
					<span className="inline-flex h-8 w-8 items-center justify-center" aria-label={t("clientsPage.statusModal.saving")}>
						<svg className="h-5 w-5 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					</span>
				)}
			</div>
			{updateFailed && !isUpdating && (
				<p className="max-w-[14rem] text-xs text-red-600">{t("clientsPage.statusModal.inlineFailed")}</p>
			)}
		</div>
	);
}
