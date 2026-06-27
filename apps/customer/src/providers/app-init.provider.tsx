import { useVerify } from "@/hooks/use-verify";
import { useAuthStore } from "@/store/auth.store";

export const AppInit = ({ children }: { children: React.ReactNode }) => {
	const token = useAuthStore((s) => s.token);
	const { isLoading } = useVerify();

	if (token && isLoading) {
		return (
			<div className="min-h-dvh grid place-items-center text-slate-600">
				Loading...
			</div>
		);
	}

	return <>{children}</>;
};
