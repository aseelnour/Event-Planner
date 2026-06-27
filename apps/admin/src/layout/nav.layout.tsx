import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navItems = [
	{
		key: "analytics",
		to: "/dashboard/analytics",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 13h4v8H3v-8zm6-5h4v13H9V8zm6-4h4v17h-4V4z"
				/>
			</svg>
		),
	},
	{
		key: "users",
		to: "/dashboard/users",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M17 20h5v-1a4 4 0 00-5.477-3.72M17 20H7m10 0v-1c0-.656-.126-1.283-.356-1.857M7 20H2v-1a4 4 0 015.477-3.72M7 20v-1c0-.656.126-1.283.356-1.857m0 0A5.002 5.002 0 0112 11a5.002 5.002 0 014.644 6.143M15 7a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
	},
	{
		key: "clients",
		to: "/dashboard/clients",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
		),
	},
	{
		key: "customers",
		to: "/dashboard/customers",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 11a4 4 0 100-8 4 4 0 000 8zM3 21a7 7 0 0114 0M17 11a3 3 0 100-6 3 3 0 000 6zm4 10a5 5 0 00-7-4.583"
				/>
			</svg>
		),
	},
	{
		key: "listings",
		to: "/dashboard/listings",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M19 21V7a2 2 0 00-2-2H7a2 2 0 00-2 2v14m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 15h6"
				/>
			</svg>
		),
	},
	{
		key: "bookings",
		to: "/dashboard/bookings",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M8 6V4m8 2V4M3 10h18M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
				/>
			</svg>
		),
	},
	{
		key: "reports",
		to: "/dashboard/reports",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<circle
					cx="12"
					cy="12"
					r="9"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 8v4m0 4h.01"
				/>
			</svg>
		),
	},
	{
		key: "messages",
		to: "/dashboard/messages",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1.8}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
				/>
			</svg>
		),
	},
] as const;

export const NavLayout = () => {
	const { t } = useTranslation();

	return (
		<aside className="flex flex-col w-64 min-h-screen bg-white px-4 py-6">
			<div className="mb-6 px-2">
				<h1 className="text-2xl font-bold text-indigo-600">{t("nav.brand")}</h1>
				<p className="text-sm text-gray-400 mt-0.5">{t("nav.portalSubtitle")}</p>
			</div>

			<hr className="border-gray-200 mb-6" />

			<nav className="flex flex-col gap-1">
				{navItems.map(({ key, to, icon }) => (
					<NavLink key={to} to={to}>
						{({ isActive }) => (
							<div
								className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
									isActive
										? "bg-indigo-50 text-indigo-600"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span
									className={
										isActive
											? "text-indigo-600"
											: "text-gray-500"
									}
								>
									{icon}
								</span>
								{t(`nav.items.${key}`)}
							</div>
						)}
					</NavLink>
				))}
			</nav>
		</aside>
	);
};
