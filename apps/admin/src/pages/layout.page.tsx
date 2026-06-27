import { Outlet, useLocation } from "react-router-dom";
import { NavLayout } from "@/layout/nav.layout";
import { HeaderLayout } from "@/layout/header.layout";

const NAV_KEYS = [
	"analytics",
	"users",
	"clients",
	"customers",
	"listings",
	"bookings",
	"reports",
	"messages",
] as const;

function segmentToNavKey(segment: string | undefined) {
	if (!segment) return "analytics";
	return NAV_KEYS.includes(segment as (typeof NAV_KEYS)[number])
		? segment
		: "analytics";
}

export const Dashboard = () => {
	const { pathname } = useLocation();
	const segment = pathname
		.replace(/^\/?dashboard\/?/, "")
		.split("/")
		.filter(Boolean)[0];
	const selectedNavKey = segmentToNavKey(segment);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<NavLayout />

			<div className="flex flex-col flex-1">
				<HeaderLayout selectedNavKey={selectedNavKey} />
				<main className="flex-1 p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
