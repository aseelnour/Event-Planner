import { useVerify } from "@/hooks/use-verify";
import { useAuthStore } from "@/store/auth.store";

export const AppInit = ({ children }: { children: React.ReactNode }) => {
	const token = useAuthStore((s) => s.token);
	const { isLoading } = useVerify();

	if (token && isLoading) {
		return (
			<div className="h-screen flex items-center justify-center bg-gray-100 text-gray-600">
				Loading...
			</div>
		);
	}

	return <>{children}</>;
};
