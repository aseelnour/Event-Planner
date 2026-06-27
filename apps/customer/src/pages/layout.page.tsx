import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavLayout } from "@/layout/nav.layout";
import { HeaderLayout } from "@/layout/header.layout";

export const Dashboard = () => {
	const { pathname } = useLocation();

	const selectedLabel = useMemo(() => {
		if (pathname.includes("/messages")) return "Messages";
		if (pathname.includes("/bookings")) return "Bookings";
		return "Explore";
	}, [pathname]);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<NavLayout />

      <div className="flex flex-col flex-1">
        <HeaderLayout selectedLabel={selectedLabel} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
