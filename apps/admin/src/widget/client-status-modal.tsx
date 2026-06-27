import { Modal } from "@/components/modal";
import type { ClientStatusValue } from "@/api/clients.api";
import { normalizeClientStatus } from "@/widget/client-status-shared";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type ClientRow = {
	_id: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	status?: string;
	createdAt?: string;
};

const OPTIONS: {
	value: ClientStatusValue;
	icon: "clock" | "check" | "ban";
	idle: string;
	selected: string;
	titleKey: string;
	descKey: string;
}[] = [
	{
		value: "waiting-approve",
		icon: "clock",
		idle: "border-amber-200/90 bg-amber-50/70 hover:border-amber-300",
		selected: "border-amber-500 bg-amber-50 ring-2 ring-amber-200 ring-offset-2 ring-offset-white",
		titleKey: "clientsPage.statusModal.options.waitingTitle",
		descKey: "clientsPage.statusModal.options.waitingDesc",
	},
	{
		value: "approved",
		icon: "check",
		idle: "border-emerald-200/90 bg-emerald-50/70 hover:border-emerald-300",
		selected: "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200 ring-offset-2 ring-offset-white",
		titleKey: "clientsPage.statusModal.options.approvedTitle",
		descKey: "clientsPage.statusModal.options.approvedDesc",
	},
	{
		value: "banned",
		icon: "ban",
		idle: "border-rose-200/90 bg-rose-50/70 hover:border-rose-300",
		selected: "border-rose-500 bg-rose-50 ring-2 ring-rose-200 ring-offset-2 ring-offset-white",
		titleKey: "clientsPage.statusModal.options.bannedTitle",
		descKey: "clientsPage.statusModal.options.bannedDesc",
	},
];

function OptionIcon({ name }: { name: "clock" | "check" | "ban" }) {
	const cls = "h-6 w-6 shrink-0";
	if (name === "clock") {
		return (
			<svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		);
	}
	if (name === "check") {
		return (
			<svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		);
	}
	return (
		<svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
		</svg>
	);
}

type Props = {
	client: ClientRow | null;
	open: boolean;
	onClose: () => void;
	onApply: (status: ClientStatusValue) => void;
	isUpdating: boolean;
	updateFailed: boolean;
};

export function ClientStatusModal({
	client,
	open,
	onClose,
	onApply,
	isUpdating,
	updateFailed,
}: Props) {
	const { t } = useTranslation();
	const [selected, setSelected] = useState<ClientStatusValue>("waiting-approve");

	useEffect(() => {
		if (open && client) {
			setSelected(normalizeClientStatus(client.status));
		}
	}, [open, client?._id, client?.status]);

	if (!client) {
		return null;
	}

	const current = normalizeClientStatus(client.status);
	const unchanged = selected === current;
	const displayName = client.fullName?.trim() || t("clientsPage.statusModal.unknownUser");

	return (
		<Modal
			open={open}
			onClose={onClose}
			closeDisabled={isUpdating}
			title={t("clientsPage.statusModal.title")}
			description={t("clientsPage.statusModal.subtitle")}
			icon={
				<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
				</svg>
			}
			footer={
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					{updateFailed && (
						<p className="text-sm text-red-600 sm:order-first">{t("clientsPage.statusModal.updateFailed")}</p>
					)}
					<div className="flex justify-end gap-2 sm:ms-auto">
						<button
							type="button"
							disabled={isUpdating}
							onClick={onClose}
							className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
						>
							{t("clientsPage.statusModal.cancel")}
						</button>
						<button
							type="button"
							disabled={isUpdating || unchanged}
							onClick={() => onApply(selected)}
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-45"
						>
							{isUpdating && (
								<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
							)}
							{t("clientsPage.statusModal.apply")}
						</button>
					</div>
				</div>
			}
		>
			<div className="mb-5 rounded-xl border border-indigo-100/80 bg-indigo-50/50 px-4 py-3">
				<p className="text-xs font-medium uppercase tracking-wide text-indigo-600/90">{t("clientsPage.statusModal.clientLabel")}</p>
				<p className="mt-1 font-semibold text-gray-900">{displayName}</p>
				<p className="truncate text-sm text-gray-500">{client.email ?? "—"}</p>
			</div>

			<p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{t("clientsPage.statusModal.pickLabel")}</p>
			<div className="flex flex-col gap-3">
				{OPTIONS.map((opt) => {
					const isSel = selected === opt.value;
					return (
						<button
							key={opt.value}
							type="button"
							onClick={() => setSelected(opt.value)}
							disabled={isUpdating}
							className={`flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-start text-gray-900 transition disabled:opacity-60 ${isSel ? opt.selected : opt.idle}`}
						>
							<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-black/5">
								<OptionIcon name={opt.icon} />
							</span>
							<span className="min-w-0 pt-0.5">
								<span className="block font-semibold text-gray-900">{t(opt.titleKey)}</span>
								<span className="mt-0.5 block text-sm leading-snug text-gray-600">{t(opt.descKey)}</span>
							</span>
						</button>
					);
				})}
			</div>
		</Modal>
	);
}
