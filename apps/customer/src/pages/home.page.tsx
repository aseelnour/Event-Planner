import { useAuthStore } from "@/store/auth.store";

export const CustomerHomePage = () => {
	const customer = useAuthStore((s) => s.customer);

	return (
		<div className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
			<h1 className="text-2xl font-semibold text-slate-900">Welcome</h1>
			<p className="mt-2 text-slate-500">
				{customer?.email ?? "Customer dashboard"}
			</p>
		</div>
	);
};
