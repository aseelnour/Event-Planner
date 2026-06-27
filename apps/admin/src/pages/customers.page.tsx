import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCustomers } from "@/hooks/use-customers";

interface Customer {
	_id: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	gender?: "male" | "female" | string;
	dob?: string;
	city?: string;
	createdAt?: string;
}

const mockCustomers: Customer[] = [
	{
		_id: "customer-mock-1",
		fullName: "Sarah Johnson",
		email: "sarah.j@example.com",
		phoneNumber: "+1 555 0190",
		gender: "female",
		dob: "1995-04-12",
		city: "Manhattan",
		createdAt: "2026-01-15T00:00:00.000Z",
	},
	{
		_id: "customer-mock-2",
		fullName: "Emily Davis",
		email: "emily.d@example.com",
		phoneNumber: "+1 555 0264",
		gender: "female",
		dob: "1992-09-30",
		city: "Brooklyn",
		createdAt: "2026-03-12T00:00:00.000Z",
	},
	{
		_id: "customer-mock-3",
		fullName: "Lisa Anderson",
		email: "lisa.a@example.com",
		phoneNumber: "+1 555 0357",
		gender: "female",
		dob: "1988-12-05",
		city: "Queens",
		createdAt: "2026-04-05T00:00:00.000Z",
	},
];

const getInitials = (name?: string) => {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/);
	const first = parts[0]?.[0] ?? "";
	const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
	return (first + last).toUpperCase();
};

export const CustomersPage = () => {
	const { t, i18n } = useTranslation();
	const { data, isLoading, isError } = useCustomers();
	const [search, setSearch] = useState("");
	const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">(
		"all"
	);

	const formatDate = (value?: string) => {
		if (!value) return t("common.dash");
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return t("common.dash");
		return date.toLocaleDateString(i18n.language, {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const formatGender = (gender?: string) => {
		if (!gender) return t("common.dash");
		const g = gender.toLowerCase();
		if (g === "male") return t("customersPage.genderValue.male");
		if (g === "female") return t("customersPage.genderValue.female");
		return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
	};

	const customers = useMemo<Customer[]>(() => {
		const list = (data ?? []).map((c: Record<string, unknown>) => ({
			_id: String(c._id ?? c.id ?? ""),
			fullName: c.fullName ?? c.name,
			email: c.email as string | undefined,
			phoneNumber: c.phoneNumber as string | undefined,
			gender: c.gender as string | undefined,
			dob: c.dob as string | undefined,
			city: c.city as string | undefined,
			createdAt: c.createdAt as string | undefined,
		}));
		return list.length ? list : mockCustomers;
	}, [data]);

	const filtered = customers.filter((c) => {
		const matchesSearch = search
			? `${c.fullName ?? ""} ${c.email ?? ""}`
					.toLowerCase()
					.includes(search.toLowerCase())
			: true;
		const matchesGender =
			genderFilter === "all"
				? true
				: (c.gender ?? "").toLowerCase() === genderFilter;
		return matchesSearch && matchesGender;
	});

	return (
		<div className="space-y-6">
			<header>
				<h2 className="text-2xl font-bold text-gray-900">{t("customersPage.title")}</h2>
				<p className="text-sm text-gray-500">{t("customersPage.subtitle")}</p>
			</header>

			<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
					<div className="flex-1">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={t("customersPage.searchPlaceholder")}
							className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
						/>
					</div>
					<select
						value={genderFilter}
						onChange={(e) =>
							setGenderFilter(
								e.target.value as typeof genderFilter
							)
						}
						className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
					>
						<option value="all">{t("customersPage.filter.allGenders")}</option>
						<option value="male">{t("customersPage.filter.male")}</option>
						<option value="female">{t("customersPage.filter.female")}</option>
					</select>
				</div>

				<div className="overflow-x-auto">
					<table
						dir={i18n.dir()}
						className="w-full border-collapse text-sm"
					>
						<thead>
							<tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
								<th className="py-3 px-4 font-medium ltr:text-left rtl:text-right">
									{t("customersPage.table.customer")}
								</th>
								<th className="py-3 px-4 font-medium ltr:text-left rtl:text-right">{t("customersPage.table.phone")}</th>
								<th className="py-3 px-4 font-medium ltr:text-left rtl:text-right">
									{t("customersPage.table.gender")}
								</th>
								<th className="py-3 px-4 font-medium ltr:text-left rtl:text-right">{t("customersPage.table.dob")}</th>
								<th className="py-3 px-4 font-medium ltr:text-left rtl:text-right">{t("customersPage.table.city")}</th>
								<th className="py-3 px-4 font-medium ltr:text-left rtl:text-right">
									{t("customersPage.table.joinDate")}
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-gray-500"
									>
										{t("customersPage.loading")}
									</td>
								</tr>
							)}
							{isError && !isLoading && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-red-500"
									>
										{t("customersPage.loadError")}
									</td>
								</tr>
							)}
							{!isLoading &&
								filtered.map((customer) => (
									<tr
										key={customer._id}
										className="border-b border-gray-50 last:border-0"
									>
										<td className="py-4 px-4 align-middle ltr:text-left rtl:text-right">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
													{getInitials(
														customer.fullName
													)}
												</div>
												<div>
													<p className="font-semibold text-gray-900">
														{customer.fullName ??
															t("common.unknown")}
													</p>
													<p className="text-xs text-gray-500">
														{customer.email ?? t("common.dash")}
													</p>
												</div>
											</div>
										</td>
										<td className="py-4 px-4 align-middle text-gray-700 ltr:text-left rtl:text-right">
											{customer.phoneNumber ?? t("common.dash")}
										</td>
										<td className="py-4 px-4 align-middle text-gray-700 ltr:text-left rtl:text-right">
											{formatGender(customer.gender)}
										</td>
										<td className="py-4 px-4 align-middle text-gray-700 ltr:text-left rtl:text-right">
											{formatDate(customer.dob)}
										</td>
										<td className="py-4 px-4 align-middle text-gray-700 ltr:text-left rtl:text-right">
											{customer.city ?? t("common.dash")}
										</td>
										<td className="py-4 px-4 align-middle text-gray-700 ltr:text-left rtl:text-right">
											{formatDate(customer.createdAt)}
										</td>
									</tr>
								))}
							{!isLoading && filtered.length === 0 && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-gray-500"
									>
										{t("customersPage.empty")}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
