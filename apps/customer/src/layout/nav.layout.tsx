import { NavLink } from "react-router-dom";

const navItems = [
	{
		label: "Explore",
		to: "/dashboard",
		end: true,
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
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		),
	},
	{
		label: "Bookings",
		to: "/dashboard/bookings",
		end: false,
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
					d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
				/>
			</svg>
		),
	},
	{
		label: "Messages",
		to: "/dashboard/messages",
		end: false,
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
];

export const NavLayout = () => {
	return (
		<aside className="flex flex-col w-64 min-h-screen bg-white px-4 py-6">
			<div className="mb-6 px-2">
				<h1 className="text-2xl font-bold text-indigo-600">Eventat</h1>
				<p className="text-sm text-gray-400 mt-0.5">Customer Portal</p>
			</div>

			<hr className="border-gray-200 mb-6" />

			<nav className="flex flex-col gap-1">
				{navItems.map(({ label, to, end, icon }) => (
					<NavLink key={to} to={to} end={end}>
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
										isActive ? "text-indigo-600" : "text-gray-500"
									}
								>
									{icon}
								</span>
								{label}
							</div>
						)}
					</NavLink>
				))}
			</nav>
		</aside>
	);
};
